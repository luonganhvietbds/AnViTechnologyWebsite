import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import {
    COLLECTIONS,
    getAllDocs,
    User,
} from '@/lib/db';

export const metadata = {
    title: 'Quản lý Người dùng | Admin',
};

export default async function AdminUsersPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        redirect('/dang-nhap');
    }

    // Get all users
    const users = await getAllDocs<User>(COLLECTIONS.USERS);

    // Sort by createdAt descending
    users.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-dark-50">
                    Quản lý Người dùng
                </h1>
                <Badge variant="default">
                    {users.length} người dùng
                </Badge>
            </div>

            <Card>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-dark-500 text-sm border-b border-dark-700">
                                    <th className="pb-3">Email</th>
                                    <th className="pb-3">Vai trò</th>
                                    <th className="pb-3">Trạng thái</th>
                                    <th className="pb-3">Ngày tạo</th>
                                    <th className="pb-3">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-dark-800 hover:bg-dark-800/50">
                                        <td className="py-3 text-dark-100">
                                            {user.email}
                                        </td>
                                        <td className="py-3">
                                            <Badge variant={user.role === 'ADMIN' ? 'success' : 'default'}>
                                                {user.role === 'ADMIN' ? 'Admin' : 'User'}
                                            </Badge>
                                        </td>
                                        <td className="py-3">
                                            <Badge variant={user.status === 'ACTIVE' ? 'success' : 'danger'}>
                                                {user.status === 'ACTIVE' ? 'Hoạt động' : 'Bị khóa'}
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-dark-400 text-sm">
                                            {user.createdAt?.toDate?.()?.toLocaleDateString('vi-VN') || ''}
                                        </td>
                                        <td className="py-3">
                                            <div className="flex gap-2">
                                                {user.status === 'ACTIVE' ? (
                                                    <form action={`/api/admin/users/${user.id}/block`} method="POST">
                                                        <Button type="submit" variant="ghost" size="sm">
                                                            Khóa
                                                        </Button>
                                                    </form>
                                                ) : (
                                                    <form action={`/api/admin/users/${user.id}/unblock`} method="POST">
                                                        <Button type="submit" variant="ghost" size="sm">
                                                            Mở khóa
                                                        </Button>
                                                    </form>
                                                )}
                                            </div>
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
