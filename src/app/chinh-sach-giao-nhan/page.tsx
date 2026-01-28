import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Chính sách giao nhận',
    description: 'Chính sách giao nhận sản phẩm số của Công ty TNHH AnVi Technology.',
};

export default function DeliveryPolicyPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                <section className="section">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-8 text-center">
                                CHÍNH SÁCH GIAO NHẬN
                            </h1>

                            <Card>
                                <CardContent className="prose prose-invert max-w-none space-y-8">
                                    {/* Section 1 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            1. Loại hình sản phẩm
                                        </h2>
                                        <p className="text-dark-300">
                                            Website cung cấp <strong className="text-dark-100">sản phẩm số (dịch vụ số)</strong>, bao gồm:
                                        </p>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside mt-2">
                                            <li>WebApp viết kịch bản (truy cập online qua tài khoản)</li>
                                            <li>Phần mềm online (truy cập qua link)</li>
                                            <li>Phần mềm offline (cài đặt trên máy tính với license key)</li>
                                        </ul>
                                    </section>

                                    {/* Section 2 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            2. Phương thức giao nhận
                                        </h2>
                                        <p className="text-dark-300 mb-4">
                                            Không có giao nhận vật lý. Sản phẩm được "giao" bằng phương thức:
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
                                                <h3 className="font-semibold text-dark-100 mb-2">🌐 WebApp</h3>
                                                <p className="text-dark-400 text-sm">
                                                    Cấp quyền truy cập vào subdomain webapp sau khi thanh toán được xác nhận
                                                </p>
                                            </div>
                                            <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
                                                <h3 className="font-semibold text-dark-100 mb-2">🔑 Phần mềm</h3>
                                                <p className="text-dark-400 text-sm">
                                                    Cung cấp link tải và license key qua email hoặc dashboard
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section 3 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            3. Thời gian giao nhận
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Sau khi thanh toán được xác nhận: <strong className="text-dark-100">trong vòng 24 giờ</strong></li>
                                            <li>Thông thường nhanh hơn (từ vài phút đến vài giờ)</li>
                                        </ul>
                                    </section>

                                    {/* Section 4 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            4. Cách nhận sản phẩm
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Đăng nhập tài khoản tại <strong className="text-primary-400">anvitech.vn</strong></li>
                                            <li>Truy cập Dashboard để xem các sản phẩm đã mua</li>
                                            <li>WebApp: Nhấn vào để truy cập subdomain tương ứng</li>
                                            <li>Phần mềm: Tải file cài đặt và nhập license key</li>
                                        </ul>
                                    </section>

                                    {/* Section 5 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            5. Không hỗ trợ
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Giao hàng vật lý (COD, bưu điện, shipper...)</li>
                                            <li>Gọi điện xác nhận giao hàng</li>
                                        </ul>
                                    </section>

                                    {/* Contact */}
                                    <section className="bg-dark-900 rounded-lg p-6 border border-dark-700">
                                        <h2 className="text-lg font-semibold text-dark-50 mb-2">
                                            Hỗ trợ giao nhận
                                        </h2>
                                        <p className="text-dark-300">
                                            Nếu chưa nhận được sản phẩm sau 24 giờ, vui lòng liên hệ: <br />
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
