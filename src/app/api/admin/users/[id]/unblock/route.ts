import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
    COLLECTIONS,
    getDocById,
    updateDocById,
    User
} from '@/lib/db';

// POST unblock user
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await getDocById<User>(COLLECTIONS.USERS, params.id);
        if (!user) {
            return NextResponse.json({ error: 'Không tìm thấy người dùng' }, { status: 404 });
        }

        await updateDocById(COLLECTIONS.USERS, params.id, {
            status: 'ACTIVE',
        });

        // Redirect back to users page
        return NextResponse.redirect(new URL('/admin/nguoi-dung', request.url));
    } catch (error) {
        console.error('Unblock user error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
