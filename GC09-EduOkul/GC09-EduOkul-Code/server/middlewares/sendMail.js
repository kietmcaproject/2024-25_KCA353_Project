import {createTransport} from 'nodemailer'

const sendMail = async (email, subject, data) => {
      const transport = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.Gmail,
          pass: process.env.Password,
        },
      });
    

const html=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      width: 100%;
      background-color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .email-content {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
    .email-header {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 20px;
    }
    .email-body {
      font-size: 16px;
      color: #555;
      margin-bottom: 20px;
    }
    .otp {
      font-size: 32px;
      font-weight: bold;
      color: #ff6f61;
      margin: 20px 0;
    }
    .footer {
      font-size: 12px;
      color: #999;
      margin-top: 20px;
    }
    .footer a {
      color: #ff6f61;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-content">
      <div class="email-header">
        OTP Verification for Your Account
      </div>
      <div class="email-body">
        <p>Hello <strong>${data.name}</strong>,</p>
        <p>We received a request to register your account.</p>
        <p>Use the following One-Time Password (OTP) to verify your email address:</p>
        <div class="otp">${data.otp}</div> 
        <p>This OTP is valid for 5 minutes. If you did not request this verification, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>Thank you for using our service!</p>
        <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;
  await transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject,
    html,
  });
};

export default sendMail;