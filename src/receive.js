import amqp from 'amqplib';

export const receive = async (msg) => {
  try {
    // Get a connection to the queue
    const conn = await amqp.connect({
      // protocol: 'amqp',
      hostname: process.env.MQ_HOSTNAME,
    });

    // Creaete a channel
    const ch = await conn.createChannel();

    // Define queue
    const queue = 'hello';

    // Make sure queue is there
    await ch.assertQueue(queue, {
      durable: false
    });

    console.log("Waiting for messages in %s. To exit press CTRL+C", queue);

    ch.consume(queue, function(msg) {
        console.log("Received %s", msg.content.toString());
    }, {
        noAck: true
    });

  } catch (error) {
    console.error(error);
  }
};