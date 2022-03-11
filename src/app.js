import express from 'express';
import bodyParser from 'body-parser';
import { test } from './queues/test.queue.js';
import { router } from 'bull-board';
import health from './routes/health.js';
const app = express();

app.use(health);

app.use(bodyParser.json());

app.use('/admin/queues', router);

app.get('/test', async (req, res) => {
    const { message, ...restBody } = req.body;
    console.log('/test');
    await test({
        foo: 'bar'
    });
    res.send({ status: 'ok' });
});

app.listen(5000, () => console.log('App running on port 5000'));