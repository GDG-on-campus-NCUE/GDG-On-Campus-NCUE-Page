import QRCode from 'qrcode';

/**
 * 依 maxWidth 斷行。
 * 先用空白切詞（英文），單一「詞」還是超寬時再逐字元切——中文活動名稱沒有空白，
 * 只靠空白切會整段爆出畫布外。
 */
const wrapText = (ctx, text, maxWidth) => {
    const lines = [];
    let current = '';

    const flush = () => {
        if (current) lines.push(current);
        current = '';
    };

    const pushChunk = (chunk) => {
        const candidate = current ? `${current} ${chunk}` : chunk;
        if (ctx.measureText(candidate).width <= maxWidth) {
            current = candidate;
            return;
        }
        flush();
        if (ctx.measureText(chunk).width <= maxWidth) {
            current = chunk;
            return;
        }
        // 單一長詞（或整串中文）逐字元塞
        for (const char of chunk) {
            if (ctx.measureText(current + char).width > maxWidth && current) flush();
            current += char;
        }
    };

    for (const word of text.split(' ').filter(Boolean)) pushChunk(word);
    flush();

    return lines.length ? lines : [''];
};

/**
 * 在瀏覽器端用 canvas 把證書畫出來，回傳 PNG 的 data URL。
 * verifyUrl 由呼叫端傳入（正式站要用正式網域，QR Code 才不會指到 localhost）。
 */
export const generateCertificate = async ({
    name,
    eventName,
    id,
    certNumber,
    issueDate,
    verifyUrl,
    templateUrl = '/images/certificates/certificate-of-participation.png',
}) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = templateUrl;

    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error('證書範本圖片載入失敗'));
    });

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');

    // 1. 範本底圖
    ctx.drawImage(image, 0, 0);

    const sansFont = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';

    // 2. 受證人姓名
    const nameFontSize = Math.floor(canvas.height * 0.075);
    ctx.font = `bold ${nameFontSize}px ${sansFont}`;
    ctx.fillStyle = '#202124';
    ctx.textAlign = 'left';
    ctx.fillText(name, canvas.width * 0.065, canvas.height * 0.38);

    // 3. 說明文字（含斷行）
    const descriptionFontSize = Math.floor(canvas.height * 0.03);
    const lineSpacing = descriptionFontSize * 1.5;
    ctx.font = `${descriptionFontSize}px ${sansFont}`;
    ctx.fillStyle = '#5f6368';

    const maxWidth = canvas.width * 0.55;
    const startX = canvas.width * 0.065;
    const startY = canvas.height * 0.48;

    // 句尾不寫死活動類型（原本固定接 "seminar"，遇到中文活動名稱會變成「台東公益營 seminar.」）
    const introText = 'Is hereby awarded this Certificate of Participation for actively participating in ';
    const lines = wrapText(ctx, `${introText}${eventName}.`, maxWidth);

    lines.forEach((line, index) => {
        const y = startY + index * lineSpacing;

        // 活動名稱完整落在同一行時，加粗並加底線凸顯
        if (eventName && line.includes(eventName)) {
            const [before, after] = line.split(eventName);
            let x = startX;

            if (before) {
                ctx.fillStyle = '#5f6368';
                ctx.font = `${descriptionFontSize}px ${sansFont}`;
                ctx.fillText(before, x, y);
                x += ctx.measureText(before).width;
            }

            ctx.fillStyle = '#202124';
            ctx.font = `bold ${descriptionFontSize}px ${sansFont}`;
            ctx.fillText(eventName, x, y);

            const eventWidth = ctx.measureText(eventName).width;
            ctx.beginPath();
            ctx.strokeStyle = '#202124';
            ctx.lineWidth = 1.5;
            ctx.moveTo(x, y + 5);
            ctx.lineTo(x + eventWidth, y + 5);
            ctx.stroke();
            x += eventWidth;

            if (after) {
                ctx.fillStyle = '#5f6368';
                ctx.font = `${descriptionFontSize}px ${sansFont}`;
                ctx.fillText(after, x, y);
            }
        } else {
            ctx.fillStyle = '#5f6368';
            ctx.font = `${descriptionFontSize}px ${sansFont}`;
            ctx.fillText(line, startX, y);
        }
    });

    // 4. 驗證 QR Code
    const qrSize = Math.floor(canvas.height * 0.28);
    const qrX = canvas.width * 0.69;
    const qrY = canvas.height * 0.4;

    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        margin: 1,
        width: qrSize,
        color: { dark: '#000000', light: '#ffffff' },
        errorCorrectionLevel: 'H',
    });

    const qrImage = new Image();
    qrImage.src = qrDataUrl;
    await new Promise((resolve) => {
        qrImage.onload = resolve;
    });
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    // 5. 驗證資訊
    const metaFontSize = Math.floor(canvas.height * 0.012);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#70757a';

    ctx.font = `${metaFontSize}px ${sansFont}`;
    ctx.fillText('Scan the QR code to view the digital credential.', qrX + qrSize / 2, qrY + qrSize + canvas.height * 0.03);

    ctx.font = `bold ${metaFontSize}px ${sansFont}`;
    ctx.fillText(`Certificate No. ${certNumber}`, qrX + qrSize / 2, qrY + qrSize + canvas.height * 0.05);
    ctx.font = `${metaFontSize}px ${sansFont}`;
    ctx.fillText(`Issued ${issueDate}・ID ${id}`, qrX + qrSize / 2, qrY + qrSize + canvas.height * 0.068);

    return canvas.toDataURL('image/png', 1.0);
};
