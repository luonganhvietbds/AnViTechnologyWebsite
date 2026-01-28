import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createToken, setAuthCookie } from '@/lib/auth';
import {
    COLLECTIONS,
    getDocByField,
    createDoc,
    User
} from '@/lib/db';

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

        // Check if user already exists
        const existingUser = await getDocByField<User>(COLLECTIONS.USERS, 'email', email);

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email đã được sử dụng' },
                { status: 400 }
            );
        }

        // Hash password and create user
        const passwordHash = await hashPassword(password);
        const userId = await createDoc(COLLECTIONS.USERS, {
            email,
            passwordHash,
            status: 'ACTIVE',
            role: 'USER',
        });

        // Create token and set cookie
        const token = createToken({
            userId,
            email,
            role: 'USER',
        });

        const response = NextResponse.json(
            {
                message: 'Đăng ký thành công',
                user: {
                    id: userId,
                    email,
                    role: 'USER',
                },
            },
            { status: 201 }
        );

        response.headers.set('Set-Cookie', setAuthCookie(token));

        return response;
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json(
            { error: 'Có lỗi xảy ra, vui lòng thử lại' },
            { status: 500 }
        );
    }
}
