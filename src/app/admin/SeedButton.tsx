'use client';

import { useState } from 'react';
import { Button, Card, CardContent } from '@/components/ui';

export default function SeedDatabase() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSeed = async () => {
        if (!confirm('Bạn có chắc chắn muốn nạp dữ liệu mẫu? (Sẽ không ghi đè dữ liệu cũ)')) return;

        setLoading(true);
        try {
            const res = await fetch('/api/admin/seed', { method: 'POST' });
            const data = await res.json();
            setResult(data);
        } catch (error) {
            alert('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="mt-8 border-dashed border-dark-600 bg-transparent">
            <CardContent className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-dark-100">Khởi tạo dữ liệu mẫu</h3>
                    <p className="text-dark-400 text-sm">
                        Nạp dữ liệu WebApp, Phần mềm và Cấu hình mặc định (chỉ chạy khi database trống)
                    </p>
                </div>
                <Button onClick={handleSeed} loading={loading} variant="secondary">
                    Nạp dữ liệu
                </Button>
            </CardContent>
            {result && (
                <div className="px-6 pb-6 text-sm">
                    <pre className="bg-dark-950 p-4 rounded-lg overflow-auto">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </Card>
    );
}
