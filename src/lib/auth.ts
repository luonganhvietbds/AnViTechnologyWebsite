import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'anvi-tech-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';
const COOKIE_NAME = 'auth_token';

export interface JWTPayload {
    userId: string;
    email: string;
    role: 'USER' | 'ADMIN';
    iat?: number;
    exp?: number;
}

/**
 * Hash password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

/**
 * Create JWT token
 */
export function createToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
        return null;
    }
}

/**
 * Get token from cookies (server-side)
 */
export async function getTokenFromCookies(): Promise<string | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME);
    return cookie?.value || null;
}

/**
 * Get current user from cookies (server-side)
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
    const token = await getTokenFromCookies();
    if (!token) return null;
    return verifyToken(token);
}

/**
 * Create auth cookie options
 * Domain set to .anvitech.vn for SSO across subdomains
 */
export function getAuthCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        name: COOKIE_NAME,
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax' as const,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        // In production, set domain for SSO
        ...(isProduction && { domain: '.anvitech.vn' }),
    };
}

/**
 * Set auth cookie (for API routes)
 */
export function setAuthCookie(token: string): string {
    const options = getAuthCookieOptions();
    const cookieParts = [
        `${options.name}=${token}`,
        `Path=${options.path}`,
        `Max-Age=${options.maxAge}`,
        options.httpOnly && 'HttpOnly',
        options.secure && 'Secure',
        `SameSite=${options.sameSite}`,
        options.domain && `Domain=${options.domain}`,
    ].filter(Boolean);

    return cookieParts.join('; ');
}

/**
 * Clear auth cookie
 */
export function clearAuthCookie(): string {
    const options = getAuthCookieOptions();
    return `${options.name}=; Path=${options.path}; Max-Age=0; HttpOnly${options.domain ? `; Domain=${options.domain}` : ''}`;
}
