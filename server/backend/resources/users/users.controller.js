var generateController = require("../../utils/generateController");
var userModel = require("./users.model");
// var getSecretKey = require("../../utils/getSecretKey");
// const handleError = require("../../utils/handleError");
// const sendMail = require("../../utils/mailer/mailer");
// const passport = require("passport");
// const verify = require("../../utils/verify");
// const mongoose = require("mongoose");


function generateRandomPassword(n) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < n; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = generateController(userModel, {});
