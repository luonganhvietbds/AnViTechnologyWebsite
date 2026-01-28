import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
    COLLECTIONS,
    getAllDocs,
    createDoc,
    getDocByField,
    Webapp
} from '@/lib/db';

// GET all webapps (admin only)
export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const webapps = await getAllDocs<Webapp>(COLLECTIONS.WEBAPPS);
        return NextResponse.json({ webapps });
    } catch (error) {
        console.error('Get webapps error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// POST create new webapp
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, slug, subdomain, styleType, description, demoVideoUrl, price } = body;

        // Validate required fields
        if (!name || !slug || !subdomain || !styleType || !description) {
            return NextResponse.json(
                { error: 'Thiếu thông tin bắt buộc' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existingSlug = await getDocByField<Webapp>(COLLECTIONS.WEBAPPS, 'slug', slug);
        if (existingSlug) {
            return NextResponse.json(
                { error: 'Slug đã tồn tại' },
                { status: 400 }
            );
        }

        // Check if subdomain already exists
        const existingSubdomain = await getDocByField<Webapp>(COLLECTIONS.WEBAPPS, 'subdomain', subdomain);
        if (existingSubdomain) {
            return NextResponse.json(
                { error: 'Subdomain đã tồn tại' },
                { status: 400 }
            );
        }

        // Create webapp
        const webappId = await createDoc(COLLECTIONS.WEBAPPS, {
            name,
            slug,
            subdomain,
            styleType,
            description,
            demoVideoUrl: demoVideoUrl || '',
            price: price || 0,
            status: 'ACTIVE',
        });

        return NextResponse.json(
            { message: 'Tạo WebApp thành công', id: webappId },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create webapp error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
