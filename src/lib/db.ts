// Database helper functions using Firestore
// This replaces the Prisma client with Firestore operations

import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    DocumentData,
    QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';

// Collection names
export const COLLECTIONS = {
    USERS: 'users',
    WEBAPPS: 'webapps',
    SOFTWARE: 'software',
    ORDERS: 'orders',
    ORDER_ITEMS: 'order_items',
    USER_WEBAPP_PERMISSIONS: 'user_webapp_permissions',
    LICENSES: 'licenses',
    PAYMENT_CONFIRMATIONS: 'payment_confirmations',
    ADMIN_LOGS: 'admin_logs',
    CONFIG: 'system_config',
} as const;

// Type definitions matching our schema
export interface User {
    id: string;
    email: string;
    passwordHash: string;
    status: 'ACTIVE' | 'BLOCKED';
    role: 'USER' | 'ADMIN';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Webapp {
    id: string;
    name: string;
    slug: string;
    subdomain: string;
    description: string;
    styleType: string;
    demoVideoUrl?: string;
    price: number;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Software {
    id: string;
    name: string;
    slug: string;
    softwareType: 'ONLINE' | 'OFFLINE';
    description: string;
    demoVideoUrl?: string;
    price: number;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Order {
    id: string;
    orderCode: string;
    userId: string;
    totalAmount: number;
    paymentMethod: 'BANK_TRANSFER';
    paymentStatus: 'PENDING' | 'PAID' | 'CONFIRMED' | 'CANCELLED';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface OrderItem {
    id: string;
    orderId: string;
    itemType: 'WEBAPP' | 'SOFTWARE';
    itemId: string;
    price: number;
    createdAt: Timestamp;
}

export interface UserWebappPermission {
    id: string;
    userId: string;
    webappId: string;
    orderId: string;
    status: 'ACTIVE' | 'REVOKED';
    grantedAt: Timestamp;
    expiredAt?: Timestamp;
}

export interface License {
    id: string;
    licenseKey: string;
    userId: string;
    softwareId: string;
    orderId: string;
    status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
    activatedAt?: Timestamp;
    expiredAt?: Timestamp;
    createdAt: Timestamp;
}

export interface PaymentConfirmation {
    id: string;
    orderId: string;
    adminId: string;
    confirmedAmount: number;
    confirmedAt: Timestamp;
    note?: string;
}

export interface AdminLog {
    id: string;
    adminId: string;
    action: string;
    targetType: string;
    targetId: string;
    createdAt: Timestamp;
}

// Helper functions
export async function getDocById<T extends DocumentData>(
    collectionName: string,
    docId: string
): Promise<T | null> {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as unknown as T;
    }
    return null;
}

export async function getDocByField<T extends DocumentData>(
    collectionName: string,
    fieldName: string,
    value: unknown
): Promise<T | null> {
    const q = query(collection(db, collectionName), where(fieldName, '==', value));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const docItem = querySnapshot.docs[0];
        return { id: docItem.id, ...docItem.data() } as unknown as T;
    }
    return null;
}

export async function getAllDocs<T extends DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[] = []
): Promise<T[]> {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docItem => ({ id: docItem.id, ...docItem.data() } as unknown as T));
}

export async function createDoc<T extends DocumentData>(
    collectionName: string,
    data: Omit<T, 'id'>
): Promise<string> {
    const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
    return docRef.id;
}

export async function updateDocById(
    collectionName: string,
    docId: string,
    data: Partial<DocumentData>
): Promise<void> {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
    });
}

export async function deleteDocById(
    collectionName: string,
    docId: string
): Promise<void> {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
}

// Export Firestore utilities
export { collection, doc, query, where, orderBy, limit, Timestamp };
export { db };
