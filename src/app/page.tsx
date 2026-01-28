import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button, Card, CardContent, Badge } from '@/components/ui';

// WebApp styles data
const webappStyles = [
    {
        name: 'Cổ Tích Ngược',
        description: 'Kịch bản theo phong cách cổ tích ngược, sáng tạo và dễ viral',
        slug: 'co-tich-nguoc',
        icon: '📖',
    },
    {
        name: 'Người Que Kể Chuyện Kinh Tế',
        description: 'Phong cách giải thích kinh tế dạng hoạt hình người que',
        slug: 'nguoi-que-kinh-te',
        icon: '📊',
    },
    {
        name: 'Storytelling',
        description: 'Kịch bản kể chuyện cuốn hút, phù hợp nhiều chủ đề',
        slug: 'storytelling',
        icon: '🎬',
    },
    {
        name: 'Shorts / Reels',
        description: 'Kịch bản ngắn cho YouTube Shorts, TikTok, Reels',
        slug: 'shorts-reels',
        icon: '⚡',
    },
];

// Process steps
const processSteps = [
    {
        step: 1,
        title: 'Chọn WebApp phù hợp',
        description: 'Xem danh mục và chọn phong cách kịch bản phù hợp với kênh của bạn',
    },
    {
        step: 2,
        title: 'Xem video demo',
        description: 'Xem video mẫu để hiểu rõ cách webapp hoạt động',
    },
    {
        step: 3,
        title: 'Thanh toán QR Banking',
        description: 'Thanh toán nhanh chóng qua chuyển khoản ngân hàng',
    },
    {
        step: 4,
        title: 'Được cấp quyền truy cập',
        description: 'Tài khoản được cấp quyền sử dụng webapp ngay sau khi xác nhận',
    },
];

// Ecosystem products
const ecosystemProducts = [
    {
        title: 'WebApp Viết Kịch Bản',
        description: 'Các webapp viết kịch bản YouTube theo nhiều phong cách nội dung khác nhau',
        icon: '✍️',
        href: '/webapp-viet-kich-ban',
    },
    {
        title: 'Phần Mềm Online',
        description: 'Công cụ online hỗ trợ quy trình sản xuất và tự động hóa nội dung',
        icon: '🌐',
        href: '/phan-mem-phu-tro',
    },
    {
        title: 'Phần Mềm Offline',
        description: 'Phần mềm cài đặt trên máy tính phục vụ sản xuất nội dung',
        icon: '💻',
        href: '/phan-mem-phu-tro',
    },
];

export default function HomePage() {
    return (
        <>
            <Header />

            <main className="min-h-screen">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center pt-20">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900 to-dark-950">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-900 to-dark-900" />
                        {/* Grid pattern */}
                        <div
                            className="absolute inset-0 opacity-[0.02]"
                            style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                            }}
                        />
                    </div>

                    <div className="container-custom relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <Badge variant="primary" className="mb-6">
                                🚀 Nền tảng viết kịch bản YouTube
                            </Badge>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark-50 leading-tight">
                                WebApp Viết Kịch Bản YouTube
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                                    {' '}& Tự Động Hóa Nội Dung
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-dark-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Cung cấp các webapp viết kịch bản YouTube theo nhiều phong cách nội dung
                                khác nhau và các phần mềm phụ trợ giúp tự động hóa quy trình sản xuất video.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/webapp-viet-kich-ban">
                                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                                        Xem các WebApp
                                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Button>
                                </Link>
                                <Link href="/gioi-thieu">
                                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                        Tìm hiểu thêm
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <svg className="w-6 h-6 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </section>

                {/* Ecosystem Section */}
                <section className="section bg-dark-950">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-dark-50 mb-4">
                                Hệ sinh thái sản phẩm của AnVi Technology
                            </h2>
                            <p className="text-dark-400 max-w-2xl mx-auto">
                                Giải pháp toàn diện cho người làm nội dung YouTube, TikTok, và các nền tảng video
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {ecosystemProducts.map((product) => (
                                <Link key={product.title} href={product.href}>
                                    <Card hover className="h-full group">
                                        <CardContent>
                                            <div className="text-4xl mb-4">{product.icon}</div>
                                            <h3 className="text-lg font-semibold text-dark-50 mb-2 group-hover:text-primary-400 transition-colors">
                                                {product.title}
                                            </h3>
                                            <p className="text-dark-400 text-sm">
                                                {product.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WebApp Styles Section */}
                <section className="section">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-dark-50 mb-4">
                                Các phong cách viết kịch bản YouTube
                            </h2>
                            <p className="text-dark-400 max-w-2xl mx-auto">
                                Mỗi webapp được thiết kế cho một phong cách nội dung cụ thể,
                                giúp bạn tạo kịch bản phù hợp với kênh của mình
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {webappStyles.map((style) => (
                                <Card key={style.slug} hover className="group">
                                    <CardContent>
                                        <div className="text-4xl mb-4">{style.icon}</div>
                                        <h3 className="text-lg font-semibold text-dark-50 mb-2 group-hover:text-primary-400 transition-colors">
                                            {style.name}
                                        </h3>
                                        <p className="text-dark-400 text-sm mb-4">
                                            {style.description}
                                        </p>
                                        <Link
                                            href={`/webapp/${style.slug}`}
                                            className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300"
                                        >
                                            Xem chi tiết
                                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <Link href="/webapp-viet-kich-ban">
                                <Button variant="secondary" size="lg">
                                    Xem tất cả WebApp
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="section bg-dark-950">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-dark-50 mb-4">
                                Quy trình sử dụng
                            </h2>
                            <p className="text-dark-400 max-w-2xl mx-auto">
                                Bắt đầu sử dụng webapp viết kịch bản chỉ với 4 bước đơn giản
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {processSteps.map((item, index) => (
                                <div key={item.step} className="relative">
                                    {/* Connector line */}
                                    {index < processSteps.length - 1 && (
                                        <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-primary-500/50 to-transparent" />
                                    )}

                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 text-primary-400 text-2xl font-bold mb-4">
                                            {item.step}
                                        </div>
                                        <h3 className="text-lg font-semibold text-dark-50 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-dark-400 text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section">
                    <div className="container-custom">
                        <Card variant="elevated" className="relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-900/10" />
                            <CardContent className="relative text-center py-12 md:py-16">
                                <h2 className="text-2xl md:text-3xl font-bold text-dark-50 mb-4">
                                    Bắt đầu sử dụng WebApp viết kịch bản phù hợp với bạn
                                </h2>
                                <p className="text-dark-400 mb-8 max-w-xl mx-auto">
                                    Khám phá các webapp và phần mềm hỗ trợ tạo nội dung chất lượng cho kênh của bạn
                                </p>
                                <Link href="/webapp-viet-kich-ban">
                                    <Button variant="primary" size="lg">
                                        Xem danh sách WebApp
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
