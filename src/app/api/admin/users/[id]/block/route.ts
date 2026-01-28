import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
    COLLECTIONS,
    getDocById,
    updateDocById,
    User
} from '@/lib/db';

// POST block user
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

        // Cannot block yourself
        if (user.id === currentUser.userId) {
            return NextResponse.json({ error: 'Không thể tự khóa chính mình' }, { status: 400 });
        }

        await updateDocById(COLLECTIONS.USERS, params.id, {
            status: 'BLOCKED',
        });

        // Redirect back to users page
        return NextResponse.redirect(new URL('/admin/nguoi-dung', request.url));
    } catch (error) {
        console.error('Block user error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
