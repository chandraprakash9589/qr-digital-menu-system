import nodemailer from "nodemailer";

const FROM_EMAIL = "noreply@testmail.com";
const SENDER_NAME = "Test";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTHENTICATION_EMAIL,
    pass: process.env.AUTHENTICATION_PASSWORD,
  },
});

export async function sendVerificationEmail(
  email: string,
  code: string,
  fullName?: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const displayName = fullName ? fullName.split(" ")[0] : "there";

  
    const textContent = `
Hi ${displayName},

Your verification code is:

${code}

This code will expire in 10 minutes.
If you didn't request this, please ignore this email.

Thanks,
Digital Menu Team
`;

    await transporter.sendMail({
      from: `${SENDER_NAME} <${FROM_EMAIL}>`,
      to: email,
      subject: `Your Verification Code: ${code}`,
      text: textContent,   
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Email service temporarily unavailable" };
  }
}
