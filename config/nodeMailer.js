const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();
//First we need to define the transpoter it is the object attached with nodemailer
let transpoter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: 'false',
    auth: {   // establish the identity so that gmail tracks the identity
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

//second define that we use ejs and a template rendring engine
let renderTemplate = (data, relative) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relative),
        data,
        function (error, template) {
            if (error) {
                console.log(error);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports={
    transpoter:transpoter,
    renderTemplate:renderTemplate
}