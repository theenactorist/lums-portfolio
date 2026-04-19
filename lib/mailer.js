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
  await transporter.sendMail({
    from: `"Ask Lums Bot" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `Ask Lums — Unknown Question: "${question.slice(0, 60)}${question.length > 60 ? '…' : ''}"`,
    text: `Someone asked Ask Lums a question that wasn't in the knowledge base.\n\nQuestion:\n"${question}"\n\nTimestamp: ${new Date().toISOString()}\n\nConsider adding this to lumsKnowledge.md.`,
    html: `<p>Someone asked <strong>Ask Lums</strong> a question that wasn't in the knowledge base.</p>
<blockquote style="border-left:3px solid #e07b3c;padding-left:12px;color:#333;">${question}</blockquote>
<p style="color:#888;font-size:12px;">Timestamp: ${new Date().toISOString()}</p>
<p>Consider adding this to <code>lumsKnowledge.md</code>.</p>`,
  });
}
