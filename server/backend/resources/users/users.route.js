const express = require('express');
const router = express.Router();
const authControllerGenerator = require('../../utils/authenticationController');
const controller = require('./users.controller');
var user = require('./users.model');
const authController = authControllerGenerator(user);
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

router.route('/query')
      .get(Verify.verifyOrdinaryUser,controller.getOneFromQuery)

router.route('/register')
    .post(authController.register);

router.route('/login')
    .post(authController.login);

router.route('/sales_records')
    .get(Verify.verifyOrdinaryUser,controller.getSalesRecords);

router.route('/change_password')
    .post(Verify.verifyOrdinaryUser,controller.changePassword);

router.route('/forgot_password/:email')
    .get(controller.forgotPassword);

router.route('/:id')
      .get(Verify.verifyOrdinaryUser,controller.getOne)
      .put(Verify.verifyOrdinaryUser,controller.updateOne)

router.route('/:id/permissions/:permission')
      .delete(Verify.verifyOrdinaryUser,controller.deleteOnePermission)
      .put(Verify.verifyOrdinaryUser,controller.addOnePermission)

//router.route('/change_password')
//    .put(Verify.verifyToken, controller.changePassword)

//router.route('/reset/:email')
//      .get(controller.reset);


//router.route('/verify_email/:token')//here all users verify theri email
//    .get(Verify.verifyUserEmail,controller.verifyOneEmail)





// router.route('/login')
//     .post(controller.login)
module.exports = router;

