import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Button, Card, CardContent, Badge } from '@/components/ui';

// Mock data - sẽ được lấy từ database
const webappsData: Record<string, {
    name: string;
    styleType: string;
    description: string;
    longDescription: string;
    icon: string;
    suitable: string[];
    videoLength: string;
    demoVideoUrl: string;
    price: string;
}> = {
    'co-tich-nguoc': {
        name: 'WebApp Viết Kịch Bản – Cổ Tích Ngược',
        styleType: 'Cổ Tích Ngược',
        description: 'Webapp hỗ trợ viết kịch bản YouTube theo phong cách cổ tích ngược.',
        longDescription: 'Phong cách cổ tích ngược kể lại các câu chuyện quen thuộc theo góc nhìn mới, tạo sự bất ngờ và thu hút người xem. Kịch bản được xây dựng với cấu trúc rõ ràng: mở đầu gây tò mò, thân bài diễn biến bất ngờ, và kết thúc ấn tượng.',
        icon: '📖',
        suitable: ['Kênh kể chuyện', 'Kênh giải trí', 'Kênh văn hóa'],
        videoLength: '8-15 phút',
        demoVideoUrl: 'https://www.youtube.com/watch?v=demo',
        price: '500.000 VNĐ',
    },
    'nguoi-que-kinh-te': {
        name: 'WebApp Viết Kịch Bản – Người Que Kinh Tế',
        styleType: 'Kinh tế',
        description: 'Kịch bản giải thích các khái niệm kinh tế theo phong cách hoạt hình người que.',
        longDescription: 'Phong cách này giúp giải thích các khái niệm kinh tế, tài chính phức tạp một cách đơn giản và dễ hiểu thông qua hình ảnh hoạt hình người que. Phù hợp với người xem mọi lứa tuổi.',
        icon: '📊',
        suitable: ['Kênh kinh tế', 'Kênh giáo dục', 'Kênh tài chính'],
        videoLength: '5-10 phút',
        demoVideoUrl: 'https://www.youtube.com/watch?v=demo',
        price: '500.000 VNĐ',
    },
    'storytelling': {
        name: 'WebApp Viết Kịch Bản – Storytelling',
        styleType: 'Storytelling',
        description: 'Kịch bản kể chuyện cuốn hút, xây dựng cảm xúc và giữ chân người xem.',
        longDescription: 'Storytelling là nghệ thuật kể chuyện đầy cảm xúc, giúp người xem đồng cảm và theo dõi video đến phút cuối. Kịch bản được xây dựng theo cấu trúc 3 phần kinh điển với các điểm nhấn cảm xúc.',
        icon: '🎬',
        suitable: ['Kênh kể chuyện', 'Kênh giải trí', 'Mọi loại kênh'],
        videoLength: '10-20 phút',
        demoVideoUrl: 'https://www.youtube.com/watch?v=demo',
        price: '500.000 VNĐ',
    },
    'shorts-reels': {
        name: 'WebApp Viết Kịch Bản – Shorts / Reels',
        styleType: 'Video ngắn',
        description: 'Kịch bản ngắn gọn cho YouTube Shorts, TikTok, Reels.',
        longDescription: 'Video ngắn đòi hỏi kịch bản súc tích, hook ngay từ giây đầu tiên. WebApp này giúp tạo kịch bản 15-60 giây với cấu trúc tối ưu cho thuật toán đề xuất.',
        icon: '⚡',
        suitable: ['YouTube Shorts', 'TikTok', 'Instagram Reels'],
        videoLength: '15-60 giây',
        demoVideoUrl: 'https://www.youtube.com/watch?v=demo',
        price: '300.000 VNĐ',
    },
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const webapp = webappsData[slug];

    if (!webapp) {
        return { title: 'Không tìm thấy WebApp' };
    }

    return {
        title: webapp.name,
        description: webapp.description,
    };
}

const processSteps = [
    { step: 1, title: 'Đăng ký tài khoản', description: 'Tạo tài khoản miễn phí tại AnVi Technology' },
    { step: 2, title: 'Thanh toán mua quyền truy cập', description: 'Thanh toán qua QR Banking để được cấp quyền' },
    { step: 3, title: 'Được cấp quyền truy cập', description: 'Tài khoản được cấp quyền truy cập webapp' },
    { step: 4, title: 'Đăng nhập và sử dụng', description: 'Đăng nhập vào webapp và bắt đầu viết kịch bản' },
];

