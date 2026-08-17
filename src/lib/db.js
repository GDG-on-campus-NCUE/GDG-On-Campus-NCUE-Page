import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

/**
 * 資料存放根目錄。
 * 在 Zeabur 上會掛載一顆 Volume 到這個路徑，容器重啟／重新部署後資料仍在。
 * 本機開發預設寫到專案底下的 ./data（已列入 .gitignore）。
 */
export const DATA_DIR = path.resolve(process.env.DATA_DIR || './data');
export const UPLOAD_DIR = path.join(DATA_DIR, 'certificates');

const DB_PATH = path.join(DATA_DIR, 'gdg.db');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS certificates (
    id              TEXT PRIMARY KEY,
    cert_number     TEXT NOT NULL UNIQUE,
    recipient_name  TEXT NOT NULL,
    recipient_email TEXT,
    event_name      TEXT NOT NULL,
    issue_date      TEXT NOT NULL,
    signature       TEXT,
    image_file      TEXT,
    issued_by       TEXT,
    email_status    TEXT NOT NULL DEFAULT 'skipped',
    email_error     TEXT,
    email_sent_at   TEXT,
    revoked_at      TEXT,
    created_at      TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at      TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_certificates_created_at ON certificates (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_certificates_event_name ON certificates (event_name);
CREATE INDEX IF NOT EXISTS idx_certificates_cert_number ON certificates (cert_number);

CREATE TRIGGER IF NOT EXISTS trg_certificates_updated_at
AFTER UPDATE ON certificates
FOR EACH ROW
BEGIN
    UPDATE certificates
       SET updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
     WHERE id = NEW.id;
END;

CREATE TABLE IF NOT EXISTS audit_log (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    actor      TEXT,
    action     TEXT NOT NULL,
    target_id  TEXT,
    detail     TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log (created_at DESC);
`;

let db;

/**
 * 取得（必要時初始化）SQLite 連線。
 * Next.js 在開發模式會反覆重載模組，所以連線掛在 globalThis 上避免重複開檔。
 */
export function getDb() {
    if (db) return db;

    const cached = globalThis.__gdgSqlite;
    if (cached) {
        db = cached;
        return db;
    }

    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });

    const instance = new DatabaseSync(DB_PATH);

    // WAL 讓讀寫不互相阻塞；FULL 同步保證斷電時已 commit 的交易不會遺失。
    instance.exec('PRAGMA journal_mode = WAL');
    instance.exec('PRAGMA synchronous = FULL');
    instance.exec('PRAGMA foreign_keys = ON');
    instance.exec('PRAGMA busy_timeout = 5000');
    instance.exec(SCHEMA);

    db = instance;
    globalThis.__gdgSqlite = instance;
    return db;
}

export function nowIso() {
    return new Date().toISOString();
}
