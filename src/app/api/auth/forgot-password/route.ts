import { NextRequest, NextResponse } from 'next/server';
import {
    sendPasswordResetEmail,
    AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email là bắt buộc' },
                { status: 400 }
            );
        }

        // Send password reset email via Firebase
        await sendPasswordResetEmail(auth, email);

        return NextResponse.json({
            message: 'Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.',
        });

    } catch (error) {
        console.error('Password reset error:', error);

        const authError = error as AuthError;
        if (authError.code === 'auth/user-not-found') {
            // For security, don't reveal if email exists
            return NextResponse.json({
                message: 'Nếu email tồn tại trong hệ thống, bạn sẽ nhận được email đặt lại mật khẩu.',
            });
        }

        return NextResponse.json(
            { error: 'Có lỗi xảy ra, vui lòng thử lại' },
            { status: 500 }
        );
    }
}
