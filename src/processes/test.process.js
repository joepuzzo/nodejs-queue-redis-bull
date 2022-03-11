const testProcess = async (job) => {
   console.log('ATTEMPTS', job.attemptsMade);
   if(job.attemptsMade < 2 ){
      throw new Error('Server is down');
   }
   console.log('Test process', job.data);
   return 'Wooo!!!';
};

export default testProcess;