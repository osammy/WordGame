const express = require('express');
const app = express();
const env = app.get('env');


if(env === 'production') {
    config = JSON.parse(process.env.SECRET_VARIABLES);    

}
else if(env === 'development') {
    config = require('../config');
}



function getSecretkey(config) {
    return function(key) {
        let SECRET_KEY;
        switch(key) {
            case 'SECRET_KEY':
            SECRET_KEY = config.SECRET_KEY;
            break;

            case 'PAYSTACK_SECRET_KEY':
            SECRET_KEY = config.PAYSTACK_SECRET_KEY;
            break;

        }
        return SECRET_KEY;
    }
}

module.exports = getSecretkey(config)