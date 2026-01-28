import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Điều khoản sử dụng',
    description: 'Điều khoản sử dụng dịch vụ tại AnVi Technology.',
};

export default function TermsOfUsePage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                <section className="section">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-8">
                                Điều khoản sử dụng
                            </h1>

                            <Card>
                                <CardContent className="prose prose-invert max-w-none">
                                    <p className="text-dark-300 mb-6">
                                        <strong>Ngày cập nhật:</strong> 01/01/2025
                                    </p>

                                    <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">
                                        1. Chấp nhận điều khoản
                                    </h2>
                                    <p className="text-dark-400 mb-4">
                                        Bằng việc truy cập và sử dụng dịch vụ của AnVi Technology, bạn đồng ý
                                        tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này.
                                    </p>

                                    <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">
                                        2. Mô tả dịch vụ
                                    </h2>
                                    <p className="text-dark-400 mb-4">
                                        AnVi Technology cung cấp các webapp viết kịch bản YouTube và phần mềm
                                        phụ trợ cho việc sáng tạo nội dung video. Dịch vụ bao gồm:
                                    </p>
                                    <ul className="list-disc pl-6 text-dark-400 space-y-2 mb-4">
                                        <li>WebApp viết kịch bản với nhiều phong cách khác nhau</li>
                                        <li>Phần mềm hỗ trợ (online và offline)</li>
                                        <li>Quyền truy cập theo tài khoản</li>
                                    </ul>

                                    <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">
                                        3. Tài khoản người dùng
                                    </h2>
                                    <p className="text-dark-400 mb-4">
                                        Bạn có trách nhiệm bảo mật thông tin tài khoản của mình. Mỗi tài khoản
                                        chỉ được sử dụng bởi một người dùng duy nhất và không được chuyển nhượng.
                                    </p>

                                    <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">
                                        4. Quyền sở hữu trí tuệ
                                    </h2>
                                    <p className="text-dark-400 mb-4">
                                        Tất cả nội dung, thiết kế, mã nguồn của website và webapp thuộc quyền
                                        sở hữu của AnVi Technology. Bạn không được sao chép, phân phối hoặc
                                        sử dụng cho mục đích thương mại mà không có sự cho phép.
                                    </p>

                                    <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">
                                        5. Quy định sử dụng
                                    </h2>
                                    <p className="text-dark-400 mb-4">Người dùng cam kết:</p>
                                    <ul className="list-disc pl-6 text-dark-400 space-y-2 mb-4">
                                        <li>Không chia sẻ tài khoản cho người khác</li>
                                        <li>Không sử dụng dịch vụ cho mục đích bất hợp pháp</li>
                                        <li>Không cố gắng truy cập trái phép vào hệ thống</li>
                                        <li>Không tạo nội dung vi phạm pháp luật</li>
                                    </ul>

                                    <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">
                                        6. Thanh toán và hoàn tiền
                                    </h2>
                                    <p className="text-dark-400 mb-4">
                                        Việc thanh toán và hoàn tiền tuân theo{' '}
                                        <a href="/chinh-sach-thanh-toan" className="text-primary-400 hover:text-primary-300">
                                            Chính sách thanh toán
                                        </a>{' '}
                                        và{' '}
                                        <a href="/chinh-sach-hoan-tien" className="text-primary-400 hover:text-primary-300">
                                            Chính sách hoàn tiền
                                        </a>{' '}
                                        riêng.
                                    </p>

                                    <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">
                                        7. Giới hạn trách nhiệm
                                    </h2>
                                    <p className="text-dark-400 mb-4">
                                        AnVi Technology không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh
                                        từ việc sử dụng hoặc không thể sử dụng dịch vụ, bao gồm nhưng không giới hạn:
                                        mất dữ liệu, gián đoạn kinh doanh hoặc thiệt hại về lợi nhuận.
                                    </p>

                                    <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">
                                        8. Thay đổi điều khoản
                                    </h2>
                                    <p className="text-dark-400 mb-4">
                                        Chúng tôi có quyền cập nhật điều khoản này bất cứ lúc nào. Các thay đổi
                                        sẽ có hiệu lực ngay khi được đăng tải trên website.
                                    </p>

                                    <h2 className="text-xl font-semibold text-dark-100 mt-8 mb-4">
                                        9. Liên hệ
                                    </h2>
                                    <p className="text-dark-400">
                                        Nếu có thắc mắc về điều khoản sử dụng, vui lòng liên hệ:<br />
                                        📧 Email: <strong>admin@anvitech.vn</strong>
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
