const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


const sendEmailOTP = async (to, otp) => {
    const mailOptions = {
        from: '"e-GoPass" <no-reply@egopass.com>',
        to,
        subject: 'Votre code OTP pour la réinitialisation du mot de passe',
        text: `Votre code OTP est : ${otp}`,
        html: `<p>Votre code OTP est : <strong>${otp}</strong></p>`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmailOTP };
