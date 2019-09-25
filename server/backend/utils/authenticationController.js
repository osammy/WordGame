const passport = require('passport')
const Verify = require('./verify')
const sendMail = require('./mailer/mailer');
const handleError = require('./handleError')
const Registeration = require('../resources/registeration/registeration.model');
const getUrl = require('./getUrl');
const request = require('request-promise');


//sendMail(demoUser,"Shipment successful receipt","Thank you for using Adenison Logistics",extra_data);

function verifyRegisteration(id) {
    console.log("verifying details")
    return new Promise((resolve,reject)=>{
        
        const options = {
            method: 'GET',
            uri:getUrl('registeration') +"/"+id,
            header:{'Content-Type': 'application/json'},
            json: true,
        }
        
        console.log(options)
        
        
        request(options).then(function(response){
            console.log("gotten registeration");
            
            let isFound = true;
            let isExpired =  false;
            let isAccountsUsedUp = false;

            const {expiry_date,max_accounts,accounts_used} = response;
//            console.log("expiry_date: ",expiry_date);
//            console.log("Todat",+new Date())
            if(Number(expiry_date) < +new Date()) isExpired = true; 
            
            if(accounts_used >= max_accounts) isAccountsUsedUp = true;
            
            let obj = {isFound,isExpired,isAccountsUsedUp}
            resolve(obj);
        })
        .catch(function(err){
            console.log("Failed to get registeration");
            reject(err)
        })

    })
}

module.exports =  function (User) {

    return {
        login: function (req, res, next) {
//            res.json(req.body)
            const {registeration} = req.body;
//            verifyRegisteration(registeration)
            console.log("trying to login")
            verifyRegisteration(registeration)
            .then(function(response){
                console.log("Verified details")
                const {isExpired,isFound,isAccountsUsedUp} = response;
                
                if(!isFound) return handleError(res,403,"The license entered does not exist");
                if(isExpired) return handleError(res,403,"Your license to use this product has expired, please contact support");
                if(isAccountsUsedUp) return handleError(res,403,"You have used up all accounts for this product");
                
            passport.authenticate('local', function (err, user, info) {
            if (err) return next(err);
            console.log("logged in user")
            if (!user) return handleError(res,404,"This user is not registered on our database");
                
            req.logIn(user, function (err) {
                    if (err) {
                        console.log(err)
                        const message = "Could not log in the user"
                        return handleError(res,500,message)
                    }
                    
                    if(user.permissions.length === 0) return handleError(res,403,"You are not authorised to access this application")
                       
                        const {email,_id,permissions, first_name, last_name, phone, operation, hub, zone} = user;
                        const theUser = {email,_id,permissions, first_name, last_name, phone, operation, hub, zone};
                        const token = Verify.getToken(theUser,(3600*24));
                        theUser.token = token;
//                console.log(theUser)
                        res.json(theUser);                        
         
                });
            })(req, res, next); 
                
            })
            .catch(function(err){
                return next(err);
            })
        },

        register: function (req, res, next) {
//            console.log('in user route')
            
            const {email,first_name,last_name,phone,operation,position,hub,zone,registeration} = req.body;
            
            verifyRegisteration(registeration)
            .then(function(response){

                const {isExpired,isFound,isAccountsUsedUp} = response;
                
                if(!isFound) return handleError(res,403,"The license entered does not exist");
                if(isExpired) return handleError(res,403,"Your license to use this product has expired, please contact support");
                if(isAccountsUsedUp) return handleError(res,403,"You have used up all accounts for this product");
                
                User.register(
                    new User({email,first_name,last_name,phone,operation,position,hub,zone,registeration}),
                    req.body.password, function (err, user) {                
                        if (err) return next(err);
                        if (!user) return next(err);
                    
                        passport.authenticate("local")(req, res, function () {
                            res.json({status:'success'});
                        });
                    });   
            })
            .catch(function(err){
                return next(err);
            })
        }
    }

}