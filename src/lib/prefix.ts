export const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
// 方便把「只有檔名」或「沒 /images」的路徑補齊
export function asset(p: string) {
  // 去除開頭的斜線（避免出現 //images）
  const clean = p.replace(/^\/+/, '');
  // 如果本來就以 images/ 開頭，直接加前綴；否則補上 images/
  const rel = clean.startsWith('images/') ? clean : `images/${clean}`;
  return `${prefix}/${rel}`;
}
