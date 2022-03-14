import { Kafka } from 'kafkajs';


export const produce = async (data) => {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092']
  })
  
  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: 'test',
    messages: [
      { value: JSON.stringify(data) },
    ],
  })
}
