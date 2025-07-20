const nodemailer = require("nodemailer");
const {google} = require('googleapis');
const { EmailConfig } = require('../config/');


const oAuth2Client = new google.auth.OAuth2(
    EmailConfig.GOOGLE_CLIENT_ID,
    EmailConfig.GOOGLE_CLIENT_SECRET,
    EmailConfig.REDIRECT_URL
);

oAuth2Client.setCredentials(
    {refresh_token: EmailConfig.GOOGLE_REFRESH_TOKEN}
)


async function sendMail(data) {
    try {
        console.log(data)
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "avinashn0408@gmail.com",
              clientId: EmailConfig.GOOGLE_CLIENT_ID,
              clientSecret: EmailConfig.GOOGLE_CLIENT_SECRET,
              refreshToken: EmailConfig.GOOGLE_REFRESH_TOKEN,
              accessToken: accessToken,
            }
        })

        const mailOptions = {
            from: 'Avinash' ,
            to: data.to,
            subject: data.subject,
            text: data.text
        }

        const result = await transport.sendMail(mailOptions);
        console.log('Done mailing');
        return result
        
        
    } catch (error) {
        console.log(error);
        return error;
        
    }
    
 }

 module.exports = {
    sendMail
 }