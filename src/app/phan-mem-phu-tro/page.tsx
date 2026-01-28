import { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button, Card, CardContent, Badge } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Phần mềm phụ trợ cho tự động hóa nội dung',
    description: 'Các phần mềm online và offline hỗ trợ quy trình sản xuất, quản lý và tự động hóa nội dung, sử dụng độc lập ngoài website.',
};

// Mock data
const softwareList = [
    {
        id: '1',
        name: 'Phần mềm quản lý nội dung đa kênh',
        slug: 'quan-ly-noi-dung',
        softwareType: 'ONLINE',
        description: 'Công cụ online quản lý và lên lịch nội dung cho nhiều kênh YouTube, TikTok cùng lúc.',
        icon: '📊',
    },
    {
        id: '2',
        name: 'Phần mềm tự động hóa dựng video',
        slug: 'tu-dong-dung-video',
        softwareType: 'OFFLINE',
        description: 'Phần mềm cài đặt trên máy tính, tự động hóa các bước dựng video lặp đi lặp lại.',
        icon: '🎬',
    },
    {
        id: '3',
        name: 'Công cụ nghiên cứu từ khóa YouTube',
        slug: 'nghien-cuu-tu-khoa',
        softwareType: 'ONLINE',
        description: 'Phân tích và tìm kiếm từ khóa tiềm năng cho video YouTube.',
        icon: '🔍',
    },
    {
        id: '4',
        name: 'Phần mềm tạo thumbnail hàng loạt',
        slug: 'tao-thumbnail',
        softwareType: 'OFFLINE',
        description: 'Tạo thumbnail video nhanh chóng với template có sẵn.',
        icon: '🖼️',
    },
];

const typeFilters = ['Tất cả', 'Online', 'Offline'];

export default function SoftwareListingPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                {/* Hero */}
                <section className="section pb-8">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-50 mb-4">
                                Phần mềm phụ trợ cho tự động hóa nội dung
                            </h1>
                            <p className="text-lg text-dark-300">
                                Các phần mềm online và offline hỗ trợ quy trình sản xuất, quản lý và tự động hóa nội dung,
                                sử dụng độc lập ngoài website.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <section className="pb-8">
                    <div className="container-custom">
                        <div className="flex flex-wrap gap-2">
                            {typeFilters.map((filter, index) => (
                                <button
                                    key={filter}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${index === 0
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Software Grid */}
                <section className="section pt-0">
                    <div className="container-custom">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {softwareList.map((software) => (
                                <Card key={software.id} hover className="group h-full">
                                    <CardContent className="flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-4xl">{software.icon}</div>
                                            <Badge
                                                variant={software.softwareType === 'ONLINE' ? 'primary' : 'success'}
                                                size="sm"
                                            >
                                                {software.softwareType === 'ONLINE' ? '🌐 Online' : '💻 Offline'}
                                            </Badge>
                                        </div>

                                        <h3 className="text-lg font-semibold text-dark-50 mb-2 group-hover:text-primary-400 transition-colors">
                                            {software.name}
                                        </h3>

                                        <p className="text-dark-400 text-sm mb-6 flex-1">
                                            {software.description}
                                        </p>

                                        <Link href={`/phan-mem/${software.slug}`}>
                                            <Button variant="secondary" className="w-full">
                                                Xem chi tiết
                                                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Notice */}
                <section className="section bg-dark-950">
                    <div className="container-custom">
                        <Card variant="glass">
                            <CardContent>
                                <h2 className="text-xl font-bold text-dark-50 mb-4">
                                    Lưu ý khi sử dụng phần mềm
                                </h2>
                                <ul className="space-y-3 text-dark-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary-400">ℹ️</span>
                                        Phần mềm hoạt động độc lập ngoài website
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary-400">ℹ️</span>
                                        Phần mềm Online: truy cập qua link được cung cấp sau khi mua
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary-400">ℹ️</span>
                                        Phần mềm Offline: cài đặt trên máy tính theo hướng dẫn
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary-400">ℹ️</span>
                                        Website chỉ cung cấp thông tin và quyền sử dụng (license)
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
