import { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button, Card, CardContent, Badge } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Danh mục WebApp Viết Kịch Bản YouTube',
    description: 'Các webapp hỗ trợ viết kịch bản YouTube theo từng phong cách nội dung khác nhau, phù hợp nhiều loại kênh và mục đích sử dụng.',
};

// Mock data - sẽ được lấy từ database trong thực tế
const webapps = [
    {
        id: '1',
        name: 'WebApp Viết Kịch Bản – Cổ Tích Ngược',
        slug: 'co-tich-nguoc',
        styleType: 'Cổ Tích Ngược',
        description: 'Webapp hỗ trợ viết kịch bản YouTube theo phong cách cổ tích ngược, phù hợp cho nội dung kể chuyện sáng tạo và dễ viral.',
        icon: '📖',
        status: 'ACTIVE',
    },
    {
        id: '2',
        name: 'WebApp Viết Kịch Bản – Người Que Kinh Tế',
        slug: 'nguoi-que-kinh-te',
        styleType: 'Kinh tế',
        description: 'Kịch bản giải thích các khái niệm kinh tế, tài chính theo phong cách hoạt hình người que dễ hiểu.',
        icon: '📊',
        status: 'ACTIVE',
    },
    {
        id: '3',
        name: 'WebApp Viết Kịch Bản – Storytelling',
        slug: 'storytelling',
        styleType: 'Storytelling',
        description: 'Kịch bản kể chuyện cuốn hút, xây dựng cảm xúc và giữ chân người xem đến cuối video.',
        icon: '🎬',
        status: 'ACTIVE',
    },
    {
        id: '4',
        name: 'WebApp Viết Kịch Bản – Shorts / Reels',
        slug: 'shorts-reels',
        styleType: 'Video ngắn',
        description: 'Kịch bản ngắn gọn, súc tích cho YouTube Shorts, TikTok, Instagram Reels.',
        icon: '⚡',
        status: 'ACTIVE',
    },
    {
        id: '5',
        name: 'WebApp Viết Kịch Bản – Giáo dục',
        slug: 'giao-duc',
        styleType: 'Giáo dục',
        description: 'Kịch bản phục vụ nội dung giáo dục, giải thích kiến thức một cách dễ hiểu.',
        icon: '📚',
        status: 'ACTIVE',
    },
    {
        id: '6',
        name: 'WebApp Viết Kịch Bản – Review sản phẩm',
        slug: 'review-san-pham',
        styleType: 'Review',
        description: 'Kịch bản review sản phẩm chuyên nghiệp, phù hợp cho affiliate marketing.',
        icon: '⭐',
        status: 'ACTIVE',
    },
];

const styleFilters = [
    'Tất cả',
    'Cổ Tích Ngược',
    'Kinh tế',
    'Storytelling',
    'Video ngắn',
    'Giáo dục',
    'Review',
];

export default function WebAppListingPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                {/* Hero */}
                <section className="section pb-8">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-50 mb-4">
                                Danh mục WebApp Viết Kịch Bản YouTube
                            </h1>
                            <p className="text-lg text-dark-300">
                                Các webapp hỗ trợ viết kịch bản YouTube theo từng phong cách nội dung khác nhau,
                                phù hợp nhiều loại kênh và mục đích sử dụng.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <section className="pb-8">
                    <div className="container-custom">
                        <div className="flex flex-wrap gap-2">
                            {styleFilters.map((filter, index) => (
                                <button
                                    key={filter}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${index === 0
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WebApp Grid */}
                <section className="section pt-0">
                    <div className="container-custom">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {webapps.map((webapp) => (
                                <Card key={webapp.id} hover className="group h-full flex flex-col">
                                    <CardContent className="flex-1 flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-4xl">{webapp.icon}</div>
                                            <Badge variant="primary" size="sm">
                                                {webapp.styleType}
                                            </Badge>
                                        </div>

                                        <h3 className="text-lg font-semibold text-dark-50 mb-2 group-hover:text-primary-400 transition-colors">
                                            {webapp.name}
                                        </h3>

                                        <p className="text-dark-400 text-sm mb-6 flex-1">
                                            {webapp.description}
                                        </p>

                                        <Link href={`/webapp/${webapp.slug}`}>
                                            <Button variant="secondary" className="w-full">
                                                Xem chi tiết
                                                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Video Demo Section */}
                <section className="section bg-dark-950">
                    <div className="container-custom">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-dark-50 mb-4">
                                Xem ví dụ kịch bản được tạo từ các WebApp
                            </h2>
                            <p className="text-dark-400 max-w-2xl mx-auto">
                                Các video demo giúp bạn hiểu rõ hơn về chất lượng kịch bản được tạo ra
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <Card key={i}>
                                    <div className="aspect-video bg-dark-700 rounded-t-xl flex items-center justify-center">
                                        <div className="text-dark-500">
                                            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <CardContent>
                                        <h4 className="font-medium text-dark-100 mb-1">Demo WebApp #{i}</h4>
                                        <p className="text-dark-500 text-sm">Ví dụ kịch bản được tạo</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Suggestions */}
                <section className="section">
                    <div className="container-custom">
                        <h2 className="text-2xl font-bold text-dark-50 mb-8 text-center">
                            Chọn WebApp phù hợp với kênh của bạn
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Card>
                                <CardContent>
                                    <h3 className="font-semibold text-dark-100 mb-3">🌟 Người mới bắt đầu</h3>
                                    <p className="text-dark-400 text-sm mb-4">
                                        Nếu bạn mới làm YouTube, hãy thử các webapp với phong cách
                                        Storytelling hoặc Cổ Tích Ngược - dễ viral và thu hút người xem.
                                    </p>
                                    <Link href="/webapp/storytelling" className="text-primary-400 text-sm hover:text-primary-300">
                                        Xem Storytelling →
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <h3 className="font-semibold text-dark-100 mb-3">📈 Làm nhiều kênh</h3>
                                    <p className="text-dark-400 text-sm mb-4">
                                        Với nhiều kênh khác nhau, bạn có thể sử dụng kết hợp
                                        nhiều webapp để tạo nội dung đa dạng và không bị trùng lặp.
                                    </p>
                                    <Link href="/webapp-viet-kich-ban" className="text-primary-400 text-sm hover:text-primary-300">
                                        Xem tất cả →
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <h3 className="font-semibold text-dark-100 mb-3">⚡ Nội dung ngắn</h3>
                                    <p className="text-dark-400 text-sm mb-4">
                                        TikTok, Shorts, Reels? WebApp Shorts/Reels được tối ưu
                                        cho video ngắn 15-60 giây, giúp tạo content nhanh chóng.
                                    </p>
                                    <Link href="/webapp/shorts-reels" className="text-primary-400 text-sm hover:text-primary-300">
                                        Xem Shorts/Reels →
                                    </Link>
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
