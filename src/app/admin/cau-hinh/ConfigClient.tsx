'use client';

import { ConfigSection } from './ConfigSection';

interface ConfigClientProps {
    businessConfig: Record<string, string>;
    paymentConfig: Record<string, string>;
    webappConfig: Record<string, string>;
    displayConfig: Record<string, string>;
}

export default function ConfigClient({
    businessConfig,
    paymentConfig,
    webappConfig,
    displayConfig,
}: ConfigClientProps) {

    const saveConfig = async (category: string, data: Record<string, string>) => {
        const res = await fetch('/api/admin/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, data }),
        });
        if (!res.ok) throw new Error('Save failed');
    };

    return (
        <div className="max-w-3xl">
            {/* Business Config */}
            <ConfigSection
                title="Thông tin doanh nghiệp"
                description="Thông tin này hiển thị ở footer và trang giới thiệu"
                fields={[
                    { key: 'company_name', label: 'Tên công ty', value: businessConfig.company_name || 'Công ty TNHH AnVi Technology' },
                    { key: 'company_address', label: 'Địa chỉ trụ sở', value: businessConfig.company_address || '' },
                    { key: 'company_email', label: 'Email liên hệ', value: businessConfig.company_email || 'contact@anvitech.vn', type: 'email' },
                    { key: 'company_phone', label: 'Số điện thoại', value: businessConfig.company_phone || '', type: 'tel' },
                    { key: 'business_license', label: 'Số ĐKKD', value: businessConfig.business_license || '', description: 'Số đăng ký kinh doanh' },
                ]}
                onSave={(data) => saveConfig('business', data)}
            />

            {/* Payment Config */}
            <ConfigSection
                title="Cấu hình thanh toán"
                description="Thông tin tài khoản nhận thanh toán QR Banking"
                fields={[
                    { key: 'bank_name', label: 'Ngân hàng', value: paymentConfig.bank_name || 'MB Bank' },
                    { key: 'bank_account', label: 'Số tài khoản', value: paymentConfig.bank_account || '19928668868686' },
                    { key: 'bank_holder', label: 'Chủ tài khoản', value: paymentConfig.bank_holder || 'Lương Anh Việt' },
                ]}
                onSave={(data) => saveConfig('payment', data)}
            />

            {/* WebApp Config */}
            <ConfigSection
                title="Cấu hình WebApp"
                description="Thiết lập mặc định cho WebApp"
                fields={[
                    { key: 'default_webapp_price', label: 'Giá mặc định (VNĐ)', value: webappConfig.default_webapp_price || '299000', type: 'number' },
                    { key: 'trial_days', label: 'Số ngày dùng thử', value: webappConfig.trial_days || '0', type: 'number', description: '0 = không có dùng thử' },
                ]}
                onSave={(data) => saveConfig('webapp', data)}
            />

            {/* Display Config */}
            <ConfigSection
                title="Cấu hình hiển thị"
                description="Thiết lập hiển thị website"
                fields={[
                    { key: 'site_title', label: 'Tiêu đề website', value: displayConfig.site_title || 'AnVi Technology' },
                    { key: 'site_description', label: 'Mô tả SEO', value: displayConfig.site_description || 'WebApp viết kịch bản YouTube tự động' },
                    { key: 'maintenance_mode', label: 'Chế độ bảo trì', value: displayConfig.maintenance_mode || 'false', type: 'toggle', description: 'Bật để tạm ngưng website cho khách' },
                ]}
                onSave={(data) => saveConfig('display', data)}
            />
        </div>
    );
}
