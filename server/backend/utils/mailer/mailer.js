var nodemailer = require('nodemailer');
var app = require('express')();
var mailerUtil = require('./mailer-util');
const mailgunTransport = require('nodemailer-mailgun-transport');
const env = app.get('env');



const config = (env === 'production')? JSON.parse(process.env.MAILGUN_VARIABLES): require('../../config');

const {mailgun_api_key,adenison_mail_domain} = config;
const mailgunOptions = {
  auth: {
    api_key:mailgun_api_key,
    domain: adenison_mail_domain,
  }
}


const transportInfo = mailgunTransport(mailgunOptions)


function sendEmail(userInfo,mail_purpose,subject,id,useful_data) {
    
    
    const transport = nodemailer.createTransport(transportInfo);

    const mailOptions = mailerUtil(userInfo,mail_purpose,subject,id,useful_data);

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return;            
        }
        console.log(info)
        console.log(info.message);
    });
}

module.exports = sendEmail;