import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
    COLLECTIONS,
    getDocById,
    updateDocById,
    createDoc,
    getAllDocs,
    where,
    Timestamp,
    Order,
    OrderItem,
} from '@/lib/db';
import { generateLicenseKey } from '@/lib/utils';

// POST confirm order payment and grant access
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const order = await getDocById<Order>(COLLECTIONS.ORDERS, params.id);
        if (!order) {
            return NextResponse.json({ error: 'Không tìm thấy đơn hàng' }, { status: 404 });
        }

        if (order.paymentStatus === 'CONFIRMED') {
            return NextResponse.json({ error: 'Đơn hàng đã được xác nhận' }, { status: 400 });
        }

        // Get order items
        const orderItems = await getAllDocs<OrderItem>(
            COLLECTIONS.ORDER_ITEMS,
            [where('orderId', '==', order.id)]
        );

        // Grant access for each item
        for (const item of orderItems) {
            if (item.itemType === 'WEBAPP') {
                // Create webapp permission
                await createDoc(COLLECTIONS.USER_WEBAPP_PERMISSIONS, {
                    userId: order.userId,
                    webappId: item.itemId,
                    orderId: order.id,
                    status: 'ACTIVE',
                    grantedAt: Timestamp.now(),
                });
            } else if (item.itemType === 'SOFTWARE') {
                // Create license
                await createDoc(COLLECTIONS.LICENSES, {
                    licenseKey: generateLicenseKey(),
                    userId: order.userId,
                    softwareId: item.itemId,
                    orderId: order.id,
                    status: 'ACTIVE',
                });
            }
        }

        // Update order status
        await updateDocById(COLLECTIONS.ORDERS, params.id, {
            paymentStatus: 'CONFIRMED',
        });

        // Create payment confirmation record
        await createDoc(COLLECTIONS.PAYMENT_CONFIRMATIONS, {
            orderId: order.id,
            adminId: currentUser.userId,
            confirmedAmount: order.totalAmount,
            confirmedAt: Timestamp.now(),
        });

        // Create admin log
        await createDoc(COLLECTIONS.ADMIN_LOGS, {
            adminId: currentUser.userId,
            action: 'CONFIRM_PAYMENT',
            targetType: 'ORDER',
            targetId: order.id,
        });

        return NextResponse.json({
            message: 'Xác nhận thanh toán thành công',
            grantedItems: orderItems.length,
        });
    } catch (error) {
        console.error('Confirm order error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
