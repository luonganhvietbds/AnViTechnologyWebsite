import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { Header, Footer } from '@/components/layout';
import { Card, CardContent, Badge } from '@/components/ui';
import {
    COLLECTIONS,
    getDocById,
    getDocByField,
    getAllDocs,
    where,
    orderBy,
    limit,
    User,
    Order,
    UserWebappPermission,
    License,
    Webapp,
    Software,
} from '@/lib/db';

export const metadata = {
    title: 'Tài khoản của bạn',
};

export default async function UserDashboardPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/dang-nhap');
    }

    // For hardcoded admin, redirect to admin dashboard
    if (currentUser.userId === 'hardcoded-admin-id') {
        redirect('/admin');
    }

    // Get user data from Firestore
    let user = await getDocById<User>(COLLECTIONS.USERS, currentUser.userId);

    // If not found by ID, try by email (for Firebase Auth users)
    if (!user) {
        user = await getDocByField<User>(COLLECTIONS.USERS, 'email', currentUser.email);
    }

    // Get user's permissions (webapps)
    const permissions = await getAllDocs<UserWebappPermission>(
        COLLECTIONS.USER_WEBAPP_PERMISSIONS,
        [
            where('userId', '==', user?.id || currentUser.userId),
            where('status', '==', 'ACTIVE'),
        ]
    );

    // Get webapp details for each permission
    const webapps: Webapp[] = [];
    for (const perm of permissions) {
        const webapp = await getDocById<Webapp>(COLLECTIONS.WEBAPPS, perm.webappId);
        if (webapp) webapps.push(webapp);
    }

    // Combine permissions with webapp info
    const permissionsWithWebapps = permissions.map((perm, index) => ({
        ...perm,
        webapp: webapps[index],
    }));

    // Get user's licenses
    const licenses = await getAllDocs<License>(
        COLLECTIONS.LICENSES,
        [
            where('userId', '==', currentUser.userId),
            where('status', '==', 'ACTIVE'),
        ]
    );

    // Get software details for each license
    const softwareList: Software[] = [];
    for (const lic of licenses) {
        const software = await getDocById<Software>(COLLECTIONS.SOFTWARE, lic.softwareId);
        if (software) softwareList.push(software);
    }

    const licensesWithSoftware = licenses.map((lic, index) => ({
        ...lic,
        software: softwareList[index],
    }));

    // Get user's orders
    const orders = await getAllDocs<Order>(
        COLLECTIONS.ORDERS,
        [
            where('userId', '==', currentUser.userId),
            orderBy('createdAt', 'desc'),
            limit(5),
        ]
    );

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20 bg-dark-950">
                <div className="container-custom py-12">
                    {/* Welcome */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-dark-50 mb-2">
                            Xin chào!
                        </h1>
                        <p className="text-dark-400">
                            Email: <span className="text-dark-200">{currentUser.email}</span>
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <Card>
                            <CardContent className="text-center">
                                <div className="text-3xl font-bold text-primary-400 mb-1">
                                    {permissions.length}
                                </div>
                                <p className="text-dark-400 text-sm">WebApp đã mua</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="text-center">
                                <div className="text-3xl font-bold text-accent-green mb-1">
                                    {licenses.length}
                                </div>
                                <p className="text-dark-400 text-sm">License phần mềm</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="text-center">
                                <div className="text-3xl font-bold text-accent-yellow mb-1">
                                    {orders.length}
                                </div>
                                <p className="text-dark-400 text-sm">Đơn hàng</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="text-center">
                                <Badge variant={currentUser.role === 'ADMIN' ? 'success' : 'default'}>
                                    {currentUser.role === 'ADMIN' ? 'Admin' : 'Thành viên'}
                                </Badge>
                                <p className="text-dark-400 text-sm mt-2">Vai trò</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* WebApps */}
                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-dark-50">
                                        WebApp của bạn
                                    </h2>
                                    <Link href="/tai-khoan/webapp" className="text-sm text-primary-400 hover:text-primary-300">
                                        Xem tất cả →
                                    </Link>
                                </div>

                                {permissionsWithWebapps.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-dark-500 mb-4">Chưa có WebApp nào</p>
                                        <Link href="/webapp-viet-kich-ban" className="text-primary-400 text-sm hover:text-primary-300">
                                            Khám phá các WebApp →
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {permissionsWithWebapps.map((permission) => (
                                            <div
                                                key={permission.id}
                                                className="flex items-center justify-between p-3 rounded-lg bg-dark-800 hover:bg-dark-750 transition-colors"
                                            >
                                                <div>
                                                    <p className="font-medium text-dark-100">
                                                        {permission.webapp?.name || 'WebApp'}
                                                    </p>
                                                    <p className="text-dark-500 text-sm">
                                                        {permission.webapp?.styleType}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`https://${permission.webapp?.subdomain || 'app'}.anvitech.vn`}
                                                    target="_blank"
                                                    className="px-3 py-1.5 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600"
                                                >
                                                    Truy cập
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Licenses */}
                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-dark-50">
                                        License phần mềm
                                    </h2>
                                    <Link href="/tai-khoan/license" className="text-sm text-primary-400 hover:text-primary-300">
                                        Xem tất cả →
                                    </Link>
                                </div>

                                {licensesWithSoftware.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-dark-500 mb-4">Chưa có License nào</p>
                                        <Link href="/phan-mem-phu-tro" className="text-primary-400 text-sm hover:text-primary-300">
                                            Khám phá phần mềm →
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {licensesWithSoftware.map((license) => (
                                            <div
                                                key={license.id}
                                                className="p-3 rounded-lg bg-dark-800"
                                            >
                                                <p className="font-medium text-dark-100">
                                                    {license.software?.name || 'Phần mềm'}
                                                </p>
                                                <p className="text-dark-500 text-xs font-mono mt-1">
                                                    {license.licenseKey}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Orders */}
                    <Card className="mt-8">
                        <CardContent>
                            <h2 className="text-lg font-semibold text-dark-50 mb-4">
                                Đơn hàng gần đây
                            </h2>

                            {orders.length === 0 ? (
                                <p className="text-dark-500 text-center py-4">
                                    Chưa có đơn hàng nào
                                </p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left text-dark-500 text-sm border-b border-dark-700">
                                                <th className="pb-3">Mã đơn hàng</th>
                                                <th className="pb-3">Tổng tiền</th>
                                                <th className="pb-3">Trạng thái</th>
                                                <th className="pb-3">Ngày tạo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order.id} className="border-b border-dark-800">
                                                    <td className="py-3 font-mono text-dark-200">
                                                        {order.orderCode}
                                                    </td>
                                                    <td className="py-3 text-dark-200">
                                                        {order.totalAmount.toLocaleString('vi-VN')} đ
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
                                                        {order.createdAt?.toDate?.()?.toLocaleDateString('vi-VN') || ''}
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
            </main>

            <Footer />
        </>
    );
}
