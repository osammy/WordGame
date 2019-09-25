var mongoose = require('mongoose');
const express = require('express')
const app = express();
//const mongoPassword = 'samorai11';

module.exports = function () {

        const environment = app.get('env');
    let url = 'mongodb://localhost:27017/wordgame'

    if(environment === 'production') {
         const config = JSON.parse(process.env.APP_CONFIG);
         const mongoPassword = (JSON.parse(process.env.SECRET_VARIABLES)).MONGO_PASSWORD;
         url =     "mongodb://" + config.mongo.user + ":" + encodeURIComponent(mongoPassword) + "@" + config.mongo.hostString;  
    }

    mongoose.connect(url,  { useNewUrlParser: true },function(){
        console.log("connected to database");
    })

    
}