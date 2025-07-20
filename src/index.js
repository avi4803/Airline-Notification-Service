const express = require('express');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const dotenv = require('dotenv');
const {connectQueue} = require('./utils/connect-queue');
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    await connectQueue();


});



