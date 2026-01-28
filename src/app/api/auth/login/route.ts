import { NextRequest, NextResponse } from 'next/server';
import {
    signInWithEmailAndPassword,
    AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createToken, setAuthCookie } from '@/lib/auth';
import { COLLECTIONS, getDocByField, User, updateDocById } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email và mật khẩu là bắt buộc' },
                { status: 400 }
            );
        }

        // HARDCODED ADMIN (Temporary) - Keep for initial setup
        if (email === 'admin@anvitech.vn' && password === 'Admin123@') {
            const token = createToken({
                userId: 'hardcoded-admin-id',
                email: 'admin@anvitech.vn',
                role: 'ADMIN',
            });

            const response = NextResponse.json({
                message: 'Đăng nhập thành công (Admin)',
                user: {
                    id: 'hardcoded-admin-id',
                    email: 'admin@anvitech.vn',
                    role: 'ADMIN',
                    emailVerified: true,
                },
            });

            response.headers.set('Set-Cookie', setAuthCookie(token));
            return response;
        }

        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Check email verification
        if (!firebaseUser.emailVerified) {
            return NextResponse.json(
                {
                    error: 'Email chưa được xác thực. Vui lòng kiểm tra hộp thư của bạn.',
                    requiresVerification: true,
                },
                { status: 403 }
            );
        }

        // Get user from Firestore
        let user = await getDocByField<User>(COLLECTIONS.USERS, 'email', email);

        if (!user) {
            return NextResponse.json(
                { error: 'Tài khoản không tồn tại' },
                { status: 401 }
            );
        }

        // Update emailVerified status in Firestore if needed
        if (!user.emailVerified) {
            await updateDocById(COLLECTIONS.USERS, user.id, { emailVerified: true });
        }

        // Check if user is blocked
        if (user.status === 'BLOCKED') {
            return NextResponse.json(
                { error: 'Tài khoản đã bị khóa. Vui lòng liên hệ hỗ trợ.' },
                { status: 403 }
            );
        }

        // Create token and set cookie
        const token = createToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        const response = NextResponse.json({
            message: 'Đăng nhập thành công',
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                emailVerified: true,
            },
        });

        response.headers.set('Set-Cookie', setAuthCookie(token));

        return response;
    } catch (error) {
        console.error('Login error:', error);

        // Handle Firebase Auth errors
        const authError = error as AuthError;
        if (authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password' || authError.code === 'auth/invalid-credential') {
            return NextResponse.json(
                { error: 'Email hoặc mật khẩu không đúng' },
                { status: 401 }
            );
        }
        if (authError.code === 'auth/too-many-requests') {
            return NextResponse.json(
                { error: 'Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau.' },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: 'Có lỗi xảy ra, vui lòng thử lại' },
            { status: 500 }
        );
    }
}
