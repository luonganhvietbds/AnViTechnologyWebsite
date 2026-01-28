import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import {
    COLLECTIONS,
    getAllDocs,
    Webapp,
    Software,
} from '@/lib/db';

export const metadata = {
    title: 'Quản lý Sản phẩm | Admin',
};

export default async function AdminProductsPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        redirect('/dang-nhap');
    }

    // Get all products
    const [webapps, software] = await Promise.all([
        getAllDocs<Webapp>(COLLECTIONS.WEBAPPS),
        getAllDocs<Software>(COLLECTIONS.SOFTWARE),
    ]);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-dark-50">
                    Quản lý Sản phẩm
                </h1>
                <div className="flex gap-2">
                    <Link href="/admin/san-pham/them-webapp">
                        <Button variant="primary" size="sm">
                            + Thêm WebApp
                        </Button>
                    </Link>
                    <Link href="/admin/san-pham/them-software">
                        <Button variant="secondary" size="sm">
                            + Thêm Phần mềm
                        </Button>
                    </Link>
                </div>
            </div>

            {/* WebApps Section */}
            <Card className="mb-8">
                <CardContent>
                    <h2 className="text-lg font-semibold text-dark-50 mb-4 flex items-center gap-2">
                        🌐 WebApp viết kịch bản
                        <Badge variant="default">{webapps.length}</Badge>
                    </h2>

                    {webapps.length === 0 ? (
                        <p className="text-dark-500 text-center py-8">Chưa có WebApp nào</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-dark-500 text-sm border-b border-dark-700">
                                        <th className="pb-3">Tên</th>
                                        <th className="pb-3">Slug</th>
                                        <th className="pb-3">Subdomain</th>
                                        <th className="pb-3">Loại</th>
                                        <th className="pb-3">Giá</th>
                                        <th className="pb-3">Trạng thái</th>
                                        <th className="pb-3">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {webapps.map((webapp) => (
                                        <tr key={webapp.id} className="border-b border-dark-800 hover:bg-dark-800/50">
                                            <td className="py-3 text-dark-100 font-medium">
                                                {webapp.name}
                                            </td>
                                            <td className="py-3 text-dark-400 font-mono text-sm">
                                                {webapp.slug}
                                            </td>
                                            <td className="py-3 text-dark-300 text-sm">
                                                {webapp.subdomain}.anvitech.vn
                                            </td>
                                            <td className="py-3">
                                                <Badge variant="default">{webapp.styleType}</Badge>
                                            </td>
                                            <td className="py-3 text-dark-200">
                                                {(webapp.price || 0).toLocaleString('vi-VN')} đ
                                            </td>
                                            <td className="py-3">
                                                <Badge variant={webapp.status === 'ACTIVE' ? 'success' : 'warning'}>
                                                    {webapp.status === 'ACTIVE' ? 'Hoạt động' : 'Tắt'}
                                                </Badge>
                                            </td>
                                            <td className="py-3">
                                                <div className="flex gap-2">
                                                    <Link href={`/admin/san-pham/webapp/${webapp.id}`}>
                                                        <Button variant="ghost" size="sm">Sửa</Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Software Section */}
            <Card>
                <CardContent>
                    <h2 className="text-lg font-semibold text-dark-50 mb-4 flex items-center gap-2">
                        💻 Phần mềm phụ trợ
                        <Badge variant="default">{software.length}</Badge>
                    </h2>

                    {software.length === 0 ? (
                        <p className="text-dark-500 text-center py-8">Chưa có phần mềm nào</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-dark-500 text-sm border-b border-dark-700">
                                        <th className="pb-3">Tên</th>
                                        <th className="pb-3">Slug</th>
                                        <th className="pb-3">Loại</th>
                                        <th className="pb-3">Giá</th>
                                        <th className="pb-3">Trạng thái</th>
                                        <th className="pb-3">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {software.map((item) => (
                                        <tr key={item.id} className="border-b border-dark-800 hover:bg-dark-800/50">
                                            <td className="py-3 text-dark-100 font-medium">
                                                {item.name}
                                            </td>
                                            <td className="py-3 text-dark-400 font-mono text-sm">
                                                {item.slug}
                                            </td>
                                            <td className="py-3">
                                                <Badge variant={item.softwareType === 'ONLINE' ? 'success' : 'warning'}>
                                                    {item.softwareType === 'ONLINE' ? 'Online' : 'Offline'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-dark-200">
                                                {(item.price || 0).toLocaleString('vi-VN')} đ
                                            </td>
                                            <td className="py-3">
                                                <Badge variant={item.status === 'ACTIVE' ? 'success' : 'warning'}>
                                                    {item.status === 'ACTIVE' ? 'Hoạt động' : 'Tắt'}
                                                </Badge>
                                            </td>
                                            <td className="py-3">
                                                <div className="flex gap-2">
                                                    <Link href={`/admin/san-pham/software/${item.id}`}>
                                                        <Button variant="ghost" size="sm">Sửa</Button>
                                                    </Link>
                                                </div>
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
