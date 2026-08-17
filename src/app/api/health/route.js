import { DATA_DIR, getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** 健康檢查：確認 SQLite 檔案在掛載的 Volume 上真的能讀。 */
export async function GET() {
    try {
        const { count } = getDb().prepare('SELECT COUNT(*) AS count FROM certificates').get();
        return Response.json({ ok: true, dataDir: DATA_DIR, certificates: Number(count) });
    } catch (err) {
        return Response.json({ ok: false, error: err.message }, { status: 503 });
    }
}
