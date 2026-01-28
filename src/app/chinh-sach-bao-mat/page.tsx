import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Chính sách bảo mật thông tin',
    description: 'Chính sách bảo mật thông tin cá nhân của Công ty TNHH AnVi Technology.',
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                <section className="section">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-8 text-center">
                                CHÍNH SÁCH BẢO MẬT THÔNG TIN
                            </h1>

                            <Card>
                                <CardContent className="prose prose-invert max-w-none space-y-8">
                                    {/* Section 1 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            1. Thông tin đơn vị thu thập và quản lý dữ liệu
                                        </h2>
                                        <ul className="text-dark-300 space-y-2">
                                            <li><strong className="text-dark-100">Tên đơn vị:</strong> Công ty TNHH AnVi Technology</li>
                                            <li><strong className="text-dark-100">Địa chỉ:</strong> [Địa chỉ trụ sở chính]</li>
                                            <li><strong className="text-dark-100">Email:</strong> contact@anvitech.vn</li>
                                            <li><strong className="text-dark-100">Điện thoại:</strong> [Số điện thoại liên hệ]</li>
                                        </ul>
                                    </section>

                                    {/* Section 2 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            2. Mục đích thu thập thông tin cá nhân
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Đăng ký và quản lý tài khoản người dùng</li>
                                            <li>Cấp quyền truy cập webapp và phần mềm</li>
                                            <li>Xử lý thanh toán và xác nhận đơn hàng</li>
                                            <li>Hỗ trợ khách hàng trong quá trình sử dụng dịch vụ</li>
                                            <li>Cải thiện chất lượng sản phẩm và dịch vụ</li>
                                        </ul>
                                    </section>

                                    {/* Section 3 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            3. Phạm vi thu thập thông tin
                                        </h2>
                                        <p className="text-dark-300 mb-2">Thông tin cá nhân cơ bản:</p>
                                        <ul className="text-dark-300 space-y-1 list-disc list-inside mb-4">
                                            <li>Email</li>
                                            <li>Họ và tên (nếu có)</li>
                                        </ul>
                                        <p className="text-dark-300 mb-2">Thông tin liên quan đến sử dụng dịch vụ:</p>
                                        <ul className="text-dark-300 space-y-1 list-disc list-inside">
                                            <li>Lịch sử truy cập</li>
                                            <li>Sản phẩm đã mua</li>
                                        </ul>
                                        <p className="text-dark-400 mt-4 text-sm italic">
                                            Website không thu thập thông tin nhạy cảm ngoài phạm vi cần thiết.
                                        </p>
                                    </section>

                                    {/* Section 4 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            4. Phạm vi sử dụng thông tin
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Chỉ sử dụng nội bộ trong hệ thống của AnVi Technology</li>
                                            <li>Không chia sẻ, mua bán hoặc trao đổi thông tin cá nhân cho bên thứ ba</li>
                                            <li>Chỉ cung cấp khi có yêu cầu từ cơ quan nhà nước có thẩm quyền</li>
                                        </ul>
                                    </section>

                                    {/* Section 5 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            5. Thời gian lưu trữ thông tin
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Thông tin cá nhân được lưu trữ trong suốt thời gian người dùng sử dụng dịch vụ</li>
                                            <li>Hoặc theo yêu cầu của pháp luật Việt Nam</li>
                                        </ul>
                                    </section>

                                    {/* Section 6 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            6. Những người hoặc tổ chức có thể tiếp cận thông tin
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Bộ phận quản lý hệ thống</li>
                                            <li>Bộ phận hỗ trợ khách hàng</li>
                                            <li>Cơ quan nhà nước có thẩm quyền (khi được yêu cầu hợp pháp)</li>
                                        </ul>
                                    </section>

                                    {/* Section 7 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            7. Quyền tiếp cận và chỉnh sửa dữ liệu
                                        </h2>
                                        <p className="text-dark-300">Người dùng có thể:</p>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside mt-2">
                                            <li>Đăng nhập tài khoản để xem và chỉnh sửa thông tin cá nhân</li>
                                            <li>Liên hệ qua email để yêu cầu chỉnh sửa hoặc xóa dữ liệu</li>
                                        </ul>
                                    </section>

                                    {/* Section 8 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            8. Cam kết bảo mật thông tin
                                        </h2>
                                        <ul className="text-dark-300 space-y-2 list-disc list-inside">
                                            <li>Áp dụng các biện pháp kỹ thuật và quản lý để bảo vệ dữ liệu</li>
                                            <li>Ngăn chặn truy cập trái phép, rò rỉ hoặc mất mát dữ liệu</li>
                                            <li>Bảo mật thông tin tài khoản người dùng</li>
                                        </ul>
                                    </section>

                                    {/* Section 9 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            9. Thay đổi chính sách bảo mật
                                        </h2>
                                        <p className="text-dark-300">
                                            AnVi Technology có quyền cập nhật chính sách bảo mật.
                                            Mọi thay đổi sẽ được công bố công khai trên website.
                                        </p>
                                    </section>

                                    {/* Section 10 */}
                                    <section>
                                        <h2 className="text-xl font-semibold text-dark-50 mb-4">
                                            10. Hiệu lực
                                        </h2>
                                        <p className="text-dark-300">
                                            Chính sách bảo mật có hiệu lực kể từ ngày được công bố trên website.
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
