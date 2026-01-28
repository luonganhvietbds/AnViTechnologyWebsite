import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import {
    COLLECTIONS,
    getDocByField,
    createDoc,
    Timestamp,
    Webapp,
    Software,
} from '@/lib/db';
import { DEFAULT_CONFIG } from '@/lib/config';

// Define initial data
const INITIAL_WEBAPPS = [
    {
        name: 'Kịch bản Cổ tích Ngược',
        slug: 'co-tich-nguoc',
        subdomain: 'cotichnguoc',
        styleType: 'Cổ tích ngược',
        description: 'Sáng tạo lại các câu chuyện cổ tích với góc nhìn mới lạ, hiện đại và hài hước.',
        demoVideoUrl: 'https://www.youtube.com/watch?v=example1',
        price: 299000,
        status: 'ACTIVE',
    },
    {
        name: 'Kịch bản Lịch sử',
        slug: 'lich-su',
        subdomain: 'lichsu',
        styleType: 'Lịch sử',
        description: 'Tái hiện các sự kiện lịch sử hào hùng một cách sống động và dễ hiểu.',
        demoVideoUrl: 'https://www.youtube.com/watch?v=example2',
        price: 299000,
        status: 'ACTIVE',
    },
    {
        name: 'Drama Xã hội',
        slug: 'drama-xa-hoi',
        subdomain: 'drama',
        styleType: 'Drama xã hội',
        description: 'Những câu chuyện đời thường, tình huống xã hội gây cấn và bài học ý nghĩa.',
        demoVideoUrl: 'https://www.youtube.com/watch?v=example3',
        price: 299000,
        status: 'ACTIVE',
    },
    {
        name: 'Kiến thức Tổng hợp',
        slug: 'kien-thuc',
        subdomain: 'kienthuc',
        styleType: 'Kiến thức tổng hợp',
        description: 'Video chia sẻ kiến thức, mẹo vặt, khoa học thường thức hấp dẫn.',
        demoVideoUrl: 'https://www.youtube.com/watch?v=example4',
        price: 299000,
        status: 'ACTIVE',
    },
    {
        name: 'Story Thú vị',
        slug: 'story-thu-vi',
        subdomain: 'story',
        styleType: 'Story thú vị',
        description: 'Những câu chuyện lạ lùng, bí ẩn hoặc hài hước ngắn gọn.',
        demoVideoUrl: 'https://www.youtube.com/watch?v=example5',
        price: 299000,
        status: 'ACTIVE',
    },
    {
        name: 'Tâm linh & Bí ẩn',
        slug: 'tam-linh',
        subdomain: 'tamlinh',
        styleType: 'Tâm linh/Bí ẩn',
        description: 'Khám phá những hiện tượng siêu nhiên, bí ẩn chưa có lời giải.',
        demoVideoUrl: 'https://www.youtube.com/watch?v=example6',
        price: 299000,
        status: 'ACTIVE',
    },
] as const;

const INITIAL_SOFTWARE = [
    {
        name: 'AI Content Writer',
        slug: 'ai-content-writer',
        softwareType: 'ONLINE',
        description: 'Công cụ hỗ trợ viết nội dung chuẩn SEO tự động với AI.',
        demoVideoUrl: 'https://www.youtube.com/watch?v=example7',
        price: 199000,
        status: 'ACTIVE',
    },
    {
        name: 'Video Editor Pack',
        slug: 'video-editor-pack',
        softwareType: 'OFFLINE',
        description: 'Bộ công cụ, preset và template cho Video Editor chuyên nghiệp.',
        demoVideoUrl: 'https://www.youtube.com/watch?v=example8',
        price: 99000,
        status: 'ACTIVE',
    },
] as const;

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        // Only verify admin role if users collection is not empty (first run exception could be added, but simpler to require admin)
        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const report = {
            webapps: { created: 0, skipped: 0 },
            software: { created: 0, skipped: 0 },
            config: { created: 0, skipped: 0 },
        };

        // Seed WebApps
        for (const item of INITIAL_WEBAPPS) {
            const existing = await getDocByField<Webapp>(COLLECTIONS.WEBAPPS, 'slug', item.slug);
            if (!existing) {
                await createDoc(COLLECTIONS.WEBAPPS, item);
                report.webapps.created++;
            } else {
                report.webapps.skipped++;
            }
        }

        // Seed Software
        for (const item of INITIAL_SOFTWARE) {
            const existing = await getDocByField<Software>(COLLECTIONS.SOFTWARE, 'slug', item.slug);
            if (!existing) {
                await createDoc(COLLECTIONS.SOFTWARE, item);
                report.software.created++;
            } else {
                report.software.skipped++;
            }
        }

        // Seed Config
        for (const [key, config] of Object.entries(DEFAULT_CONFIG)) {
            const existing = await getDocByField(COLLECTIONS.CONFIG, 'key', key);
            if (!existing) {
                await createDoc(COLLECTIONS.CONFIG, {
                    key,
                    value: config.value,
                    label: config.label,
                    description: config.description,
                    category: config.category,
                });
                report.config.created++;
            } else {
                report.config.skipped++;
            }
        }

        return NextResponse.json({
            message: 'Database seeding completed',
            report,
        });

    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
