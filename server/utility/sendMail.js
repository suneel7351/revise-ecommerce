import { createTransport } from "nodemailer";
async function sendMail(user_email, subject, html) {
  try {
    const transport = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })



    const options = {
      from: process.env.EMAIL_USER,
      to: user_email,
      subject,
      html
    }

    await transport.sendMail(options)


  } catch (error) {
    console.log(error.message);
  }
}
export default sendMail