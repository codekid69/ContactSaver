const queue=require('../config/kue');
const registerMailer=require('../mailers/register_Mailer');

// first argument is type of process
queue.process('register',function(job,done){
    console.log("emails worker is processing a job",job.data);
    registerMailer.newUser(job.data);
    done();

})