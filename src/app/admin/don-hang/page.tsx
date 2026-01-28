import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, Badge } from '@/components/ui';
import {
    COLLECTIONS,
    getAllDocs,
    getDocById,
    orderBy,
    Order,
    User,
    OrderItem,
} from '@/lib/db';
import { ConfirmOrderButton } from './ConfirmButton';

export const metadata = {
    title: 'Quản lý Đơn hàng | Admin',
};

export default async function AdminOrdersPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        redirect('/dang-nhap');
    }

    // Get all orders
    const orders = await getAllDocs<Order>(
        COLLECTIONS.ORDERS,
        [orderBy('createdAt', 'desc')]
    );

    // Get user and order items for each order
    const ordersWithDetails = await Promise.all(
        orders.map(async (order) => {
            const user = await getDocById<User>(COLLECTIONS.USERS, order.userId);
            const allOrderItems = await getAllDocs<OrderItem>(COLLECTIONS.ORDER_ITEMS);
            const items = allOrderItems.filter(item => item.orderId === order.id);
            return {
                ...order,
                userEmail: user?.email || 'Unknown',
                itemCount: items.length,
            };
        })
    );

    const pendingCount = orders.filter(o => o.paymentStatus === 'PENDING').length;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-dark-50">
                    Quản lý Đơn hàng
                </h1>
                <div className="flex gap-4">
                    <Badge variant="warning">
                        {pendingCount} chờ xử lý
                    </Badge>
                </div>
            </div>

            <Card>
                <CardContent>
                    {ordersWithDetails.length === 0 ? (
                        <p className="text-dark-500 text-center py-8">Chưa có đơn hàng nào</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-dark-500 text-sm border-b border-dark-700">
                                        <th className="pb-3">Mã đơn hàng</th>
                                        <th className="pb-3">Khách hàng</th>
                                        <th className="pb-3">Sản phẩm</th>
                                        <th className="pb-3">Tổng tiền</th>
                                        <th className="pb-3">Trạng thái</th>
                                        <th className="pb-3">Ngày tạo</th>
                                        <th className="pb-3">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordersWithDetails.map((order) => (
                                        <tr key={order.id} className="border-b border-dark-800 hover:bg-dark-800/50">
                                            <td className="py-3 font-mono text-dark-200">
                                                {order.orderCode}
                                            </td>
                                            <td className="py-3 text-dark-300">
                                                {order.userEmail}
                                            </td>
                                            <td className="py-3 text-dark-400 text-sm">
                                                {order.itemCount} sản phẩm
                                            </td>
                                            <td className="py-3 text-dark-200 font-medium">
                                                {(order.totalAmount || 0).toLocaleString('vi-VN')} đ
                                            </td>
                                            <td className="py-3">
                                                <Badge
                                                    variant={
                                                        order.paymentStatus === 'CONFIRMED'
                                                            ? 'success'
                                                            : order.paymentStatus === 'PENDING'
                                                                ? 'warning'
                                                                : order.paymentStatus === 'CANCELLED'
                                                                    ? 'danger'
                                                                    : 'default'
                                                    }
                                                >
                                                    {order.paymentStatus === 'CONFIRMED'
                                                        ? 'Đã xác nhận'
                                                        : order.paymentStatus === 'PENDING'
                                                            ? 'Chờ thanh toán'
                                                            : order.paymentStatus === 'CANCELLED'
                                                                ? 'Đã hủy'
                                                                : order.paymentStatus}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-dark-400 text-sm">
                                                {order.createdAt?.toDate?.()?.toLocaleString('vi-VN') || ''}
                                            </td>
                                            <td className="py-3">
                                                <ConfirmOrderButton
                                                    orderId={order.id}
                                                    currentStatus={order.paymentStatus}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
