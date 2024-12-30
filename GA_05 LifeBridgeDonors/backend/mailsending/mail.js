const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider's service (Gmail in this case)
  auth: {
    user: process.env.SMTP_USER, // Add your email in environment variables
    pass: process.env.SMTP_PASS, // Add your email password/app password
  },
});

async function sendVerificationEmail(email, token) {
  const verificationLink = `http://localhost:3177/auth/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify your email address",
    html: `<p>Please click the following link to verify your email address:</p>
           <a href="${verificationLink}">${verificationLink}</a>`,
  });
}

module.exports = { sendVerificationEmail };
