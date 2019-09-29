var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var middleware = require('./middleware')
var db = require('./db');
var app = express();
var resources = require('./resources')

//socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

//io.on('connection',function(socket){
//    console.log('connected to socket')
//    socket.on('msg',function(data){
//        io.emit('msg',data);
//    });
//    
//    io.emit('connected', 'socket')
//
//    
//});


//app.use(function(req, res, next){
// res.io = io;
// next();
//});


//db()

middleware(app)

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(resources);


//app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  next(createError(404));
//});
//
//
//// error handler
//app.use(function(err, req, res, next) {
//  // set locals, only providing error in development
//  res.locals.message = err.message;
//  res.locals.error = req.app.get('env') === 'development' ? err : {};
//  // render the error page
//  res.status(err.status || 500);
//  //res.render('error');
//    //res.sendStatus(err.status);
//});

module.exports = {app:app,server:server};
