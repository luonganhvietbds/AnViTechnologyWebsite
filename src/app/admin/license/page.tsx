import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import {
    COLLECTIONS,
    getAllDocs,
    getDocById,
    License,
    Software,
    User,
} from '@/lib/db';

export const metadata = {
    title: 'Quản lý License | Admin',
};

export default async function AdminLicensePage() {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        redirect('/dang-nhap');
    }

    // Get all licenses
    const licenses = await getAllDocs<License>(COLLECTIONS.LICENSES);

    // Get software and user info for each license
    const licensesWithDetails = await Promise.all(
        licenses.map(async (license) => {
            const software = await getDocById<Software>(COLLECTIONS.SOFTWARE, license.softwareId);
            const user = await getDocById<User>(COLLECTIONS.USERS, license.userId);
            return {
                ...license,
                softwareName: software?.name || 'Unknown',
                userEmail: user?.email || 'Unknown',
            };
        })
    );

    // Sort by createdAt descending
    licensesWithDetails.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-dark-50">
                    Quản lý License
                </h1>
                <Badge variant="default">
                    {licenses.length} license
                </Badge>
            </div>

            <Card>
                <CardContent>
                    {licensesWithDetails.length === 0 ? (
                        <p className="text-dark-500 text-center py-8">Chưa có license nào</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-dark-500 text-sm border-b border-dark-700">
                                        <th className="pb-3">License Key</th>
                                        <th className="pb-3">Phần mềm</th>
                                        <th className="pb-3">Người dùng</th>
                                        <th className="pb-3">Trạng thái</th>
                                        <th className="pb-3">Ngày tạo</th>
                                        <th className="pb-3">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {licensesWithDetails.map((license) => (
                                        <tr key={license.id} className="border-b border-dark-800 hover:bg-dark-800/50">
                                            <td className="py-3 font-mono text-dark-200 text-sm">
                                                {license.licenseKey}
                                            </td>
                                            <td className="py-3 text-dark-100">
                                                {license.softwareName}
                                            </td>
                                            <td className="py-3 text-dark-300 text-sm">
                                                {license.userEmail}
                                            </td>
                                            <td className="py-3">
                                                <Badge
                                                    variant={
                                                        license.status === 'ACTIVE'
                                                            ? 'success'
                                                            : license.status === 'REVOKED'
                                                                ? 'danger'
                                                                : 'warning'
                                                    }
                                                >
                                                    {license.status === 'ACTIVE'
                                                        ? 'Hoạt động'
                                                        : license.status === 'REVOKED'
                                                            ? 'Đã thu hồi'
                                                            : 'Hết hạn'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-dark-400 text-sm">
                                                {license.createdAt?.toDate?.()?.toLocaleDateString('vi-VN') || ''}
                                            </td>
                                            <td className="py-3">
                                                {license.status === 'ACTIVE' && (
                                                    <Button variant="ghost" size="sm">
                                                        Thu hồi
                                                    </Button>
                                                )}
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
