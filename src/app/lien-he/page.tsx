import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Button, Card, CardContent, Input } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Liên hệ',
    description: 'Liên hệ với AnVi Technology về sản phẩm, dịch vụ và hỗ trợ.',
};

export default function ContactPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                <section className="section">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-4">
                                    Liên hệ với chúng tôi
                                </h1>
                                <p className="text-lg text-dark-300">
                                    Có câu hỏi về sản phẩm hoặc cần hỗ trợ? Chúng tôi sẵn sàng giúp đỡ.
                                </p>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Contact Info */}
                                <div>
                                    <h2 className="text-xl font-semibold text-dark-50 mb-6">
                                        Thông tin liên hệ
                                    </h2>

                                    <div className="space-y-4">
                                        <Card>
                                            <CardContent className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400">
                                                    📧
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-dark-100">Email</h3>
                                                    <p className="text-dark-400 text-sm">Hỗ trợ chung và kỹ thuật</p>
                                                    <a href="mailto:contact@anvitech.vn" className="text-primary-400 hover:text-primary-300">
                                                        contact@anvitech.vn
                                                    </a>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardContent className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400">
                                                    🏢
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-dark-100">Công ty</h3>
                                                    <p className="text-dark-400 text-sm">Công ty TNHH AnVi Technology</p>
                                                    <p className="text-dark-500 text-sm">[Địa chỉ trụ sở chính]</p>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardContent className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400">
                                                    ⏰
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-dark-100">Thời gian phản hồi</h3>
                                                    <p className="text-dark-400 text-sm">
                                                        Chúng tôi sẽ phản hồi trong vòng 24-48 giờ làm việc
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div>
                                    <Card>
                                        <CardContent>
                                            <h2 className="text-xl font-semibold text-dark-50 mb-6">
                                                Gửi tin nhắn
                                            </h2>

                                            <form className="space-y-4">
                                                <Input
                                                    label="Email"
                                                    type="email"
                                                    placeholder="email@example.com"
                                                    required
                                                />

                                                <div>
                                                    <label className="label">Chủ đề</label>
                                                    <select className="input">
                                                        <option value="">Chọn chủ đề...</option>
                                                        <option value="product">Hỏi về sản phẩm</option>
                                                        <option value="payment">Thanh toán / Đơn hàng</option>
                                                        <option value="support">Hỗ trợ kỹ thuật</option>
                                                        <option value="refund">Hoàn tiền</option>
                                                        <option value="other">Khác</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="label">Nội dung</label>
                                                    <textarea
                                                        className="input min-h-[150px] resize-y"
                                                        placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                                                        required
                                                    />
                                                </div>

                                                <Button type="submit" variant="primary" className="w-full">
                                                    Gửi tin nhắn
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
