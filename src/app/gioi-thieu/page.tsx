import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Giới thiệu về AnVi Technology',
    description: 'Đơn vị phát triển và cung cấp các webapp viết kịch bản YouTube và phần mềm hỗ trợ tự động hóa nội dung số.',
};

const commitments = [
    {
        title: 'Minh bạch thông tin',
        description: 'Mô tả đầy đủ và chính xác về sản phẩm và dịch vụ',
        icon: '✅',
    },
    {
        title: 'Cung cấp đúng chức năng',
        description: 'Sản phẩm hoạt động đúng như mô tả trên website',
        icon: '🎯',
    },
    {
        title: 'Bảo mật thông tin',
        description: 'Cam kết bảo vệ thông tin cá nhân người dùng',
        icon: '🔒',
    },
    {
        title: 'Tuân thủ pháp luật',
        description: 'Hoạt động theo quy định pháp luật Việt Nam',
        icon: '⚖️',
    },
];

const targetCustomers = [
    {
        title: 'Người làm kênh YouTube',
        description: 'Tạo nội dung video dài, xây dựng kênh bền vững',
        icon: '📺',
    },
    {
        title: 'Người làm TikTok, Reels',
        description: 'Sản xuất video ngắn, nội dung trending',
        icon: '📱',
    },
    {
        title: 'Người làm Affiliate, MMO',
        description: 'Tạo nội dung phục vụ kiếm tiền online',
        icon: '💰',
    },
    {
        title: 'Nhóm sản xuất nội dung',
        description: 'Team làm nội dung số chuyên nghiệp',
        icon: '👥',
    },
];

export default function AboutPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                {/* Hero */}
                <section className="section">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-dark-50 mb-6">
                                Giới thiệu về AnVi Technology
                            </h1>
                            <p className="text-xl text-dark-300 leading-relaxed">
                                Đơn vị phát triển và cung cấp các webapp viết kịch bản YouTube
                                và phần mềm hỗ trợ tự động hóa nội dung số.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Company Info */}
                <section className="section bg-dark-950 pt-0">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-2xl font-bold text-dark-50 mb-6">
                                    Thông tin doanh nghiệp
                                </h2>
                                <Card>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <span className="text-dark-500 text-sm">Tên đầy đủ</span>
                                            <p className="text-dark-100 font-medium">Công ty TNHH AnVi Technology</p>
                                        </div>
                                        <div>
                                            <span className="text-dark-500 text-sm">Lĩnh vực hoạt động</span>
                                            <p className="text-dark-100">Phát triển phần mềm, cung cấp webapp viết kịch bản và công cụ hỗ trợ sản xuất nội dung</p>
                                        </div>
                                        <div>
                                            <span className="text-dark-500 text-sm">Mô hình cung cấp dịch vụ</span>
                                            <p className="text-dark-100">Dịch vụ số, cấp quyền truy cập sau thanh toán</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-dark-50 mb-6">
                                    Định hướng sản phẩm
                                </h2>
                                <Card>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            <li className="flex gap-3">
                                                <span className="text-accent-green">✓</span>
                                                <span className="text-dark-300">Phát triển các webapp viết kịch bản YouTube theo nhiều phong cách nội dung khác nhau</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-accent-green">✓</span>
                                                <span className="text-dark-300">Cung cấp phần mềm online và offline phục vụ tự động hóa quy trình sản xuất nội dung</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-dark-500">✗</span>
                                                <span className="text-dark-400">Không trực tiếp tạo video hoặc hình ảnh trên website</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="text-dark-500">✗</span>
                                                <span className="text-dark-400">Không kết nối API tạo video/ảnh từ website</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Target Customers */}
                <section className="section">
                    <div className="container-custom">
                        <h2 className="text-2xl md:text-3xl font-bold text-dark-50 mb-8 text-center">
                            Đối tượng sử dụng dịch vụ
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {targetCustomers.map((customer) => (
                                <Card key={customer.title}>
                                    <CardContent className="text-center">
                                        <div className="text-4xl mb-4">{customer.icon}</div>
                                        <h3 className="font-semibold text-dark-100 mb-2">{customer.title}</h3>
                                        <p className="text-dark-400 text-sm">{customer.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Commitments */}
                <section className="section bg-dark-950">
                    <div className="container-custom">
                        <h2 className="text-2xl md:text-3xl font-bold text-dark-50 mb-8 text-center">
                            Cam kết của chúng tôi
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {commitments.map((item) => (
                                <Card key={item.title} variant="glass">
                                    <CardContent className="text-center">
                                        <div className="text-4xl mb-4">{item.icon}</div>
                                        <h3 className="font-semibold text-dark-100 mb-2">{item.title}</h3>
                                        <p className="text-dark-400 text-sm">{item.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Legal */}
                <section className="section">
                    <div className="container-custom">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl font-bold text-dark-50 mb-6">
                                Pháp lý và tuân thủ
                            </h2>
                            <Card>
                                <CardContent className="space-y-4 text-left">
                                    <p className="text-dark-300">
                                        Website hoạt động theo quy định pháp luật Việt Nam về thương mại điện tử và cung cấp dịch vụ số.
                                    </p>
                                    <p className="text-dark-300">
                                        Có đầy đủ chính sách bảo mật, thanh toán, giao nhận, hoàn tiền được công bố công khai.
                                    </p>
                                    <p className="text-dark-300">
                                        Thông tin doanh nghiệp được công khai rõ ràng tại phần chân trang của website.
                                    </p>
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
