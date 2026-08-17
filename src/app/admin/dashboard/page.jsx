import { redirect } from 'next/navigation';
import { getAuthConfig, getSession } from '@/lib/auth';
import DashboardClient from './DashboardClient';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata = {
    title: '證書管理系統 | GDG on Campus NCUE',
    robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
    const session = await getSession();
    if (!session) redirect('/admin/login');

    return (
        <DashboardClient
            user={{ email: session.email, name: session.name, picture: session.picture }}
            siteUrl={getAuthConfig().appUrl}
        />
    );
}
