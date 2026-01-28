'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarLinks = [
    {
        title: 'Tổng quan',
        href: '/admin',
        icon: '📊',
    },
    {
        title: 'Sản phẩm',
        href: '/admin/san-pham',
        icon: '📦',
    },
    {
        title: 'Đơn hàng',
        href: '/admin/don-hang',
        icon: '🛒',
    },
    {
        title: 'Người dùng',
        href: '/admin/nguoi-dung',
        icon: '👥',
    },
    {
        title: 'License',
        href: '/admin/license',
        icon: '🔑',
    },
    {
        title: 'Cấu hình',
        href: '/admin/cau-hinh',
        icon: '⚙️',
    },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-dark-950">
            {/* Sidebar */}
            <aside className="w-64 bg-dark-900 border-r border-dark-800 fixed h-full">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-dark-800">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <span className="font-semibold text-dark-50">
                            Admin Panel
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href ||
                            (link.href !== '/admin' && pathname.startsWith(link.href));

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary-500/20 text-primary-400'
                                        : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800'
                                )}
                            >
                                <span>{link.icon}</span>
                                {link.title}
                            </Link>
                        );
                    })}
                </nav>

                {/* Back to main site */}
                <div className="absolute bottom-4 left-4 right-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 text-dark-500 hover:text-dark-300 text-sm"
                    >
                        ← Về trang chính
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                {/* Top bar */}
                <div className="h-16 bg-dark-900 border-b border-dark-800 flex items-center justify-between px-6 sticky top-0 z-10">
                    <h1 className="text-lg font-semibold text-dark-100">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-dark-400 text-sm">admin@anvitech.vn</span>
                        <Link
                            href="/api/auth/logout"
                            className="text-dark-500 hover:text-dark-300 text-sm"
                        >
                            Đăng xuất
                        </Link>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
