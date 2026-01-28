'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button, Card, CardContent, Input } from '@/components/ui';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Đăng ký thất bại');
                return;
            }

            setSuccess(true);
        } catch {
            setError('Có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <>
                <Header />
                <main className="min-h-screen pt-20 flex items-center justify-center">
                    <div className="container-custom py-12">
                        <div className="max-w-md mx-auto text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-green/20 flex items-center justify-center">
                                <svg className="w-10 h-10 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-dark-50 mb-4">
                                Đăng ký thành công!
                            </h1>
                            <p className="text-dark-400 mb-6">
                                Tài khoản của bạn đã được tạo. Bạn có thể đăng nhập ngay bây giờ.
                            </p>
                            <Link href="/dang-nhap">
                                <Button variant="primary">
                                    Đăng nhập ngay
                                </Button>
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20 flex items-center justify-center">
                <div className="container-custom py-12">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-dark-50 mb-2">
                                Đăng ký tài khoản
                            </h1>
                            <p className="text-dark-400">
                                Tạo tài khoản để mua và sử dụng các webapp viết kịch bản
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

                                    <Input
                                        label="Mật khẩu"
                                        type="password"
                                        placeholder="Ít nhất 6 ký tự"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        hint="Mật khẩu phải có ít nhất 6 ký tự"
                                        required
                                    />

                                    <Input
                                        label="Xác nhận mật khẩu"
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />

                                    <div className="text-sm text-dark-400">
                                        <label className="flex items-start gap-2">
                                            <input type="checkbox" className="mt-1 rounded border-dark-600" required />
                                            <span>
                                                Tôi đồng ý với{' '}
                                                <Link href="/chinh-sach-bao-mat" className="text-primary-400 hover:text-primary-300">
                                                    Chính sách bảo mật
                                                </Link>
                                                {' '}và{' '}
                                                <Link href="/dieu-khoan-su-dung" className="text-primary-400 hover:text-primary-300">
                                                    Điều khoản sử dụng
                                                </Link>
                                            </span>
                                        </label>
                                    </div>

                                    <Button type="submit" variant="primary" className="w-full" loading={loading}>
                                        Đăng ký
                                    </Button>
                                </form>

                                <div className="mt-6 pt-6 border-t border-dark-700 text-center">
                                    <p className="text-dark-400 text-sm">
                                        Đã có tài khoản?{' '}
                                        <Link href="/dang-nhap" className="text-primary-400 hover:text-primary-300 font-medium">
                                            Đăng nhập
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
