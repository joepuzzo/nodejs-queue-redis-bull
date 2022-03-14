import { Kafka } from 'kafkajs';



export const consume = async () => {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092']
  })
  
  const consumer = kafka.consumer({ groupId: 'test-group' })

  console.log('Kafka Consumer Started');
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'test', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Kafka Consume:', {
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}
