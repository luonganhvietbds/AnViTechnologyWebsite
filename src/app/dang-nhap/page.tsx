'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button, Card, CardContent, Input } from '@/components/ui';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [needsVerification, setNeedsVerification] = useState(false);
    const [resendingEmail, setResendingEmail] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setNeedsVerification(false);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.requiresVerification) {
                    setNeedsVerification(true);
                }
                setError(data.error || 'Đăng nhập thất bại');
                return;
            }

            // Redirect based on role
            if (data.user?.role === 'ADMIN') {
                window.location.href = '/admin';
            } else {
                window.location.href = '/tai-khoan';
            }
        } catch {
            setError('Có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setLoading(false);
        }
    };

    const handleResendVerification = async () => {
        setResendingEmail(true);
        try {
            const res = await fetch('/api/auth/resend-verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message || 'Email xác thực đã được gửi lại!');
            } else {
                alert(data.error || 'Có lỗi xảy ra');
            }
        } catch {
            alert('Có lỗi xảy ra');
        } finally {
            setResendingEmail(false);
        }
    };

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20 flex items-center justify-center">
                <div className="container-custom py-12">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-dark-50 mb-2">
                                Đăng nhập
                            </h1>
                            <p className="text-dark-400">
                                Đăng nhập để truy cập các webapp và quản lý tài khoản
                            </p>
                        </div>

                        <Card variant="elevated">
                            <CardContent className="py-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="p-3 rounded-lg bg-accent-red/10 border border-accent-red/30 text-accent-red text-sm">
                                            {error}
                                            {needsVerification && (
                                                <button
                                                    type="button"
                                                    onClick={handleResendVerification}
                                                    disabled={resendingEmail}
                                                    className="block mt-2 underline hover:no-underline"
                                                >
                                                    {resendingEmail ? 'Đang gửi...' : 'Gửi lại email xác thực'}
                                                </button>
                                            )}
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

                                    <Input
                                        label="Mật khẩu"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 text-sm text-dark-400">
                                            <input type="checkbox" className="rounded border-dark-600" />
                                            Ghi nhớ đăng nhập
                                        </label>
                                        <Link href="/quen-mat-khau" className="text-sm text-primary-400 hover:text-primary-300">
                                            Quên mật khẩu?
                                        </Link>
                                    </div>

                                    <Button type="submit" variant="primary" className="w-full" loading={loading}>
                                        Đăng nhập
                                    </Button>
                                </form>

                                <div className="mt-6 pt-6 border-t border-dark-700 text-center">
                                    <p className="text-dark-400 text-sm">
                                        Chưa có tài khoản?{' '}
                                        <Link href="/dang-ky" className="text-primary-400 hover:text-primary-300 font-medium">
                                            Đăng ký ngay
                                        </Link>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
