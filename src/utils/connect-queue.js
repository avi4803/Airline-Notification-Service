const {Mailer} = require('./')


const amqplib = require("amqplib");

async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("noti-queue");
    channel.consume('noti-queue', (data) => {
        const messageObject = JSON.parse(data.content.toString());
        console.log('Parsed message:', messageObject);
        Mailer.sendMail(messageObject)
        channel.ack(data)
    })

    
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
    connectQueue
}