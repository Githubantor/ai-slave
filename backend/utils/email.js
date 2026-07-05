import nodemailer from 'nodemailer';

let transporter = null;

export const initEmail = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('  Email: not configured (EMAIL_USER / EMAIL_PASS missing)');
    return false;
  }
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  console.log(`  Email: configured for ${process.env.EMAIL_USER}`);
  return true;
};

export const sendEmail = async ({ to, subject, text, html }) => {
  if (!transporter) {
    console.log('  Email: not sent (not configured)');
    return false;
  }
  try {
    await transporter.sendMail({
      from: `"AI Company OS" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || text,
    });
    console.log(`  Email sent to ${to}: ${subject}`);
    return true;
  } catch (err) {
    console.error(`  Email failed to ${to}: ${err.message}`);
    return false;
  }
};

export default sendEmail;
