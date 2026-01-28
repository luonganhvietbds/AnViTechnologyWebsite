import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, Badge } from '@/components/ui';
import SeedButton from './SeedButton';
import {
    COLLECTIONS,
    getAllDocs,
    getDocById,
    where,
    orderBy,
    User,
    Order,
    Webapp,
} from '@/lib/db';

export const metadata = {
    title: 'Admin Dashboard | AnVi Technology',
};

export default async function AdminOverviewPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/dang-nhap');
    }

    if (currentUser.role !== 'ADMIN') {
        redirect('/tai-khoan');
    }

    // Get statistics
    const [users, orders, webapps] = await Promise.all([
        getAllDocs<User>(COLLECTIONS.USERS),
        getAllDocs<Order>(COLLECTIONS.ORDERS),
        getAllDocs<Webapp>(COLLECTIONS.WEBAPPS),
    ]);

    const pendingOrders = orders.filter(o => o.paymentStatus === 'PENDING');
    const confirmedOrders = orders.filter(o => o.paymentStatus === 'CONFIRMED');
    const totalRevenue = confirmedOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    // Get recent orders with user info
    const recentOrders = await getAllDocs<Order>(
        COLLECTIONS.ORDERS,
        [orderBy('createdAt', 'desc')]
    );

    // Get user emails for orders
    const ordersWithUsers = await Promise.all(
        recentOrders.slice(0, 10).map(async (order) => {
            const user = await getDocById<User>(COLLECTIONS.USERS, order.userId);
            return { ...order, userEmail: user?.email || 'Unknown' };
        })
    );

    const stats = [
        { label: 'Tổng người dùng', value: users.length, icon: '👥', color: 'primary' },
        { label: 'Tổng đơn hàng', value: orders.length, icon: '🛒', color: 'green' },
        { label: 'Đơn chờ xử lý', value: pendingOrders.length, icon: '⏳', color: 'yellow' },
        { label: 'Số WebApp', value: webapps.length, icon: '📦', color: 'default' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-dark-50 mb-8">
                Tổng quan
            </h1>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="flex items-center gap-4">
                            <div className="text-3xl">{stat.icon}</div>
                            <div>
                                <div className="text-2xl font-bold text-dark-50">
                                    {stat.value}
                                </div>
                                <div className="text-dark-400 text-sm">{stat.label}</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Revenue Card */}
            <Card className="mb-8">
                <CardContent>
                    <h2 className="text-lg font-semibold text-dark-50 mb-2">
                        Doanh thu đã xác nhận
                    </h2>
                    <div className="text-3xl font-bold text-accent-green">
                        {totalRevenue.toLocaleString('vi-VN')} đ
                    </div>
                </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
                <CardContent>
                    <h2 className="text-lg font-semibold text-dark-50 mb-4">
                        Đơn hàng gần đây
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-dark-500 text-sm border-b border-dark-700">
                                    <th className="pb-3">Mã đơn hàng</th>
                                    <th className="pb-3">Email</th>
                                    <th className="pb-3">Tổng tiền</th>
                                    <th className="pb-3">Trạng thái</th>
                                    <th className="pb-3">Ngày tạo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersWithUsers.map((order) => (
                                    <tr key={order.id} className="border-b border-dark-800 hover:bg-dark-800/50">
                                        <td className="py-3 font-mono text-dark-200">
                                            {order.orderCode}
                                        </td>
                                        <td className="py-3 text-dark-300">
                                            {order.userEmail}
                                        </td>
                                        <td className="py-3 text-dark-200">
                                            {(order.totalAmount || 0).toLocaleString('vi-VN')} đ
                                        </td>
                                        <td className="py-3">
                                            <Badge
                                                variant={
                                                    order.paymentStatus === 'CONFIRMED'
                                                        ? 'success'
                                                        : order.paymentStatus === 'PENDING'
                                                            ? 'warning'
                                                            : 'default'
                                                }
                                            >
                                                {order.paymentStatus === 'CONFIRMED'
                                                    ? 'Đã xác nhận'
                                                    : order.paymentStatus === 'PENDING'
                                                        ? 'Chờ thanh toán'
                                                        : order.paymentStatus}
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-dark-400 text-sm">
                                            {order.createdAt?.toDate?.()?.toLocaleString('vi-VN') || ''}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
