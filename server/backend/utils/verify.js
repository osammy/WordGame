var User = require('../resources/users/users.model');
var jwt = require('jsonwebtoken');//used to create, sign, and verify token
const express = require('express')
const app = express();
const env = app.get('env');
const handleError = require('./handleError');

let config;

if(env === 'production') {
    config = process.env.SECRET_VARIABLES
}
else if(env === 'development') {
    config = require('../config');
}


exports.getToken = function(user,expiresIn) {
    var secret = toString(config.SECRET_KEY); // secret must be either a string or a buffer
    return jwt.sign(user, secret,{
        expiresIn
    });
};

exports.verifyOrdinaryUser = function(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //Note that if undefined is sent as a header from the frontend, it will appear as a string in req.headers hence
    //doing the condition if(token) will not be sufficiant as 'undefined' being a strin here will return true hence 
    //we also have to make sure token !== 'undefined'

   //decode token
    var secret = toString(config.SECRET_KEY); //secret must be a string or a buffer otherwise the json.verify() function will fail, and it may not tell you that this is the reason.
    if(token && token !== 'undefined') {

        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                var err = new Error('you are not authenticated!');
                err.status = 401;
                return next(err);
            } else {

                if(decoded.permissions.length === 0) return handleError(res,403,"You are not authorised to gain access to the application")
                req.decoded = decoded;
                next();
            }

        });
    } else {
        var err = new Error('No token provided');
        err.status = 403;
        handleError(res,403,'No token provided')
        next(err);
    }

}

exports.verifyGlobalAdminUser = function(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

   //decode token
    var secret = toString(config.SECRET_KEY); //secret must be a string or a buffer otherwise the json.verify() function will fail, and it may not tell you that this is the reason.
    if(token) {
        jwt.verify(token, secret, function(err, decoded) {

            if(err) {
                var err = new Error('you are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                //if everything is good, save to request for use in other routes
                if(!decoded.global_admin) {
                    const err = new Error('You are not a global admin');
                    err.status = 401
                    return next(err)
                }
                req.decoded = decoded;
                next();
            }

        });
    } else {
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }

}

exports.verifyUserEmail = function(req,res,next) {
    var token = req.params.token

   //decode token
    var secret = toString(config.SECRET_KEY); //secret must be a string or a buffer otherwise the json.verify() function will fail, and it may not tell you that this is the reason.
    if(token) {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                var err = new Error('you are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                //if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }

        });
    } else {
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }

}



exports.verifyAdminUser = function(req,res,next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

   //decode token
    var secret = toString(config.secretKey); //secret must be a string or a buffer otherwise the json.verify() function will fail, and it may not tell you that this is the reason.
    if(token) {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                var err = new Error('you are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                //if everything is good, save to request for use in other routes
                if(!decoded.admin) {
                    return next(new Error('This is forbidden, for non admins'))
                }
                req.decoded = decoded;
                next();
            }

        });
    } else {
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }


}

exports.verifyToken = function(req,res,next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

   //decode token
    var secret = toString(config.secretKey); //secret must be a string or a buffer otherwise the json.verify() function will fail, and it may not tell you that this is the reason.
    if(token) {
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                var err = new Error('you are not authorized to perform this operation!');
                err.status = 401;
                return next(err);
            } else {
                //if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }

        });
    } else {
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }


}


