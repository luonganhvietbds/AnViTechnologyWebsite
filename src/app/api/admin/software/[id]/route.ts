import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
    COLLECTIONS,
    getDocById,
    updateDocById,
    deleteDocById,
    Software
} from '@/lib/db';

// GET single software
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const software = await getDocById<Software>(COLLECTIONS.SOFTWARE, params.id);

        if (!software) {
            return NextResponse.json({ error: 'Không tìm thấy phần mềm' }, { status: 404 });
        }

        return NextResponse.json({ software });
    } catch (error) {
        console.error('Get software error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// PUT update software
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const software = await getDocById<Software>(COLLECTIONS.SOFTWARE, params.id);
        if (!software) {
            return NextResponse.json({ error: 'Không tìm thấy phần mềm' }, { status: 404 });
        }

        const body = await request.json();
        const { name, softwareType, description, demoVideoUrl, price, status } = body;

        await updateDocById(COLLECTIONS.SOFTWARE, params.id, {
            ...(name && { name }),
            ...(softwareType && { softwareType }),
            ...(description && { description }),
            ...(demoVideoUrl !== undefined && { demoVideoUrl }),
            ...(price !== undefined && { price }),
            ...(status && { status }),
        });

        return NextResponse.json({ message: 'Cập nhật thành công' });
    } catch (error) {
        console.error('Update software error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// DELETE software
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const software = await getDocById<Software>(COLLECTIONS.SOFTWARE, params.id);
        if (!software) {
            return NextResponse.json({ error: 'Không tìm thấy phần mềm' }, { status: 404 });
        }

        await deleteDocById(COLLECTIONS.SOFTWARE, params.id);

        return NextResponse.json({ message: 'Xóa thành công' });
    } catch (error) {
        console.error('Delete software error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
