import { NextRequest, NextResponse } from 'next/server';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createToken, setAuthCookie } from '@/lib/auth';
import { COLLECTIONS, createDoc, getDocByField, User } from '@/lib/db';

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

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Mật khẩu phải có ít nhất 6 ký tự' },
                { status: 400 }
            );
        }

        // Check if user already exists in Firestore
        const existingUser = await getDocByField<User>(COLLECTIONS.USERS, 'email', email);
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email đã được sử dụng' },
                { status: 400 }
            );
        }

        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Send email verification
        await sendEmailVerification(firebaseUser);

        // Also create user record in Firestore for our app data
        const userId = await createDoc(COLLECTIONS.USERS, {
            email,
            firebaseUid: firebaseUser.uid,
            passwordHash: '', // Not needed with Firebase Auth
            status: 'ACTIVE',
            role: 'USER',
            emailVerified: false,
        });

        // Create token and set cookie
        const token = createToken({
            userId,
            email,
            role: 'USER',
        });

        const response = NextResponse.json(
            {
                message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.',
                user: {
                    id: userId,
                    email,
                    role: 'USER',
                    emailVerified: false,
                },
                requiresVerification: true,
            },
            { status: 201 }
        );

        response.headers.set('Set-Cookie', setAuthCookie(token));

        return response;
    } catch (error) {
        console.error('Register error:', error);

        // Handle Firebase Auth errors
        const authError = error as AuthError;
        if (authError.code === 'auth/email-already-in-use') {
            return NextResponse.json(
                { error: 'Email đã được sử dụng' },
                { status: 400 }
            );
        }
        if (authError.code === 'auth/invalid-email') {
            return NextResponse.json(
                { error: 'Email không hợp lệ' },
                { status: 400 }
            );
        }
        if (authError.code === 'auth/weak-password') {
            return NextResponse.json(
                { error: 'Mật khẩu quá yếu' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Có lỗi xảy ra, vui lòng thử lại' },
            { status: 500 }
        );
    }
}
