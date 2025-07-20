### Using RabbitMQ Queue for Notification Setup:
- We will use RabbitMQ in both Booking and Mailing Service to set up a queue for mailing tickets. This allows the mailing server, even if not scaled, to process tickets from the queue without getting overloaded.

**This function is used in the config folder to create queues:**

```js
const amqplib = require("amqplib");

let channel, connection;

async function connectQueue() {
  try {
    connection = await amqplib.connect("amqp://localhost");
    channel = await connection.createChannel();

    await channel.assertQueue("noti-queue");
  } catch(error) {
    console.log(error);
  }
}

async function sendData(data) {
  try {
    await channel.sendToQueue("noti-queue", Buffer.from(JSON.stringify(data)));
  } catch(error) {
    console.log("queue error", error);
  }
}

module.exports = {
  connectQueue,
  sendData
}
```
- All the message sent to queue is sent to Mailing service once it is up and running.
- We also sent acknowledgment once we consume the request from the Queue : This make sure that the same messages are not sent again.
-   

