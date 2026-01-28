'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, Input } from '@/components/ui';

export default function AddSoftwarePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        softwareType: 'ONLINE',
        description: '',
        demoVideoUrl: '',
        price: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/software', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseInt(formData.price) || 0,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Lỗi khi tạo phần mềm');
            }

            router.push('/admin/san-pham');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-dark-50 mb-8">
                Thêm Phần mềm mới
            </h1>

            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-lg bg-accent-red/10 border border-accent-red/30 text-accent-red text-sm">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Tên phần mềm"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="VD: AI Content Writer"
                            required
                        />

                        <Input
                            label="Slug (URL)"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="VD: ai-content-writer"
                            hint="Chỉ dùng chữ thường, số và dấu gạch ngang"
                            required
                        />

                        <div>
                            <label className="label">Loại phần mềm</label>
                            <select
                                name="softwareType"
                                value={formData.softwareType}
                                onChange={handleChange}
                                className="input"
                                required
                            >
                                <option value="ONLINE">Online (Web-based)</option>
                                <option value="OFFLINE">Offline (Download)</option>
                            </select>
                        </div>

                        <div>
                            <label className="label">Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="input min-h-[120px]"
                                placeholder="Mô tả chi tiết về phần mềm..."
                                required
                            />
                        </div>

                        <Input
                            label="Video demo (YouTube URL)"
                            name="demoVideoUrl"
                            value={formData.demoVideoUrl}
                            onChange={handleChange}
                            placeholder="https://youtube.com/watch?v=..."
                        />

                        <Input
                            label="Giá (VNĐ)"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="VD: 199000"
                            required
                        />

                        <div className="flex gap-4 pt-4">
                            <Button type="submit" variant="primary" loading={loading}>
                                Tạo phần mềm
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => router.back()}
                            >
                                Hủy
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
