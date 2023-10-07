const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
 
const productStaticRouter = require("./routes/product-static-routes.js");
const productRouter = require("./routes/product-routes.js");
const cartRouter = require("./routes/cart-routes.js");
 
const app = express();
const port = 3000;
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
 
// Middleware
// Allow all origins (Disable CORS)
app.use(cors());
app.use(express.json());
app.use("/api/products", productStaticRouter);
app.use("/products", productRouter);
app.use("/mycart", cartRouter);
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
 
  // Create a Nodemailer transporter using your email service provider's SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'Hotmail', // e.g., 'Gmail'
    auth: {
      user: 'devaro21@hotmail.com',
      pass: 'devaro1234',
    },
  });
 
  // Define email content
  const mailOptions = {
    from: "devaro21@hotmail.com", // Sender's email address
    to: 'dbrahmansyah@gmail.com', // Receiver's email address
    subject: 'New Contact Form Submission',
    text: `
    Pesan baru dari ${name}
      Email: ${email}
      Message: ${message}
    `,
  };
 
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});
 
 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});