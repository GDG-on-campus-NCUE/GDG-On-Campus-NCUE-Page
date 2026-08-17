import fs from 'node:fs/promises';
import path from 'node:path';
import { UPLOAD_DIR } from './db';

const SAFE_NAME = /^[A-Za-z0-9._-]+$/;

/**
 * 把 data URL（前台 canvas 產生的證書 PNG）落地到 Volume。
 * 回傳存進資料庫的檔名，實體路徑一律由 UPLOAD_DIR 組出來，避免路徑穿越。
 */
export async function saveCertificateImage(dataUrl, fileName) {
    const match = /^data:image\/png;base64,([A-Za-z0-9+/=\s]+)$/.exec(dataUrl || '');
    if (!match) throw new Error('證書圖片格式不正確，必須是 PNG data URL');
    if (!SAFE_NAME.test(fileName)) throw new Error('檔名含有不允許的字元');

    const buffer = Buffer.from(match[1], 'base64');
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, fileName), buffer);
    return fileName;
}

export async function readCertificateImage(fileName) {
    if (!fileName || !SAFE_NAME.test(fileName)) return null;
    try {
        return await fs.readFile(path.join(UPLOAD_DIR, fileName));
    } catch {
        return null;
    }
}

export async function deleteCertificateImage(fileName) {
    if (!fileName || !SAFE_NAME.test(fileName)) return;
    try {
        await fs.unlink(path.join(UPLOAD_DIR, fileName));
    } catch {
        // 檔案本來就不在就當作已刪除
    }
}
