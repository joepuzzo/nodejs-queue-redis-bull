/**
 * 
 * Binding key distinguishes event on exchange
 * Queue distinguishes que on event
 * 
 * Example: 
 * 
 * bindingKey = new-sales-order
 * queue = [order_printer, order_billing, order_archive and order_tracking]
 */
export const receive = async ({ connection, exchange = '', queue = '', bindingKey = ''}) => {
  try {
    // Creaete a channel
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'direct', { durable: false });
    await channel.assertQueue(queue, {durable: true})
    await channel.bindQueue(queue, exchange, bindingKey)

    console.log(`Waiting for messages in exchange: ${exchange} queue: ${queue} bindingKey: ${bindingKey}`);

    channel.consume(queue, function(msg) {
        // console.log(msg);
        console.log(`Received queue: ${queue} bindingKey: ${bindingKey}`, msg.content.toString());
    }, {
        noAck: true
    });

  } catch (error) {
    console.error(error);
  }
};