import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
    COLLECTIONS,
    getDocById,
    updateDocById,
    deleteDocById,
    Webapp
} from '@/lib/db';

// GET single webapp
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const webapp = await getDocById<Webapp>(COLLECTIONS.WEBAPPS, params.id);

        if (!webapp) {
            return NextResponse.json({ error: 'Không tìm thấy WebApp' }, { status: 404 });
        }

        return NextResponse.json({ webapp });
    } catch (error) {
        console.error('Get webapp error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// PUT update webapp
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const webapp = await getDocById<Webapp>(COLLECTIONS.WEBAPPS, params.id);
        if (!webapp) {
            return NextResponse.json({ error: 'Không tìm thấy WebApp' }, { status: 404 });
        }

        const body = await request.json();
        const { name, styleType, description, demoVideoUrl, price, status } = body;

        await updateDocById(COLLECTIONS.WEBAPPS, params.id, {
            ...(name && { name }),
            ...(styleType && { styleType }),
            ...(description && { description }),
            ...(demoVideoUrl !== undefined && { demoVideoUrl }),
            ...(price !== undefined && { price }),
            ...(status && { status }),
        });

        return NextResponse.json({ message: 'Cập nhật thành công' });
    } catch (error) {
        console.error('Update webapp error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// DELETE webapp
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const webapp = await getDocById<Webapp>(COLLECTIONS.WEBAPPS, params.id);
        if (!webapp) {
            return NextResponse.json({ error: 'Không tìm thấy WebApp' }, { status: 404 });
        }

        await deleteDocById(COLLECTIONS.WEBAPPS, params.id);

        return NextResponse.json({ message: 'Xóa thành công' });
    } catch (error) {
        console.error('Delete webapp error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
