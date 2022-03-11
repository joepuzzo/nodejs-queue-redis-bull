const testProcess = async (job) => {
   console.log('Test process', job.data);
   return 'Wooo!!!';
};

export default testProcess;