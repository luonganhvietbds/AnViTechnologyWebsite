'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, Input } from '@/components/ui';

interface ConfigFormProps {
    title: string;
    description: string;
    fields: {
        key: string;
        label: string;
        value: string;
        type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'toggle';
        description?: string;
    }[];
    onSave: (data: Record<string, string>) => Promise<void>;
}

export function ConfigSection({ title, description, fields, onSave }: ConfigFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>(
        fields.reduce((acc, field) => ({ ...acc, [field.key]: field.value }), {})
    );

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        setSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            setSuccess(true);
            router.refresh();
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Save config error:', error);
            alert('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="mb-6">
            <CardContent>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-dark-50">{title}</h2>
                    <p className="text-dark-500 text-sm">{description}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.key}>
                            {field.type === 'toggle' ? (
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData[field.key] === 'true'}
                                        onChange={(e) => handleChange(field.key, e.target.checked ? 'true' : 'false')}
                                        className="w-5 h-5 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500"
                                    />
                                    <div>
                                        <span className="text-dark-100 font-medium">{field.label}</span>
                                        {field.description && (
                                            <p className="text-dark-500 text-sm">{field.description}</p>
                                        )}
                                    </div>
                                </label>
                            ) : (
                                <Input
                                    label={field.label}
                                    type={field.type || 'text'}
                                    value={formData[field.key]}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    hint={field.description}
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex items-center gap-4 pt-2">
                        <Button type="submit" variant="primary" size="sm" loading={loading}>
                            Lưu thay đổi
                        </Button>
                        {success && (
                            <span className="text-accent-green text-sm">✓ Đã lưu</span>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
