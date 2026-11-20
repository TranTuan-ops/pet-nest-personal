const nodemailer = require('nodemailer');

const port = Number(process.env.EMAIL_PORT || 587);
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    requireTLS: port !== 465 && process.env.NODE_ENV === "production",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = transporter;
