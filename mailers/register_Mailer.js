const nodemailer=require('../config/nodeMailer'); 

// another way of eporting the method
exports.newUser=(user)=>{
    console.log('new comment generated');
    //sendmail is predefine function
    nodemailer.transpoter.sendMail({
      from:'Codeial@gmail.com',
      to:user.email, // sending to the person whos commented
      subject:"New User",
      html:`<h1>Hi ${user.name} Welcome To ContactSaver</h1>`
    },(error,info)=>{
        if(error){
            console.log(error,'error in sending the mail');
            return;
        }
        console.log("Mail Delivered");
        return;
    });
}