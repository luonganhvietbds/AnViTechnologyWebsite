import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { COLLECTIONS, getDocByField, User } from '@/lib/db';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/dang-nhap');
    }

    // For hardcoded admin, allow access
    if (currentUser.userId === 'hardcoded-admin-id' && currentUser.role === 'ADMIN') {
        return <AdminLayoutClient email={currentUser.email}>{children}</AdminLayoutClient>;
    }

    // For regular users, check role from Firestore
    const user = await getDocByField<User>(COLLECTIONS.USERS, 'email', currentUser.email);

    if (!user || user.role !== 'ADMIN') {
        redirect('/tai-khoan');
    }

    return <AdminLayoutClient email={user.email}>{children}</AdminLayoutClient>;
}