export default async function WebAppDetailPage({ params }: Props) {
    const { slug } = await params;
    const webapp = webappsData[slug];

    if (!webapp) {
        notFound();
    }

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                {/* Hero */}
                <section className="section pb-8">
                    <div className="container-custom">
                        <Link
                            href="/webapp-viet-kich-ban"
                            className="inline-flex items-center text-dark-400 hover:text-dark-200 mb-6"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Quay lại Danh mục WebApp
                        </Link>

                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-5xl">{webapp.icon}</span>
                                    <Badge variant="primary">{webapp.styleType}</Badge>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-4">
                                    {webapp.name}
                                </h1>

                                <p className="text-lg text-dark-300 mb-6">
                                    {webapp.description}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Button variant="primary" size="lg">
                                        Mua & truy cập WebApp
                                    </Button>
                                    <Button variant="secondary" size="lg">
                                        Xem video demo
                                    </Button>
                                </div>
                            </div>

                            {/* Video Demo Placeholder */}
                            <div className="w-full lg:w-[480px]">
                                <Card>
                                    <div className="aspect-video bg-dark-700 rounded-t-xl flex items-center justify-center">
                                        <div className="text-dark-500 text-center">
                                            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="mt-2 text-sm">Video Demo</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Description */}
                <section className="section bg-dark-950 pt-8">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-xl font-bold text-dark-50 mb-4">
                                    Phong cách kịch bản
                                </h2>
                                <Card>
                                    <CardContent>
                                        <p className="text-dark-300 leading-relaxed">
                                            {webapp.longDescription}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-dark-50 mb-4">
                                    Phù hợp với
                                </h2>
                                <Card>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {webapp.suitable.map((item) => (
                                                <li key={item} className="flex items-center gap-3 text-dark-300">
                                                    <span className="text-accent-green">✓</span>
                                                    {item}
                                                </li>
                                            ))}
                                            <li className="flex items-center gap-3 text-dark-300">
                                                <span className="text-primary-400">⏱</span>
                                                Độ dài video gợi ý: {webapp.videoLength}
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="section">
                    <div className="container-custom">
                        <h2 className="text-2xl font-bold text-dark-50 mb-8 text-center">
                            Quy trình sử dụng
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {processSteps.map((item) => (
                                <div key={item.step} className="text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/20 text-primary-400 text-lg font-bold mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="font-semibold text-dark-100 mb-2">{item.title}</h3>
                                    <p className="text-dark-400 text-sm">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className="section bg-dark-950">
                    <div className="container-custom">
                        <div className="max-w-md mx-auto">
                            <Card variant="elevated" className="text-center">
                                <CardContent className="py-8">
                                    <h2 className="text-xl font-bold text-dark-50 mb-2">
                                        Quyền truy cập WebApp
                                    </h2>
                                    <p className="text-dark-400 mb-6">
                                        Cấp quyền sử dụng WebApp vĩnh viễn
                                    </p>

                                    <div className="text-4xl font-bold text-primary-400 mb-6">
                                        {webapp.price}
                                    </div>

                                    <ul className="text-left space-y-2 mb-8">
                                        <li className="flex items-center gap-2 text-dark-300 text-sm">
                                            <span className="text-accent-green">✓</span>
                                            Truy cập webapp không giới hạn
                                        </li>
                                        <li className="flex items-center gap-2 text-dark-300 text-sm">
                                            <span className="text-accent-green">✓</span>
                                            Không giới hạn số lượng kịch bản
                                        </li>
                                        <li className="flex items-center gap-2 text-dark-300 text-sm">
                                            <span className="text-accent-green">✓</span>
                                            Cập nhật miễn phí
                                        </li>
                                        <li className="flex items-center gap-2 text-dark-300 text-sm">
                                            <span className="text-dark-500">✗</span>
                                            Không chuyển nhượng
                                        </li>
                                    </ul>

                                    <Button variant="primary" size="lg" className="w-full">
                                        Mua & truy cập WebApp
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
