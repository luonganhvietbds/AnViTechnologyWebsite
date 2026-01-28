'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button, Card, CardContent, Input } from '@/components/ui';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just show confirmation message
        // Email service will be implemented later
        setSubmitted(true);
    };

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20 flex items-center justify-center">
                <div className="container-custom py-12">
                    <div className="max-w-md mx-auto">
                        {!submitted ? (
                            <>
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-dark-50 mb-2">
                                        Quên mật khẩu
                                    </h1>
                                    <p className="text-dark-400">
                                        Nhập email của bạn, chúng tôi sẽ hỗ trợ đặt lại mật khẩu
                                    </p>
                                </div>

                                <Card variant="elevated">
                                    <CardContent className="py-8">
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <Input
                                                label="Email"
                                                type="email"
                                                placeholder="email@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />

                                            <Button type="submit" variant="primary" className="w-full">
                                                Gửi yêu cầu
                                            </Button>
                                        </form>

                                        <div className="mt-6 pt-6 border-t border-dark-700 text-center">
                                            <Link href="/dang-nhap" className="text-primary-400 hover:text-primary-300 text-sm">
                                                ← Quay lại đăng nhập
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-dark-50 mb-4">
                                    Yêu cầu đã được gửi!
                                </h2>
                                <p className="text-dark-400 mb-2">
                                    Vui lòng liên hệ Admin qua email hoặc Zalo để được hỗ trợ đặt lại mật khẩu.
                                </p>
                                <p className="text-dark-300 mb-6">
                                    📧 <strong>admin@anvitech.vn</strong>
                                </p>
                                <Link href="/dang-nhap">
                                    <Button variant="secondary">
                                        Quay lại đăng nhập
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
