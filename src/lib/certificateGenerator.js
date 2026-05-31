import QRCode from 'qrcode';

/**
 * Helper to wrap text into multiple lines
 */
const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
};

/**
 * Generates a certificate image using a canvas.
 */
export const generateCertificate = async ({
    name,
    eventName,
    id,
    certNumber,
    issueDate,
    templateUrl = '/images/certificates/template.png'
}) => {
    // Load template
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = templateUrl;
    
    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error('Failed to load certificate template.'));
    });

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');

    // 1. Draw Template Background
    ctx.drawImage(image, 0, 0);

    const sansFont = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';

    // 2. Draw Recipient Name
    const nameFontSize = Math.floor(canvas.height * 0.075);
    ctx.font = `bold ${nameFontSize}px ${sansFont}`;
    ctx.fillStyle = '#202124';
    ctx.textAlign = 'left';
    ctx.fillText(name, canvas.width * 0.065, canvas.height * 0.38);

    // 3. Draw Description Text with wrapping
    const descriptionFontSize = Math.floor(canvas.height * 0.030);
    const lineSpacing = descriptionFontSize * 1.5;
    ctx.font = `${descriptionFontSize}px ${sansFont}`;
    ctx.fillStyle = '#5f6368';
    
    const maxWidth = canvas.width * 0.55; // Wrap earlier as requested
    const startX = canvas.width * 0.065;
    const startY = canvas.height * 0.48;

    const introText = "Is hereby awarded this Certificate of Participation for actively participating in the ";
    const fullText = introText + eventName + " seminar.";
    
    // We want to highlight/underline the event name part
    // To keep it simple but functional, let's wrap the intro + eventName
    const lines = wrapText(ctx, fullText, maxWidth);

    lines.forEach((line, index) => {
        const y = startY + (index * lineSpacing);
        
        // Try to detect if the eventName is in this line to style it differently
        if (line.includes(eventName)) {
            const parts = line.split(eventName);
            let currentX = startX;
            
            // Draw part before event name
            if (parts[0]) {
                ctx.fillStyle = '#5f6368';
                ctx.fillText(parts[0], currentX, y);
                currentX += ctx.measureText(parts[0]).width;
            }
            
            // Draw event name bold/darker
            ctx.fillStyle = '#202124';
            ctx.font = `bold ${descriptionFontSize}px ${sansFont}`;
            ctx.fillText(eventName, currentX, y);
            
            // Draw underline for event name
            const evWidth = ctx.measureText(eventName).width;
            ctx.beginPath();
            ctx.strokeStyle = '#202124';
            ctx.lineWidth = 1.5;
            ctx.moveTo(currentX, y + 5);
            ctx.lineTo(currentX + evWidth, y + 5);
            ctx.stroke();
            
            currentX += evWidth;
            
            // Draw part after event name
            if (parts[1]) {
                ctx.fillStyle = '#5f6368';
                ctx.font = `${descriptionFontSize}px ${sansFont}`;
                ctx.fillText(parts[1], currentX, y);
            }
        } else {
            ctx.fillStyle = '#5f6368';
            ctx.font = `${descriptionFontSize}px ${sansFont}`;
            ctx.fillText(line, startX, y);
        }
    });

    // 4. Draw QR Code
    const qrSize = Math.floor(canvas.height * 0.28);
    const qrX = canvas.width * 0.69;
    const qrY = canvas.height * 0.40;
    
    const verificationUrl = `${window.location.origin}/verify/${id}`;
    
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
        margin: 1,
        width: qrSize,
        color: { dark: '#000000', light: '#ffffff' },
        errorCorrectionLevel: 'H'
    });
    
    const qrImage = new Image();
    qrImage.src = qrDataUrl;
    await new Promise((resolve) => {
        qrImage.onload = resolve;
    });
    
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    // 5. Verification Metadata
    const metaFontSize = Math.floor(canvas.height * 0.012);
    ctx.font = `${metaFontSize}px ${sansFont}`;
    ctx.fillStyle = '#70757a';
    ctx.textAlign = 'center';
    
    ctx.fillText("Scan the QR code to view the digital credential.", qrX + qrSize / 2, qrY + qrSize + canvas.height * 0.03);
    
    ctx.font = `bold ${metaFontSize}px ${sansFont}`;
    ctx.fillText(`Verification ID: ${id}`, qrX + qrSize / 2, qrY + qrSize + canvas.height * 0.05);

    return canvas.toDataURL('image/png', 1.0);
};
