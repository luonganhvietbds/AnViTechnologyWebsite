import { NextRequest, NextResponse } from 'next/server';
import {
    signInWithEmailAndPassword,
    sendEmailVerification,
    AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email và mật khẩu là bắt buộc' },
                { status: 400 }
            );
        }

        // Sign in to get user (need password to resend verification)
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        if (firebaseUser.emailVerified) {
            return NextResponse.json(
                { message: 'Email đã được xác thực rồi. Bạn có thể đăng nhập.' },
            );
        }

        // Resend verification email
        await sendEmailVerification(firebaseUser);

        return NextResponse.json({
            message: 'Email xác thực đã được gửi lại. Vui lòng kiểm tra hộp thư.',
        });

    } catch (error) {
        console.error('Resend verification error:', error);

        const authError = error as AuthError;
        if (authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password' || authError.code === 'auth/invalid-credential') {
            return NextResponse.json(
                { error: 'Email hoặc mật khẩu không đúng' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: 'Có lỗi xảy ra, vui lòng thử lại' },
            { status: 500 }
        );
    }
}
