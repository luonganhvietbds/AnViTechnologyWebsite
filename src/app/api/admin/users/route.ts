import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
    COLLECTIONS,
    getAllDocs,
    User
} from '@/lib/db';

// GET all users (admin only)
export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const users = await getAllDocs<User>(COLLECTIONS.USERS);

        // Remove password hash from response
        const safeUsers = users.map(u => ({
            id: u.id,
            email: u.email,
            status: u.status,
            role: u.role,
            createdAt: u.createdAt,
        }));

        return NextResponse.json({ users: safeUsers });
    } catch (error) {
        console.error('Get users error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
