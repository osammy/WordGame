var generateController = require('../../utils/generateController');
var userModel = require('./users.model');
var PackagesModal = require('../packages/packages.model')
var getSecretKey = require('../../utils/getSecretKey');
const handleError = require('../../utils/handleError')
const sendMail = require('../../utils/mailer/mailer')
const passport = require('passport')
const verify = require('../../utils/verify');
//const createError = require('http-errors');
const mongoose = require('mongoose');
const asynchronous = require('async');


function generateRandomPassword(n) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < n; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//overriding the getOne generate controller function with a function that will be 
//called upon verification of account from email link

const getUsers = ()=>{
    return new Promise((resolve,reject)=>{
        
        userModel.find({},function(err,users) {
            if(err) return reject(err);
            resolve(users)
        })
    })
}

const getUserSalesRecordAmount = (PackagesModal,queryParms,attendants_fullname)=>{

    return new Promise((resolve,reject)=>{
        
        const {startDate,endDate,attendantId} = queryParms;
        
        //The aggregate method used below requires that all mongoose id be strictly of type "object"
        const attendant = mongoose.Types.ObjectId(attendantId);
        //the aggregate method used below requires that all mongoose date types be used strictly in "object" form
        const query = {created_at:{$gte:new Date(startDate),$lt:new Date(endDate)},attendant};
        
        PackagesModal.aggregate([{$match:query},
                            {
                                $group:{
                                    _id:attendant,
                                    total:{
                                        $sum:"$total"   
                                    }
                                }
                            }
                    ],function(err,doc){
                        if(err) return reject(err);
                        resolve(doc)
                        
                    })
    })
}

function validateAuthorization (new_permission,theUser,yourUserData) {
    let allowUpdate;
    switch(new_permission) {
        case 'staff':
            allowUpdate = yourUserData.permissions.some(el => ( (el === "hub_manager") || (el === "executive" ) || (el === "ceo") ));
            let highest_permission = "";
            const hub_manager = yourUserData.permissions.some(el => el === "hub_manager" );
            const executive = yourUserData.permissions.some(el => el === "executive" );
            const ceo = yourUserData.permissions.some(el => el === "ceo" );
            if(hub_manager) highest_permission = "hub_manager";
            if(executive) highest_permission = "executive";
            if(ceo) highest_permission = "ceo"
            
            if(highest_permission === "hub_manager") {
                if(theUser.hub != yourUserData.hub ) allowUpdate = false;
            }
            console.log("one ",allowUpdate);
            return allowUpdate;
            
        case 'hub_manager':
            allowUpdate = yourUserData.permissions.some(el => ( (el === "executive") || (el === "ceo" ) ));
            console.log("two ",allowUpdate);
            return allowUpdate;
            
        case 'executive':
            allowUpdate = yourUserData.permissions.some(el => el === "ceo"  );
            console.log("three ",allowUpdate);
            return allowUpdate;
            
        default:
            return false;
            
    }
}

module.exports = generateController(userModel,{

    getOneFromQuery:function(req,res,next) {
        const query = req.query;
        userModel.findOne(query)
                 .populate('hub operation zone')
                 .exec(function(err,users){
                    if(err) return next(err);
                    res.json(users)
        })
    },
    
    getAll:function(req,res,next) {
                userModel.find({})
                 .populate('hub')
                 .exec(function(err,users){
                    if(err) return next(err);
                    if(users.length === 0) return handleError(res,404,"No users registered in the database");
                    res.json(users)
        })
    },
    
    changePassword:function(req,res,next) {
        
        const {email} = req.decoded;

        userModel.findOne({email},function(err,user){
            if(err) return next(err);
            
            const {old_password,password} = req.body;
            console.log("in change pwd")
            
            user.changePassword(old_password,password, function(err){
                if(err) return next(err);
                console.log("password changed")
                res.sendStatus(200)
            })
            
        })
    },
    
    forgotPassword: function(req,res,next) {
        const {email} = req.params;
        const body = {email};
        
        
        userModel.findOne(body, function(err,user){
            if(err) return next(err);
            if(user === null) return handleError(res,'404','No user with this email is registerd in the database');
            
//            const email = req.params.email;
//            const query = {email};
            const password = generateRandomPassword(8);
            const data = {email,password};
            user.setPassword(password).then(function(err){
                user.save();
                sendMail(body,"Forgot password","Your password has been reset",null,data)
                res.sendStatus(200)
            })
             

        })
    },
    
    deleteOnePermission:function(req,res,next) {
        console.log("in the route")
        const {id,permission} = req.params;
        
        userModel.findById(id, function(err,user){
            const shouldAllow = validateAuthorization(permission,user,(req.decoded));
            if(!shouldAllow) return handleError(res,403,"You dont have the required permission level to delete this permission")
            const usersPermissions = user.permissions;
            const new_permissions = usersPermissions.filter(el => el !== permission );
            user.permissions = new_permissions
            user.save(function(err,user){
                if(err) return next(err);
                console.log(user)
                
                res.json(user)
            })
            
        })
    },
        addOnePermission:function(req,res,next) {

        const {id,permission} = req.params;
            
            if(permission === "") return handleError(res,400,"Please select a permission to add")

        
        userModel.findById(id, function(err,user){
            const shouldAllow = validateAuthorization(permission,user,(req.decoded));
            if(!shouldAllow) return handleError(res,403,"You dont have the required permission level to add this permission")
            const found = user.permissions.find(el => el === permission);
            if(found) return handleError(res,400,"This user alreaddy has this permission level");
            user.permissions.push(permission);
            user.save(function(err,user){
                if(err) return next(err);

                res.json(user)
            })
            
        })
    },
    
    getSalesRecords:function(req,res,next) {
        
        var allUsers = [];
        const {startDate,endDate} = req.query;
        let queryParameters = {startDate,endDate}
        let packageQueries = [];
           getUsers()
            .then(function(staffs) {
            allUsers = staffs;
            staffs.forEach(function(eachStaff){
//            let staff = {...eachStaff};
            const attendantId = eachStaff._id;
            queryParameters = {...queryParameters,attendantId};
            let attendants_fullname = eachStaff.first_name + " "+  eachStaff.last_name;
            packageQueries.push(getUserSalesRecordAmount(PackagesModal,queryParameters,attendants_fullname));
            
        })
        return Promise.all(packageQueries)

    }).then(function(records){
               const formattedRecords = {};
               const buff = [];
               const allStaffs = [...allUsers];
//                console.log( records)

               
               for(let i=0;i<records.length;i++) {
                   let record = records[i][0];
                   if(record) buff.push(record);
                   else buff.push({_id:null,total:0})
               }
//               console.log(buff)
               for(let j = 0;j<allStaffs.length;j++) {
                   let full_name = allStaffs[j].first_name + " " + allStaffs[j].last_name;
                   let found = buff.find(el=> String(el._id) === String(allStaffs[j]._id));
//                   console.log( found)
                   if(found) formattedRecords[full_name] = found.total;
                   else formattedRecords[full_name] = 0;
               }

        res.json(formattedRecords)
    })
    .catch(function(err){
        console.log(err);
        handleError(res,500,"some error occured")
    })
    }
    
}
);