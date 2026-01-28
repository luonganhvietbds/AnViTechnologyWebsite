import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
    COLLECTIONS,
    getAllDocs,
    getDocByField,
    createDoc,
    updateDocById,
    Timestamp,
} from '@/lib/db';
import { SystemConfig } from '@/lib/config';

const CONFIG_COLLECTION = 'system_config';

// GET all config
export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const configs = await getAllDocs<SystemConfig>(CONFIG_COLLECTION);
        return NextResponse.json({ configs });
    } catch (error) {
        console.error('Get config error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// POST save config
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { category, data } = await request.json();

        if (!category || !data) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        // Save each config key
        for (const [key, value] of Object.entries(data)) {
            // Check if config exists
            const existing = await getDocByField<SystemConfig>(CONFIG_COLLECTION, 'key', key);

            if (existing) {
                // Update existing
                await updateDocById(CONFIG_COLLECTION, existing.id, {
                    value: value as string,
                    updatedAt: Timestamp.now(),
                });
            } else {
                // Create new
                await createDoc(CONFIG_COLLECTION, {
                    key,
                    value: value as string,
                    category,
                    label: key,
                    updatedAt: Timestamp.now(),
                });
            }
        }

        // Log admin action
        await createDoc(COLLECTIONS.ADMIN_LOGS, {
            adminId: user.userId,
            action: 'UPDATE_CONFIG',
            targetType: 'CONFIG',
            targetId: category,
        });

        return NextResponse.json({ message: 'Cập nhật thành công' });
    } catch (error) {
        console.error('Save config error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
