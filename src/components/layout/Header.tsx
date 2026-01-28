'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

const navigation = [
    { name: 'Trang chủ', href: '/' },
    { name: 'WebApp viết kịch bản', href: '/webapp-viet-kich-ban' },
    { name: 'Phần mềm phụ trợ', href: '/phan-mem-phu-tro' },
    { name: 'Hướng dẫn mua hàng', href: '/huong-dan-mua-hang' },
    { name: 'Liên hệ', href: '/lien-he' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-dark-900/95 backdrop-blur-lg border-b border-dark-800'
                    : 'bg-transparent'
            )}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <span className="text-dark-50 font-semibold text-lg hidden sm:block">
                            AnVi Technology
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 text-sm text-dark-300 hover:text-dark-50 hover:bg-dark-800 rounded-lg transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link href="/dang-nhap">
                            <Button variant="ghost" size="sm">
                                Đăng nhập
                            </Button>
                        </Link>
                        <Link href="/dang-ky">
                            <Button variant="primary" size="sm">
                                Đăng ký
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-dark-300 hover:text-dark-50"
                        aria-label="Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-dark-800">
                        <nav className="flex flex-col gap-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="px-4 py-3 text-dark-300 hover:text-dark-50 hover:bg-dark-800 rounded-lg transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-dark-800">
                                <Link href="/dang-nhap" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full">
                                        Đăng nhập
                                    </Button>
                                </Link>
                                <Link href="/dang-ky" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="primary" className="w-full">
                                        Đăng ký
                                    </Button>
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
