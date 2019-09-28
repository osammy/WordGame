const express = require('express')
const users = require('./users/users.route');
const validateWord = require('../dictionary/dictionary.route')



var mainRouter  = express.Router();

mainRouter.use('/api/v1/users', users);
mainRouter.use('/api/v1/validate',validateWord)



module.exports = mainRouter;