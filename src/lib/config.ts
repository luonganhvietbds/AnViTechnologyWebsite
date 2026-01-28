// System configuration types
import { Timestamp } from 'firebase/firestore';

export interface SystemConfig {
    id: string;
    key: string;
    value: string;
    label: string;
    description?: string;
    category: 'business' | 'payment' | 'webapp' | 'display' | 'email';
    updatedAt: Timestamp;
}

// Default configuration keys
export const CONFIG_KEYS = {
    // Business Info
    COMPANY_NAME: 'company_name',
    COMPANY_ADDRESS: 'company_address',
    COMPANY_PHONE: 'company_phone',
    COMPANY_EMAIL: 'company_email',
    BUSINESS_LICENSE: 'business_license',

    // Payment
    BANK_NAME: 'bank_name',
    BANK_ACCOUNT: 'bank_account',
    BANK_HOLDER: 'bank_holder',

    // WebApp
    DEFAULT_WEBAPP_PRICE: 'default_webapp_price',
    TRIAL_DAYS: 'trial_days',

    // Display
    SITE_TITLE: 'site_title',
    SITE_DESCRIPTION: 'site_description',
    MAINTENANCE_MODE: 'maintenance_mode',

    // Email
    SMTP_HOST: 'smtp_host',
    SMTP_PORT: 'smtp_port',
    SMTP_USER: 'smtp_user',
    SMTP_PASS: 'smtp_pass',
    EMAIL_FROM: 'email_from',
} as const;

// Default values
export const DEFAULT_CONFIG: Record<string, { value: string; label: string; description: string; category: SystemConfig['category'] }> = {
    [CONFIG_KEYS.COMPANY_NAME]: {
        value: 'Công ty TNHH AnVi Technology',
        label: 'Tên công ty',
        description: 'Tên doanh nghiệp hiển thị trên website',
        category: 'business',
    },
    [CONFIG_KEYS.COMPANY_ADDRESS]: {
        value: '',
        label: 'Địa chỉ',
        description: 'Địa chỉ trụ sở chính',
        category: 'business',
    },
    [CONFIG_KEYS.COMPANY_PHONE]: {
        value: '',
        label: 'Số điện thoại',
        description: 'Số điện thoại liên hệ',
        category: 'business',
    },
    [CONFIG_KEYS.COMPANY_EMAIL]: {
        value: 'contact@anvitech.vn',
        label: 'Email',
        description: 'Email liên hệ chính',
        category: 'business',
    },
    [CONFIG_KEYS.BUSINESS_LICENSE]: {
        value: '',
        label: 'Số ĐKKD',
        description: 'Số đăng ký kinh doanh',
        category: 'business',
    },
    [CONFIG_KEYS.BANK_NAME]: {
        value: 'MB Bank',
        label: 'Ngân hàng',
        description: 'Tên ngân hàng nhận thanh toán',
        category: 'payment',
    },
    [CONFIG_KEYS.BANK_ACCOUNT]: {
        value: '19928668868686',
        label: 'Số tài khoản',
        description: 'Số tài khoản nhận thanh toán',
        category: 'payment',
    },
    [CONFIG_KEYS.BANK_HOLDER]: {
        value: 'Lương Anh Việt',
        label: 'Chủ tài khoản',
        description: 'Tên chủ tài khoản ngân hàng',
        category: 'payment',
    },
    [CONFIG_KEYS.DEFAULT_WEBAPP_PRICE]: {
        value: '299000',
        label: 'Giá WebApp mặc định',
        description: 'Giá mặc định cho WebApp mới (VNĐ)',
        category: 'webapp',
    },
    [CONFIG_KEYS.TRIAL_DAYS]: {
        value: '0',
        label: 'Số ngày dùng thử',
        description: 'Số ngày dùng thử miễn phí (0 = không có)',
        category: 'webapp',
    },
    [CONFIG_KEYS.SITE_TITLE]: {
        value: 'AnVi Technology',
        label: 'Tiêu đề website',
        description: 'Tiêu đề hiển thị trên tab trình duyệt',
        category: 'display',
    },
    [CONFIG_KEYS.SITE_DESCRIPTION]: {
        value: 'WebApp viết kịch bản YouTube tự động',
        label: 'Mô tả website',
        description: 'Mô tả SEO cho website',
        category: 'display',
    },
    [CONFIG_KEYS.MAINTENANCE_MODE]: {
        value: 'false',
        label: 'Chế độ bảo trì',
        description: 'Bật/tắt chế độ bảo trì website',
        category: 'display',
    },
};
