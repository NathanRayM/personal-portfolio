//imports
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

// create express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// transporter for nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// set up rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many submissions. Please try again in 15 minutes.",
  },
});

// Post Route
app.post("/contact", contactLimiter, async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({
      success: "false",
      message: "Please complete all required fields",
    });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_TO,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Portfolio Contact: ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName} 
      Email: ${email} 
      Phone: ${phone || "Not provided"} 
      Message: ${message}`,
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
      <h2 style="margin-bottom: 16px;">New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <hr style="margin: 24px 0;" />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line;">${message}</p>
    </div>`,
    });

    res.json({
      success: true,
      message:
        "Thanks for reaching out! Your message has been received, and I'll be in touch soon.",
    });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({
      success: false,
      message:
        "Sorry, something went wrong while sending your message. Please try again, or email me directly at nathan@nathanray.dev.",
    });
  }
});

// Port variable and listening route
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
