const express = require('express');
const nodemailer = require("nodemailer");
const {google} = require('googleapis')
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);


});



const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET,process.env.REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token:process.env.GOOGLE_REFRESH_TOKEN})


 async function sendMail(data) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "avinashn0408@gmail.com",
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
              accessToken:accessToken,
            }
        })

        const mailOptions = {
            from: 'Avinash <avinashn0408@gmail.com>',
            to: data.receiver,
            subject: data.subject,
            text: data.content
        }

        const result = await transport.sendMail(mailOptions);
        console.log('done');
        console.log(result)
        return result
        
        
    } catch (error) {
        console.log(error);
        return error;
        
    }
    
 }