
function htmlForSendOtp(name, company, otp) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f3f3f3;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        .header h1 {
          color: #ff9900;
          margin: 0;
        }
        .content p {
          margin: 0;
          color: #333;
        }
        .content .seller-name {
          font-weight: bold;
        }
        .content .shop-name {
          font-weight: bold;
          color: #ff9900;
        }
        .otp {
          color: #ff9900;
          font-size: 24px;
          margin: 10px 0;
        }
        .action-button {
          display: inline-block;
          padding: 10px 20px;
          margin: 10px;
          background-color: #ff9900;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>OTP Verification</h1>
        </div>
        <div class="content">
          <p>Hello <span class="seller-name">${name}</span>,</p>
          <p>Thank you for registering with <span class="shop-name">${company}</span>.</p>
          <p>Please use the following OTP to verify your account:</p>
          <h2 class="otp">${otp}</h2>
          <p>If you didn't request this OTP, you can safely ignore this email.</p>
          <div class="btns">
            <a class="action-button" href="#">Verify Now</a>
            <a class="action-button" href=${process.env.CLIENT_URL}>Ignore</a>
          </div>
          <p>Best regards,</p>
          <p>Eng-> Ecommerce</p>
        </div>
        <div class="footer">
          &copy; 2023 Eng-> Ecommerce. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    
    `
}


export default htmlForSendOtp