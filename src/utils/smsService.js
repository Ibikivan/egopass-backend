const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendSMSOTP = async (to, otp) => {
    console.log(`+${to}`)
  return client.messages.create({
    body: `Votre code OTP est : ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+${to}`,
  });
};

module.exports = { sendSMSOTP };
