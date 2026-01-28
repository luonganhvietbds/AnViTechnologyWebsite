import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Hướng dẫn mua hàng',
    description: 'Hướng dẫn quy trình mua và sử dụng webapp viết kịch bản và phần mềm phụ trợ tại AnVi Technology.',
};

const steps = [
    {
        step: 1,
        title: 'Chọn sản phẩm',
        description: 'Truy cập danh mục WebApp viết kịch bản hoặc Phần mềm phụ trợ. Xem mô tả chi tiết từng sản phẩm và video demo để hiểu rõ chức năng.',
        icon: '🔍',
    },
    {
        step: 2,
        title: 'Xem chi tiết sản phẩm',
        description: 'Xem mô tả phong cách kịch bản hoặc tính năng phần mềm. Xem quy trình sử dụng và thông tin quyền truy cập / license.',
        icon: '📋',
    },
    {
        step: 3,
        title: 'Tạo đơn hàng',
        description: 'Nhấn nút "Mua & truy cập" trên trang chi tiết sản phẩm. Hệ thống tạo đơn hàng và hiển thị thông tin xác nhận.',
        icon: '🛒',
    },
    {
        step: 4,
        title: 'Thanh toán',
        description: 'Thanh toán bằng chuyển khoản ngân hàng hoặc quét mã QR Banking. Ghi đúng nội dung chuyển khoản (mã đơn hàng) theo hướng dẫn.',
        icon: '💳',
    },
    {
        step: 5,
        title: 'Xác nhận và cấp quyền',
        description: 'Sau khi thanh toán được xác nhận, bạn sẽ được cấp quyền truy cập webapp hoặc nhận license phần mềm.',
        icon: '✅',
    },
    {
        step: 6,
        title: 'Đăng nhập và sử dụng',
        description: 'Đăng nhập vào tài khoản, truy cập Dashboard và sử dụng webapp hoặc phần mềm theo quyền đã mua.',
        icon: '🚀',
    },
];

export default function PurchaseGuidePage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                {/* Hero */}
                <section className="section pb-8">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-50 mb-4">
                                Hướng dẫn mua hàng
                            </h1>
                            <p className="text-lg text-dark-300">
                                Hướng dẫn quy trình mua và sử dụng webapp viết kịch bản
                                và phần mềm phụ trợ tại AnVi Technology.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Steps */}
                <section className="section pt-0">
                    <div className="container-custom">
                        <div className="max-w-3xl mx-auto space-y-6">
                            {steps.map((item, index) => (
                                <Card key={item.step} className="relative">
                                    {index < steps.length - 1 && (
                                        <div className="absolute left-10 top-full w-0.5 h-6 bg-gradient-to-b from-primary-500/50 to-transparent" />
                                    )}
                                    <CardContent className="flex gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-14 h-14 rounded-xl bg-primary-500/20 flex items-center justify-center text-2xl">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <Badge variant="primary" size="sm">Bước {item.step}</Badge>
                                                <h3 className="font-semibold text-dark-50">{item.title}</h3>
                                            </div>
                                            <p className="text-dark-400">{item.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Important Notes */}
                <section className="section bg-dark-950">
                    <div className="container-custom">
                        <div className="max-w-3xl mx-auto">
                            <Card variant="glass">
                                <CardContent>
                                    <h2 className="text-xl font-bold text-dark-50 mb-4">
                                        Lưu ý quan trọng
                                    </h2>
                                    <ul className="space-y-3 text-dark-300">
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent-yellow">⚠️</span>
                                            <span>Sản phẩm là <strong className="text-dark-100">dịch vụ số</strong>, không giao hàng vật lý</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent-yellow">⚠️</span>
                                            <span>Quyền sử dụng được cấp theo <strong className="text-dark-100">tài khoản</strong> và không được chuyển nhượng</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-accent-yellow">⚠️</span>
                                            <span>Vui lòng đọc kỹ <strong className="text-dark-100">chính sách hoàn tiền</strong> trước khi mua</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary-400">ℹ️</span>
                                            <span>Website chỉ hỗ trợ thanh toán <strong className="text-dark-100">chuyển khoản / QR Banking</strong></span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary-400">ℹ️</span>
                                            <span>Không hỗ trợ COD hoặc ví điện tử</span>
                                        </li>
                                    </ul>
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
