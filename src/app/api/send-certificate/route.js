import { Resend } from 'resend';

export const runtime = 'edge';

export async function POST(req) {
    try {
        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            console.error('RESEND_API_KEY is missing');
            return new Response(JSON.stringify({ error: 'Mail server configuration error' }), { status: 500 });
        }

        const resend = new Resend(apiKey);
        const { to, name, eventName, certId, certUrl } = await req.json();

        if (!to || !name || !eventName || !certUrl) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'GDG on Campus NCUE <noreply@gdg.ncuesa.org.tw>',
            to: [to],
            subject: `Your Certificate of Participation - ${eventName}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Certificate of Participation</title>
                    <style>
                        body {
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            line-height: 1.6;
                            color: #1a1a1a;
                            margin: 0;
                            padding: 0;
                            background-color: #f8fafc;
                        }
                        .container {
                            max-width: 600px;
                            margin: 40px auto;
                            padding: 40px;
                            background-color: #ffffff;
                            border-radius: 12px;
                            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            border-bottom: 2px solid #f1f5f9;
                            padding-bottom: 20px;
                            margin-bottom: 30px;
                        }
                        .logo {
                            font-size: 18px;
                            font-weight: 700;
                            color: #0f172a;
                            letter-spacing: -0.025em;
                        }
                        .content h1 {
                            font-size: 24px;
                            font-weight: 800;
                            color: #0f172a;
                            margin-top: 0;
                        }
                        .content p {
                            font-size: 16px;
                            color: #475569;
                            margin-bottom: 24px;
                        }
                        .cta-button {
                            display: inline-block;
                            padding: 14px 28px;
                            background-color: #2563eb;
                            color: #ffffff !important;
                            text-decoration: none;
                            border-radius: 8px;
                            font-weight: 600;
                            font-size: 16px;
                            margin: 20px 0;
                        }
                        .metadata {
                            margin-top: 40px;
                            padding-top: 20px;
                            border-top: 1px solid #f1f5f9;
                            font-size: 12px;
                            color: #94a3b8;
                        }
                        .metadata code {
                            background-color: #f1f5f9;
                            padding: 2px 4px;
                            border-radius: 4px;
                            font-family: monospace;
                        }
                        @media (max-width: 640px) {
                            .container {
                                margin: 20px;
                                padding: 24px;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">GDG on Campus NCUE</div>
                        </div>
                        <div class="content">
                            <h1>Certificate of Participation</h1>
                            <p>Dear ${name},</p>
                            <p>Congratulations on successfully participating in the <strong>${eventName}</strong>. We are pleased to provide you with your official digital certificate.</p>
                            <a href="${certUrl}" class="cta-button">View Your Certificate</a>
                            <p>You can also access your certificate at any time by using the link above or scanning the QR code on the document.</p>
                        </div>
                        <div class="metadata">
                            <p>Verification ID: <code>${certId}</code></p>
                            <p>This is an automated message from Google Developer Group on Campus NCUE. Please do not reply to this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        if (error) {
            return new Response(JSON.stringify({ error }), { status: 500 });
        }

        return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
