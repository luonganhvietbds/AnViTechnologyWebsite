import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
    COLLECTIONS,
    getAllDocs,
    createDoc,
    getDocByField,
    Software
} from '@/lib/db';

// GET all software (admin only)
export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const software = await getAllDocs<Software>(COLLECTIONS.SOFTWARE);
        return NextResponse.json({ software });
    } catch (error) {
        console.error('Get software error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// POST create new software
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, slug, softwareType, description, demoVideoUrl, price } = body;

        // Validate required fields
        if (!name || !slug || !softwareType || !description) {
            return NextResponse.json(
                { error: 'Thiếu thông tin bắt buộc' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existingSlug = await getDocByField<Software>(COLLECTIONS.SOFTWARE, 'slug', slug);
        if (existingSlug) {
            return NextResponse.json(
                { error: 'Slug đã tồn tại' },
                { status: 400 }
            );
        }

        // Create software
        const softwareId = await createDoc(COLLECTIONS.SOFTWARE, {
            name,
            slug,
            softwareType,
            description,
            demoVideoUrl: demoVideoUrl || '',
            price: price || 0,
            status: 'ACTIVE',
        });

        return NextResponse.json(
            { message: 'Tạo phần mềm thành công', id: softwareId },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create software error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
