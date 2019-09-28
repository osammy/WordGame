const express = require('express');
const router = express.Router();
// const authControllerGenerator = require('../../utils/authenticationController');
const controller = require('./users.controller');
// var user = require('./users.model');
// const authController = authControllerGenerator(user);
const Verify = require('../../utils/verify');
// const generalController = generalController(user)

//const capitalize = (s) => {
//  if (typeof s !== 'string') return ''
//  return s.charAt(0).toUpperCase() + s.slice(1)
//}
//
//capitalize('flavio') //'Flavio'
//capitalize('f')      //'F'
//capitalize(0)        //''
//capitalize({})       //''

router.route('/')
    .get(Verify.verifyOrdinaryUser,controller.getAll)


module.exports = router;

