const verify_paystack_transaction = 'https://api.paystack.co/transaction/verify';
const BASE_URL = 'http://localhost:5000'
const available_licenses = "http://samotekmanager.eu-4.evennode.com/api/v1/licenses";
//const paymentsInManagerApp = "http://samotekmanager.eu-4.evennode.com/api/v1/payments_manager";
const manager_base_url = "http://samotekmanager.eu-4.evennode.com/api/v1";
const registeration = "http://samotekmanager.eu-4.evennode.com/api/v1/registeration"



module.exports = function(urlFor) {
    switch(urlFor) {

        case 'verify_paystack_transaction':
            return verify_paystack_transaction;
            
        case'BASE_URL':
            return BASE_URL;
            
        case 'available_licenses':
            return available_licenses;
//            
//        case 'payments':
//            return paymentsInManagerApp;
        
        case 'manager_base_url':
            return manager_base_url;
            
        case 'registeration':
            return registeration;
            


    }
}