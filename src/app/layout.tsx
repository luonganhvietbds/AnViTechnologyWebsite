import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
    subsets: ['latin', 'vietnamese'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: {
        default: 'AnVi Technology - WebApp Viết Kịch Bản YouTube & Tự Động Hóa Nội Dung',
        template: '%s | AnVi Technology',
    },
    description: 'Cung cấp các webapp viết kịch bản YouTube theo nhiều phong cách nội dung khác nhau và các phần mềm phụ trợ giúp tự động hóa quy trình sản xuất video.',
    keywords: [
        'webapp viết kịch bản',
        'kịch bản youtube',
        'tự động hóa nội dung',
        'cổ tích ngược',
        'storytelling',
        'làm video youtube',
        'AnVi Technology',
    ],
    authors: [{ name: 'AnVi Technology' }],
    creator: 'AnVi Technology',
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: 'website',
        locale: 'vi_VN',
        url: 'https://anvitech.vn',
        siteName: 'AnVi Technology',
        title: 'AnVi Technology - WebApp Viết Kịch Bản YouTube',
        description: 'Cung cấp các webapp viết kịch bản YouTube và phần mềm phụ trợ tự động hóa nội dung.',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi" className="dark">
            <body className={`${inter.variable} font-sans bg-dark-900 text-dark-50 antialiased`}>
                {children}
            </body>
        </html>
    );
}
