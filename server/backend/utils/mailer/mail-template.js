//const passwordReset = require('./templates/passwordReset/passwordReset');
const shipmentSuccessfulReceipt = require('./templates/shipmentSuccessfulReceipt/shipmentSuccessfulReceipt');
const forgotPassword = require('./templates/forgotPassword/forgotPassword');

//const donationMadeToYou = require('./templates/donationMadeToYou/donationMadeToYou');
const softwareRegisterationSuccessful = require('./templates/softwareRegisterationSuccessful/softwareRegisterationSuccessful');

//const notification = require('./templates/notification/notification')



module.exports = function (user,mail_purpose,id,useful_data ={}) {
    let template;
    
    
    switch (mail_purpose) {
        case 'Coporate Email Verification':          
            template = coporateEmailVerification(user,useful_data);
            break;

        case 'Forgot password':
            template = forgotPassword(useful_data);
            break;

        case 'Shipment successful receipt':
            template = shipmentSuccessfulReceipt(useful_data);
            break;

        case 'Donation made to you':
            template = donationMadeToYou(user,useful_data);
            break;
            
        case 'Software registeration succesful':
            template = softwareRegisterationSuccessful(useful_data);
            break;
            
        case 'Notification':
            template = notification(user,useful_data);
            break;
            

    }

    return template;

}