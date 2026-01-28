import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { COLLECTIONS, getAllDocs } from '@/lib/db';
import { SystemConfig } from '@/lib/config';
import ConfigClient from './ConfigClient';

export const metadata = {
    title: 'Cấu hình hệ thống | Admin',
};

export default async function AdminConfigPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        redirect('/dang-nhap');
    }

    // Get all config from Firestore
    const configs = await getAllDocs<SystemConfig>(COLLECTIONS.CONFIG);

    // Group configs by category
    const configByCategory = configs.reduce((acc, config) => {
        if (!acc[config.category]) acc[config.category] = {};
        acc[config.category][config.key] = config.value;
        return acc;
    }, {} as Record<string, Record<string, string>>);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-dark-50">
                    Cấu hình hệ thống
                </h1>
                <p className="text-dark-400 mt-1">
                    Quản lý các thiết lập chung của website
                </p>
            </div>

            <ConfigClient
                businessConfig={configByCategory.business || {}}
                paymentConfig={configByCategory.payment || {}}
                webappConfig={configByCategory.webapp || {}}
                displayConfig={configByCategory.display || {}}
            />
        </div>
    );
}
