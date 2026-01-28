'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Badge } from '@/components/ui';

interface ConfirmButtonProps {
    orderId: string;
    currentStatus: string;
}

export function ConfirmOrderButton({ orderId, currentStatus }: ConfirmButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    if (currentStatus !== 'PENDING') {
        if (currentStatus === 'CONFIRMED') {
            return <span className="text-accent-green text-sm">✓ Đã xử lý</span>;
        }
        return <Badge variant="default">{currentStatus}</Badge>;
    }

    const handleConfirm = async () => {
        if (!confirm('Xác nhận thanh toán cho đơn hàng này?')) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/admin/orders/${orderId}/confirm`, {
                method: 'POST',
            });

            if (res.ok) {
                router.refresh();
            } else {
                const data = await res.json();
                alert(data.error || 'Có lỗi xảy ra');
            }
        } catch {
            alert('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="accent"
            size="sm"
            onClick={handleConfirm}
            loading={loading}
        >
            Xác nhận
        </Button>
    );
}
