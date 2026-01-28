'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button, Card, CardContent, Input } from '@/components/ui';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Có lỗi xảy ra');
                return;
            }

            setSubmitted(true);
        } catch {
            setError('Có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setLoading(false);
        }
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
                                        Nhập email của bạn để nhận link đặt lại mật khẩu
                                    </p>
                                </div>

                                <Card variant="elevated">
                                    <CardContent className="py-8">
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {error && (
                                                <div className="p-3 rounded-lg bg-accent-red/10 border border-accent-red/30 text-accent-red text-sm">
                                                    {error}
                                                </div>
                                            )}

                                            <Input
                                                label="Email"
                                                type="email"
                                                placeholder="email@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />

                                            <Button type="submit" variant="primary" className="w-full" loading={loading}>
                                                Gửi email đặt lại mật khẩu
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
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-green/20 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-dark-50 mb-4">
                                    Email đã được g���i!
                                </h2>
                                <p className="text-dark-400 mb-6">
                                    Vui lòng kiểm tra hộp thư của bạn và nhấn vào link để đặt lại mật khẩu.
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
