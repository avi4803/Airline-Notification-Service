const dotenv = require('dotenv');

dotenv.config();

module.exports = {
GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
REDIRECT_URL: process.env.REDIRECT_URL
    
}