// setting up the queue -> queue is the list of similar jobs like all emails , all otp notifiactions  can be putted in one array
const kue=require('kue');
const queue=kue.createQueue();
module.exports=queue;