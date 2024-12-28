// import nodemailer from 'nodemailer';
// import bcryptjs from "bcryptjs";
// import User from '@/models/userModel';
// // Define the types for the function parameters
// interface SendEmailParams {
//   email: string;
//   emailType: 'VERIFY' | 'RESET'; // Limit the possible values of emailType to 'VERIFY' and 'RESET'
//   userId: string;
// }

// // Function to send email
// export const sendEmail = async ({ email, emailType, userId }: SendEmailParams): Promise<any> => {
//   try {

//     const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//     if (emailType === 'VERIFY') {
//       await User.findByIdAndUpdate(userId, {verifyToken : hashedToken, verifyTokenExpiry: Date.now()+ 3600000});
//     } else if(emailType === 'RESET'){
//       await User.findByIdAndUpdate(userId, {forgetPasswordToken : hashedToken, forgetPasswordTokenExpiry: Date.now()+ 3600000});
//     }

//     // Set up the email transporter
//   // Looking to send emails in production? Check out our Email API/SMTP product!
// var transport = nodemailer.createTransport({
//   host: process.env.mailHost,
//   port: process.env.mailPort,
//   auth: {
//     user: process.env.mailUser,
//     pass: process.env.mailUserPassword
//   }
// });

//     // Define email content based on the emailType
//     const mailOptions = {
//       from: 'ananddhardwivedi05@gmail.com', // sender address
//       to: email, // recipient email
//       subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // subject line
//       html: emailType === 'VERIFY'
//         ? `<p>Please click the link to verify your email, user ID: ${userId}</p>`
//         : `<p>Please click the link to reset your password, user ID: ${userId}</p>`, // html body
//     };

//     // Send the email
//     const mailResponse = await transport.sendMail(mailOptions);
//     return mailResponse;

//   } catch (error: any) {
//     // Catch any errors and return a meaningful error message
//     throw new Error(error.message);
//   }
// };

import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/user";

// Define the types for the function parameters
interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET"; // Limit the possible values of emailType to 'VERIFY' and 'RESET'
  userId: string;
}

// Function to send email
export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailParams): Promise<any> => {
  try {
    // Hash the userId to generate a token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update user document with respective token and expiry time
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Log environment variables to debug
    console.log(
      "MAIL HOST:",
      process.env.mailHost,
      "MAIL PORT:",
      process.env.mailPort
    );

    // Set up the email transporter
    var transport = nodemailer.createTransport({
      host: process.env.mailHost || "smtp.ethereal.email",
      port: Number(process.env.mailPort) || 587,
      auth: {
        user: process.env.mailUser || "your-email@example.com",
        pass: process.env.mailUserPassword || "your-password",
      },
    });

    // Define email content based on the emailType
    const mailOptions = {
      from: "ananddhardwivedi05@gmail.com", // sender address
      to: email, // recipient email
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // subject line
      //   html: emailType === 'VERIFY'
      //     ? `<p>Please click the link to verify your email, user ID: ${userId}</p>`
      //     : `<p>Please click the link to reset your password, user ID: ${userId}</p>`, // html body
      html: `
  <p>Please click <a href="${
    process.env.DOMAIN
  }/verifyemail?token=${hashedToken}">
  here</a> to ${
    emailType === "VERIFY" ? "verify your email" : "reset your password"
  }.</p>
  <p>Or copy and paste the link below into your browser:</p>
  <br>
  ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
`,
    };

    // Send the email
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.error("Email sending error:", error.message);
    throw new Error(error.message);
  }
};
