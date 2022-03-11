import express from 'express';
import bodyParser from 'body-parser';
import { test } from './queues/test.queue.js';
import { router } from 'bull-board';
import health from './routes/health.js';
import { send } from './send.js';
import { receive } from './receive.js';
const app = express();

app.use(health);

app.use(bodyParser.json());

app.use('/admin/queues', router);

// receive();

app.get('/bull', async (req, res) => {
    console.log('/bull');
    await test({ foo: 'bar' });
    res.send({ status: 'ok' });
});

app.get('/rabbit', async (req, res) => {
    console.log('/rabbit');
    await send({ foo: 'bar' })
    res.send({ status: 'ok' });
});

app.listen(5000, () => console.log('App running on port 5000'));