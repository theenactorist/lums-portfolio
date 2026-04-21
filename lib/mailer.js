import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendUnknownQuery(question) {
  // Simple HTML entity encoding to prevent stored XSS or phishing payload execution in email clients
  const sanitizeHtml = (str) => 
    str.replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#39;');

  const safeQuestion = sanitizeHtml(question);

  await transporter.sendMail({
    from: `"Ask Lums Bot" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `Ask Lums — Unknown Question: "${safeQuestion.slice(0, 60)}${safeQuestion.length > 60 ? '…' : ''}"`,
    text: `Someone asked Ask Lums a question that wasn't in the knowledge base.\n\nQuestion:\n"${question}"\n\nTimestamp: ${new Date().toISOString()}\n\nConsider adding this to lumsKnowledge.md.`,
    html: `<p>Someone asked <strong>Ask Lums</strong> a question that wasn't in the knowledge base.</p>
<blockquote style="border-left:3px solid #e07b3c;padding-left:12px;color:#333;">${safeQuestion}</blockquote>
<p style="color:#888;font-size:12px;">Timestamp: ${new Date().toISOString()}</p>
<p>Consider adding this to <code>lumsKnowledge.md</code>.</p>`,
  });
}
