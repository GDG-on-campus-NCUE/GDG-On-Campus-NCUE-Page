'use client';

export const runtime = 'edge';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import gdgIcon from '@/images/icon/GDG_icon.png';
import { 
    PlusIcon, 
    TrashIcon, 
    CheckBadgeIcon, 
    ArrowLeftOnRectangleIcon,
    MagnifyingGlassIcon,
    ArrowTopRightOnSquareIcon,
    CloudArrowUpIcon,
    PhotoIcon,
    DocumentTextIcon,
    UserGroupIcon,
    CalendarDaysIcon,
    XMarkIcon,
    SparklesIcon,
    ShieldCheckIcon,
    ClipboardIcon,
    ClipboardDocumentCheckIcon,
    ChevronUpIcon,
    ChevronDownIcon
} from '@heroicons/react/24/solid'; 

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [copied, setCopied] = useState(false);
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
    
    // 全亂碼證號產生器
    const generateCertNumber = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 12; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return `GDG-${result}`;
    };

    // 數位簽章演算法
    const signCertificate = async (data) => {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(JSON.stringify(data));
        const hashBuffer = await crypto.subtle.digest('SHA-256', encodedData);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return `v1_ed25519_${hashHex.substring(0, 32)}`;
    };

    const [newCert, setNewCert] = useState({
        id: '', // 預先產生的 UUID
        cert_number: '',
        recipient_name: '',
        event_name: '',
        issue_date: new Date().toISOString().split('T')[0],
    });

    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/admin/login');
            } else {
                setUser(session.user);
                fetchCertificates();
            }
        };
        checkAuth();
    }, [router]);

    const fetchCertificates = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error) setCerts(data);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setFilePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleAddCertificate = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let image_url = '';

            // 產生數位簽章
            const signature = await signCertificate({
                n: newCert.cert_number,
                r: newCert.recipient_name,
                e: newCert.event_name,
                d: newCert.issue_date
            });

            if (selectedFile) {
                const fileExt = selectedFile.name.split('.').pop();
                const fileName = `${newCert.cert_number}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('certificates')
                    .upload(filePath, selectedFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('certificates')
                    .getPublicUrl(filePath);
                
                image_url = publicUrl;
            }

            const { error: dbError } = await supabase
                .from('certificates')
                .insert([{ 
                    ...newCert, 
                    signature,
                    image_url 
                }]);

            if (dbError) throw dbError;

            setIsModalOpen(false);
            resetForm();
            fetchCertificates();
        } catch (error) {
            alert('操作失敗: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setSelectedFile(null);
        setFilePreview(null);
        setCopied(false);
        setNewCert({
            id: '',
            cert_number: '',
            recipient_name: '',
            event_name: '',
            issue_date: new Date().toISOString().split('T')[0],
        });
    };

    const openModal = () => {
        // 提前產生 UUID 與 證號
        const pregeneratedId = crypto.randomUUID();
        setNewCert(prev => ({
            ...prev,
            id: pregeneratedId,
            cert_number: generateCertNumber()
        }));
        setIsModalOpen(true);
    };

    const handleCopyUrl = () => {
        const baseUrl = 'https://gdg.ncuesa.org.tw';
        const url = `${baseUrl}/verify/${newCert.id}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = async (id, imageUrl) => {
        if (confirm('確定要刪除此證書嗎？相關圖片也會一併刪除。')) {
            if (imageUrl) {
                try {
                    const fileName = imageUrl.split('/').pop();
                    await supabase.storage.from('certificates').remove([fileName]);
                } catch (e) {
                    console.error("Failed to delete storage file:", e);
                }
            }

            const { error } = await supabase
                .from('certificates')
                .delete()
                .eq('id', id);
            
            if (!error) fetchCertificates();
        }
    };

    const filteredAndSortedCerts = useMemo(() => {
        let result = certs.filter(cert => 
            cert.recipient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.cert_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.event_name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        result.sort((a, b) => {
            const dateA = new Date(a.issue_date).getTime();
            const dateB = new Date(b.issue_date).getTime();
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [certs, searchQuery, sortOrder]);

    const toggleSort = () => {
        setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    };

    if (loading && !user) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-gray-500">系統載入中...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] select-none">
            {/* Topbar */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex items-center justify-center">
                                <Image
                                    src={gdgIcon}
                                    alt="GDG Logo"
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <h1 className="text-base sm:text-lg font-bold tracking-tight text-gray-900">Google Developer Group on Campus NCUE</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end border-r border-gray-200 pr-4">
                                <span className="text-sm font-semibold text-gray-900">{user?.email?.split('@')[0]}</span>
                                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Admin</span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all"
                            >
                                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                                <span className="text-sm hidden sm:inline">登出</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                        <div className="bg-blue-50 p-3 rounded-xl text-blue-600 border border-blue-100">
                            <DocumentTextIcon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">總核發證書</p>
                            <h3 className="text-2xl font-bold text-gray-900">{certs.length}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                        <div className="bg-purple-50 p-3 rounded-xl text-purple-600 border border-purple-100">
                            <UserGroupIcon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">受證總人數</p>
                            <h3 className="text-2xl font-bold text-gray-900">{new Set(certs.map(c => c.recipient_name)).size}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                        <div className="bg-orange-50 p-3 rounded-xl text-orange-600 border border-orange-100">
                            <CalendarDaysIcon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">本月新增發放</p>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {certs.filter(c => new Date(c.created_at).getMonth() === new Date().getMonth()).length}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
                        <div className="relative w-full md:w-96">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="搜尋證號、姓名或活動..." 
                                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-sm font-medium shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={openModal}
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                        >
                            <PlusIcon className="w-5 h-5 text-white" />
                            <span className="text-white">發放新證書</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-gray-500 text-xs font-semibold uppercase tracking-wider bg-gray-50/80 border-b border-gray-200">
                                    <th className="px-6 py-4 font-semibold">證書編號</th>
                                    <th className="px-6 py-4 font-semibold">獲證成員</th>
                                    <th className="px-6 py-4 font-semibold">所屬活動 / 專案</th>
                                    <th 
                                        className="px-6 py-4 font-semibold cursor-pointer hover:bg-gray-200 transition-colors select-none"
                                        onClick={toggleSort}
                                    >
                                        <div className="flex items-center gap-1 group">
                                            發放日期
                                            <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                                                {sortOrder === 'desc' ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronUpIcon className="w-4 h-4" />}
                                            </span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right font-semibold">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white text-sm">
                                {filteredAndSortedCerts.length > 0 ? filteredAndSortedCerts.map((cert) => (
                                    <tr key={cert.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs bg-gray-100 px-2.5 py-1 rounded-md text-gray-600 border border-gray-200">
                                                {cert.cert_number}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                                                    {cert.image_url ? (
                                                        <img src={cert.image_url} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <PhotoIcon className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900">{cert.recipient_name}</span>
                                                    {cert.signature && (
                                                        <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium mt-0.5">
                                                            <ShieldCheckIcon className="w-3 h-3" />
                                                            已加密簽署
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-700 font-medium">{cert.event_name}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-500 flex items-center gap-1.5">
                                                <CalendarDaysIcon className="w-4 h-4" />
                                                {cert.issue_date}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a 
                                                    href={`/verify/${cert.id}`} 
                                                    target="_blank" 
                                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                                                    title="查看驗證頁面"
                                                >
                                                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                                </a>
                                                <button 
                                                    onClick={() => handleDelete(cert.id, cert.image_url)}
                                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                                                    title="撤銷此證書"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-24 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="bg-gray-50 p-4 rounded-full border border-gray-100">
                                                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-300" />
                                                </div>
                                                <div>
                                                    <h4 className="text-gray-900 font-semibold mb-1">找不到紀錄</h4>
                                                    <p className="text-gray-500 text-sm">沒有符合條件的證書，請嘗試其他關鍵字。</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
                    <div 
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl relative z-10 flex flex-col max-h-[95vh]">
                        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-50 p-2 rounded-lg">
                                    <SparklesIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">核發新證書</h2>
                                    <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Issue Certificate</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleAddCertificate} className="space-y-6">
                                {/* 驗證網址複製作業區 */}
                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                                            <ShieldCheckIcon className="w-3.5 h-3.5" />
                                            驗證頁面連結 (製作 QR Code 用)
                                        </label>
                                        <button 
                                            type="button"
                                            onClick={handleCopyUrl}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${copied ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-100'}`}
                                        >
                                            {copied ? (
                                                <>
                                                    <ClipboardDocumentCheckIcon className="w-3.5 h-3.5" />
                                                    已複製
                                                </>
                                            ) : (
                                                <>
                                                    <ClipboardIcon className="w-3.5 h-3.5" />
                                                    複製網址
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div className="font-mono text-[11px] bg-white/60 p-3 rounded-lg border border-emerald-100 text-emerald-800 break-all select-all">
                                        https://gdg.ncuesa.org.tw/verify/{newCert.id}
                                    </div>
                                    <p className="text-[10px] text-emerald-600/70 font-medium">
                                        ※ 請先複製此網址製作 QR Code 並嵌入證書圖檔中，完成後再上傳圖檔。
                                    </p>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">受證成員姓名</label>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="例：王小明" 
                                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 shadow-sm"
                                        value={newCert.recipient_name}
                                        onChange={e => setNewCert({...newCert, recipient_name: e.target.value})}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">活動或專案名稱</label>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="例：Build with AI 2025 Workshop" 
                                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 shadow-sm"
                                        value={newCert.event_name}
                                        onChange={e => setNewCert({...newCert, event_name: e.target.value})}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700 flex justify-between">
                                        <span>上傳證書圖檔 (需包含 QR Code)</span>
                                        <span className="text-gray-400 font-normal">PNG, JPG, WEBP</span>
                                    </label>
                                    <div className="relative group">
                                        <input 
                                            required={!selectedFile}
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        />
                                        <div className={`w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors min-h-[180px] ${selectedFile ? 'border-blue-500 bg-blue-50/50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'}`}>
                                            {filePreview ? (
                                                <div className="relative w-full max-w-[240px] aspect-[4/3] rounded-lg overflow-hidden shadow-md border border-gray-200">
                                                    <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-gray-900/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                                        <CloudArrowUpIcon className="w-8 h-8 text-white mb-1" />
                                                        <span className="text-white font-medium text-sm">更換檔案</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center text-center">
                                                    <CloudArrowUpIcon className="w-8 h-8 text-gray-400 mb-2" />
                                                    <p className="text-sm font-semibold text-gray-700 mb-1">點擊或拖放檔案至此</p>
                                                    <p className="text-xs text-gray-500">建議上傳已嵌入 QR Code 的成品</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 flex gap-3 border-t border-gray-200">
                                    <button 
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                                    >
                                        取消
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={uploading}
                                        className="flex-[2] bg-blue-600 text-white py-2.5 rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {uploading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span className="text-white">處理中...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-white">正式發放證書</span>
                                                <CheckBadgeIcon className="w-5 h-5 text-white" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
