export const send = async ({ msg, connection, exchange = '', routingKey = '' }) => {
  try {
    // Creaete a channel
    const channel = await connection.createChannel();
    console.log(`Sending on exchange ${exchange} to routingKey: ${routingKey}`)
    await channel.assertExchange(exchange, 'direct', { durable: false });
    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));

    // Close the channel
    await channel.close();
    // await connection.close(); // No need to do since connection was passed in!

  } catch (error) {
    console.error(error);
  }
};