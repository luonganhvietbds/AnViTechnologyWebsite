import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { COLLECTIONS, getDocById, User } from '@/lib/db';

export async function GET() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: 'Chưa đăng nhập' },
                { status: 401 }
            );
        }

        // Get full user data from Firestore
        const user = await getDocById<User>(COLLECTIONS.USERS, currentUser.userId);

        if (!user) {
            return NextResponse.json(
                { error: 'Không tìm thấy người dùng' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                status: user.status,
                role: user.role,
                createdAt: user.createdAt?.toDate?.() || user.createdAt,
            },
        });
    } catch (error) {
        console.error('Get current user error:', error);
        return NextResponse.json(
            { error: 'Có lỗi xảy ra' },
            { status: 500 }
        );
    }
}
