import QRCode from 'qrcode';

/**
 * Generates a certificate image using a canvas.
 * 
 * @param {Object} options
 * @param {string} options.name - Recipient name
 * @param {string} options.eventName - Name of the event or project
 * @param {string} options.id - Verification UUID
 * @param {string} options.certNumber - Certificate number (e.g., GDG-XXXX)
 * @param {string} options.issueDate - Date of issue
 * @param {string} [options.templateUrl] - URL to the template image
 * @returns {Promise<string>} - Base64 data URL of the generated certificate
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
    image.crossOrigin = "anonymous"; // Ensure we can read the canvas if template is on another domain
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

    // Font selection
    // We attempt to use standard Google Sans fallbacks
    const sansFont = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';

    // 2. Draw Recipient Name
    // Based on DEMO.png, Name is large, bold, and placed on the left-middle
    const nameFontSize = Math.floor(canvas.height * 0.075);
    ctx.font = `bold ${nameFontSize}px ${sansFont}`;
    ctx.fillStyle = '#202124'; // Google Dark Grey
    ctx.textAlign = 'left';
    ctx.fillText(name, canvas.width * 0.065, canvas.height * 0.38);

    // 3. Draw Description Text
    const descriptionFontSize = Math.floor(canvas.height * 0.032);
    const lineSpacing = descriptionFontSize * 1.5;
    ctx.font = `${descriptionFontSize}px ${sansFont}`;
    ctx.fillStyle = '#5f6368'; // Google Medium Grey
    
    const textPart1 = "Is hereby awarded this Certificate of Participation for actively";
    const textPart2 = "participating in the ";
    const textPart3 = `${eventName} seminar.`;

    // Wrap text or handle multiple lines
    ctx.fillText(textPart1, canvas.width * 0.065, canvas.height * 0.48);
    
    // Draw event name part - we might want to underline it as in the demo
    const part2Width = ctx.measureText(textPart2).width;
    ctx.fillText(textPart2, canvas.width * 0.065, canvas.height * 0.48 + lineSpacing);
    
    // Draw the event name (underlined style)
    ctx.fillStyle = '#202124';
    ctx.fillText(textPart3, canvas.width * 0.065 + part2Width, canvas.height * 0.48 + lineSpacing);
    
    // Draw underline for event name
    const eventNameWidth = ctx.measureText(textPart3).width;
    ctx.beginPath();
    ctx.strokeStyle = '#5f6368';
    ctx.lineWidth = 2;
    ctx.moveTo(canvas.width * 0.065 + part2Width, canvas.height * 0.48 + lineSpacing + 5);
    ctx.lineTo(canvas.width * 0.065 + part2Width + eventNameWidth, canvas.height * 0.48 + lineSpacing + 5);
    ctx.stroke();

    // 4. Draw QR Code
    const qrSize = Math.floor(canvas.height * 0.28);
    const qrX = canvas.width * 0.69;
    const qrY = canvas.height * 0.40;
    
    // Verification URL - Use window.location.origin as base
    const verificationUrl = `${window.location.origin}/verify/${id}`;
    
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
        margin: 1,
        width: qrSize,
        color: {
            dark: '#000000',
            light: '#ffffff'
        },
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

    // Return as Blob or DataURL
    return canvas.toDataURL('image/png', 1.0);
};
