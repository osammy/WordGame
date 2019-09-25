const template = require('./mail-template')
module.exports = function(userInfo,mail_purpose,subject,id,useful_data) {
            
let  mailOptions = {
    from: 'Adenison postmaster@support.adenison.ng',
    to: userInfo.email,
    subject,
    html: template(userInfo,mail_purpose,id,useful_data)
};
            
return mailOptions;

}