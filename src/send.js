import amqp from 'amqplib';

export const send = async (msg) => {
  try {
    // Get a connection to the queue
    const conn = await amqp.connect({
      protocol: 'amqp',
      hostname: process.env.MQ_HOSTNAME,
      // port: 5672,
      // password: process.env.EMAIL_MQ_PASSWORD,
      // username: process.env.EMAIL_MQ_USERNAME
    });

    // Creaete a channel
    const ch = await conn.createChannel();

    // Define queue
    const queue = 'hello';

    // Make sure queue is there
    await ch.assertQueue(queue, {
      durable: false
    });

    // Publish payload to the queue
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    console.log("Sent", msg);

    // Close the connection
    await ch.close();
    await conn.close();

  } catch (error) {
    console.error(error);
  }
};