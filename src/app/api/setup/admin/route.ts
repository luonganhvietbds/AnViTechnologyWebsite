import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { COLLECTIONS, getAllDocs, createDoc, User, Timestamp } from '@/lib/db';
import { limit } from 'firebase/firestore';

export async function POST() {
    try {
        // 1. Security Check: Check if ANY users exist
        // limiting to 1 is enough to know if collection is empty
        const existingUsers = await getAllDocs<User>(COLLECTIONS.USERS, [limit(1)]);

        if (existingUsers.length > 0) {
            return NextResponse.json(
                { error: 'System already has users. Cannot run setup.' },
                { status: 403 }
            );
        }

        // 2. Create Default Admin
        const passwordHash = await hashPassword('Admin123@');

        const adminData = {
            email: 'admin@anvitech.vn',
            passwordHash,
            role: 'ADMIN',
            status: 'ACTIVE',
            // Timestamps will be added by createDoc
        } as const;

        // We can't use the exact User interface for createDoc input because createDoc adds timestamps
        // So we assume createDoc handles the rest based on our db.ts implementation
        const newAdminId = await createDoc(COLLECTIONS.USERS, adminData);

        return NextResponse.json({
            message: 'Admin account created successfully',
            email: 'admin@anvitech.vn',
            id: newAdminId
        });

    } catch (error) {
        console.error('Setup Admin Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
