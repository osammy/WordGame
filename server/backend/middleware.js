var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const express = require('express');
//var favicon = require('serve-favicon');
var User = require('./resources/users/users.model')
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('cors') 

module.exports = function (app) {
    app.use(cors());
    app.use(express.static('reports'));
    app.use(express.static('public'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(passport.initialize());
    // passport.use(new LocalStrategy(User.authenticate()));
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    app.use(passport.session());
}