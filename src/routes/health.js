import express from 'express';
import { createClient } from 'redis';

const client = createClient({
  url: `redis://${process.env.REDIS_URL}`
  // host: '172.21.0.2', 
});

// client.on('error', (err) => console.log('Redis Client Error', err));

// -------- Health check for Redis ----------
const redisCheck = async () => {
  let write;
  let read;
  await client.connect();
  try {
    write = await client.set('ping', 'pong');
    read = await client.get('ping');
  } catch (err) {
    console.error(`Redis health check failed, error ${err}`);
  }
  return { write, read };
};

// Health check route
const router = express.Router();

router.get('/health', async (req, res) => {
  // ------- Setup initial value and Health check for Barker ------
  // If the route works, Barker is up
  const status = {
    app: 'UP',
    redis: { write: null, read: null },
  };

  // --------- Function calls ---------
  status.redis = await redisCheck();

  // -------- Log status according to healthiness --------
  console.log(JSON.stringify(status));
  res.send(status);
});

export default router;
