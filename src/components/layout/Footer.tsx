import React from 'react';
import Link from 'next/link';

const footerLinks = {
    products: [
        { name: 'WebApp viết kịch bản', href: '/webapp-viet-kich-ban' },
        { name: 'Phần mềm phụ trợ', href: '/phan-mem-phu-tro' },
        { name: 'Hướng dẫn mua hàng', href: '/huong-dan-mua-hang' },
    ],
    legal: [
        { name: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat' },
        { name: 'Chính sách thanh toán', href: '/chinh-sach-thanh-toan' },
        { name: 'Chính sách giao nhận', href: '/chinh-sach-giao-nhan' },
        { name: 'Chính sách hoàn tiền', href: '/chinh-sach-hoan-tien' },
    ],
    company: [
        { name: 'Giới thiệu', href: '/gioi-thieu' },
        { name: 'Liên hệ', href: '/lien-he' },
    ],
};

// Thông tin doanh nghiệp - Bắt buộc theo quy định Bộ Công Thương
const companyInfo = {
    name: 'Công ty TNHH AnVi Technology',
    taxCode: 'XXXXXXXXXX', // Mã số thuế
    registrationDate: 'DD/MM/YYYY', // Ngày cấp
    registrationPlace: 'Sở Kế hoạch và Đầu tư TP. XXX', // Nơi cấp
    address: 'Địa chỉ trụ sở chính', // Địa chỉ
    email: 'contact@anvitech.vn',
    phone: '0XXX XXX XXX',
};

export function Footer() {
    return (
        <footer className="bg-dark-950 border-t border-dark-800">
            {/* Main Footer */}
            <div className="container-custom py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">A</span>
                            </div>
                            <span className="text-dark-50 font-semibold text-lg">
                                AnVi Technology
                            </span>
                        </div>
                        <p className="text-dark-400 text-sm leading-relaxed">
                            Cung cấp các webapp viết kịch bản YouTube và phần mềm phụ trợ
                            hỗ trợ tự động hóa quy trình sản xuất nội dung.
                        </p>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-dark-100 font-semibold mb-4">Sản phẩm</h4>
                        <ul className="space-y-3">
                            {footerLinks.products.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-dark-100 font-semibold mb-4">Chính sách</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-dark-100 font-semibold mb-4">Công ty</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-400 hover:text-primary-400 text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Legal Info - Bắt buộc */}
            <div className="border-t border-dark-800">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="text-dark-500 text-xs space-y-1">
                            <p className="font-medium text-dark-400">{companyInfo.name}</p>
                            <p>MST/ĐKKD: {companyInfo.taxCode} - Cấp ngày: {companyInfo.registrationDate}</p>
                            <p>Nơi cấp: {companyInfo.registrationPlace}</p>
                            <p>Địa chỉ: {companyInfo.address}</p>
                            <p>
                                Email: <a href={`mailto:${companyInfo.email}`} className="hover:text-primary-400">{companyInfo.email}</a>
                                {' | '}
                                SĐT: <a href={`tel:${companyInfo.phone}`} className="hover:text-primary-400">{companyInfo.phone}</a>
                            </p>
                        </div>
                        <div className="text-dark-500 text-xs">
                            <p>© {new Date().getFullYear()} AnVi Technology. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
