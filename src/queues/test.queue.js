import Queue from 'bull';
import testProcess from '../processes/test.process.js';
import {setQueues, BullAdapter} from 'bull-board';

// https://optimalbits.github.io/bull

const testQueue = new Queue('test', `redis://${process.env.REDIS_URL}`);

setQueues([
    new BullAdapter(testQueue)
]);

testQueue.process(testProcess);

const test = (data) => {
    console.log('Test add', data);
    testQueue.add(data, {
        attempts: 5
    });
};

export {
    test
}