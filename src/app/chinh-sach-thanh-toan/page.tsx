import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Chính sách thanh toán',
    description: 'Chính sách thanh toán của Công ty TNHH AnVi Technology.',
};

export default function PaymentPolicyPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                <section className="section">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-8 text-center">
                                CHÍNH SÁCH THANH TOÁN
                            </h1>

                            <Card>
                                <CardContent className="prose prose-invert max-w-none space-y-8">
                                    {/* Section 1 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            1. Phương thức thanh toán
                                        </h2>
                                        <p className="text-dark-300 mb-4">
                                            Website hiện tại chỉ hỗ trợ thanh toán bằng phương thức:
                                        </p>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li><strong className="text-dark-100">Chuyển khoản ngân hàng (Banking)</strong></li>
                                            <li><strong className="text-dark-100">Quét mã QR (QR Banking)</strong></li>
                                        </ul>
                                        <p className="text-dark-400 mt-4 text-sm">
                                            Không hỗ trợ thanh toán tiền mặt (COD), ví điện tử, thẻ tín dụng hoặc các hình thức khác.
                                        </p>
                                    </section>

                                    {/* Section 2 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            2. Thông tin tài khoản nhận thanh toán
                                        </h2>
                                        <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
                                            <ul className="text-dark-300 space-y-2">
                                                <li><strong className="text-dark-100">Ngân hàng:</strong> MB Bank</li>
                                                <li><strong className="text-dark-100">Số tài khoản:</strong> 19928668868686</li>
                                                <li><strong className="text-dark-100">Tên tài khoản:</strong> Lương Anh Việt</li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* Section 3 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            3. Nội dung chuyển khoản
                                        </h2>
                                        <p className="text-dark-300 mb-2">
                                            Khi chuyển khoản, vui lòng ghi <strong className="text-dark-100">chính xác nội dung</strong> theo mẫu:
                                        </p>
                                        <div className="bg-primary-500/10 rounded-lg p-4 border border-primary-500/30 text-center">
                                            <code className="text-primary-400 font-mono text-lg">[Mã đơn hàng]</code>
                                        </div>
                                        <p className="text-dark-400 mt-4 text-sm">
                                            Ví dụ: AV-20260128-A1B2
                                        </p>
                                        <p className="text-accent-yellow mt-2 text-sm">
                                            ⚠️ Sai nội dung có thể khiến đơn hàng không được xử lý tự động.
                                        </p>
                                    </section>

                                    {/* Section 4 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            4. Xác nhận thanh toán
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Đơn hàng sẽ được <strong className="text-dark-100">xác nhận sau khi admin kiểm tra</strong> chuyển khoản</li>
                                            <li>Thời gian xử lý thông thường: <strong className="text-dark-100">trong vòng 24 giờ</strong></li>
                                            <li>Sau khi xác nhận, bạn sẽ được cấp quyền truy cập sản phẩm</li>
                                        </ul>
                                    </section>

                                    {/* Section 5 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            5. Điều kiện hủy thanh toán
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Có thể hủy đơn hàng <strong className="text-dark-100">trước khi thanh toán</strong></li>
                                            <li>Sau khi thanh toán thành công, việc hoàn tiền tuân theo <strong className="text-dark-100">Chính sách hoàn tiền</strong></li>
                                        </ul>
                                    </section>

                                    {/* Section 6 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            6. Bảo mật thanh toán
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Toàn bộ thông tin giao dịch được bảo mật</li>
                                            <li>Website không lưu trữ thông tin tài khoản ngân hàng của người dùng</li>
                                        </ul>
                                    </section>

                                    {/* Contact */}
                                    <section className="bg-dark-900 rounded-lg p-6 border border-dark-700">
                                        <h2 className="text-lg font-semibold text-dark-50 mb-2">
                                            Liên hệ hỗ trợ
                                        </h2>
                                        <p className="text-dark-300">
                                            Nếu có vấn đề về thanh toán, vui lòng liên hệ: <br />
                                            <strong className="text-primary-400">contact@anvitech.vn</strong>
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
