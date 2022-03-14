import amqp from 'amqplib';

export const send = async ({ msg, exchange = '', routingKey = '' }) => {
  try {
    // Get a connection to the queue
    const conn = await amqp.connect({
      protocol: 'amqp',
      hostname: process.env.MQ_HOSTNAME,
    });

    // Creaete a channel
    const channel = await conn.createChannel();

    await channel.assertExchange(exchange, 'direct', { durable: false });
    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));

    // Close the connection
    await channel.close();
    await conn.close();

  } catch (error) {
    console.error(error);
  }
};