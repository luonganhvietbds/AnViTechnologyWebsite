import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Chính sách hoàn tiền',
    description: 'Chính sách hoàn tiền của Công ty TNHH AnVi Technology.',
};

export default function RefundPolicyPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                <section className="section">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-8 text-center">
                                CHÍNH SÁCH HOÀN TIỀN
                            </h1>

                            <Card>
                                <CardContent className="prose prose-invert max-w-none space-y-8">
                                    {/* Section 1 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            1. Nguyên tắc chung
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Sản phẩm là <strong className="text-dark-100">dịch vụ số</strong>, không áp dụng chính sách đổi/trả như hàng hóa vật lý</li>
                                            <li>Người dùng cần xem kỹ mô tả và video demo trước khi mua</li>
                                            <li>Sau khi thanh toán và được cấp quyền, <strong className="text-dark-100">không hỗ trợ hoàn tiền</strong> trong trường hợp thông thường</li>
                                        </ul>
                                    </section>

                                    {/* Section 2 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            2. Các trường hợp được hoàn tiền
                                        </h2>
                                        <div className="bg-accent-green/10 rounded-lg p-4 border border-accent-green/30 mb-4">
                                            <p className="text-accent-green font-medium mb-2">✅ Được hoàn tiền khi:</p>
                                            <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                                <li>Sản phẩm <strong className="text-dark-100">không hoạt động đúng như mô tả</strong> (lỗi kỹ thuật từ phía nhà cung cấp)</li>
                                                <li>Thanh toán thành công nhưng <strong className="text-dark-100">không được cấp quyền truy cập</strong> sau 48 giờ</li>
                                                <li>Lỗi kỹ thuật kéo dài mà không thể khắc phục</li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* Section 3 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            3. Các trường hợp KHÔNG được hoàn tiền
                                        </h2>
                                        <div className="bg-accent-red/10 rounded-lg p-4 border border-accent-red/30 mb-4">
                                            <p className="text-accent-red font-medium mb-2">❌ Không được hoàn tiền khi:</p>
                                            <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                                <li>Đã sử dụng sản phẩm và <strong className="text-dark-100">đổi ý không muốn dùng tiếp</strong></li>
                                                <li>Sản phẩm không phù hợp với kỳ vọng cá nhân (nhưng vẫn hoạt động đúng mô tả)</li>
                                                <li>Vi phạm điều khoản sử dụng dẫn đến bị khóa tài khoản</li>
                                                <li>Lỗi do người dùng (không biết cách sử dụng, thiết bị không tương thích...)</li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* Section 4 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            4. Quy trình hoàn tiền
                                        </h2>
                                        <ol className="text-dark-300 space-y-3">
                                            <li className="flex gap-3">
                                                <span className="bg-primary-500/20 text-primary-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">1</span>
                                                <span>Gửi yêu cầu hoàn tiền qua email <strong className="text-primary-400">contact@anvitech.vn</strong></span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="bg-primary-500/20 text-primary-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">2</span>
                                                <span>Cung cấp: Mã đơn hàng, Email đăng ký, Lý do yêu cầu hoàn tiền, Bằng chứng (nếu có)</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="bg-primary-500/20 text-primary-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">3</span>
                                                <span>Chờ xác minh từ bộ phận hỗ trợ (trong <strong className="text-dark-100">3-5 ngày làm việc</strong>)</span>
                                            </li>
                                            <li className="flex gap-3">
                                                <span className="bg-primary-500/20 text-primary-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">4</span>
                                                <span>Nếu được chấp thuận, hoàn tiền qua chuyển khoản trong <strong className="text-dark-100">7-14 ngày làm việc</strong></span>
                                            </li>
                                        </ol>
                                    </section>

                                    {/* Section 5 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            5. Thời hạn yêu cầu hoàn tiền
                                        </h2>
                                        <p className="text-dark-300">
                                            Yêu cầu hoàn tiền chỉ được xem xét trong vòng <strong className="text-dark-100">7 ngày</strong> kể từ ngày thanh toán.
                                        </p>
                                    </section>

                                    {/* Contact */}
                                    <section className="bg-dark-900 rounded-lg p-6 border border-dark-700">
                                        <h2 className="text-lg font-semibold text-dark-50 mb-2">
                                            Liên hệ hỗ trợ hoàn tiền
                                        </h2>
                                        <p className="text-dark-300">
                                            Email: <strong className="text-primary-400">contact@anvitech.vn</strong>
                                        </p>
                                    </section>
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
