const express = require('express')
const users = require('./users/users.route');
const operations = require('./operations/operations.route')
const hubs = require('./hubs/hubs.route');
const packages = require('./packages/packages.route');
const zones = require('./zones/zones.route');
const groups = require('./groups/groups.route');
const shippers = require('./shippers/shippers.route');
const discounts = require('./discounts/discounts.route')
const funds = require('./funds/funds.route');
const targets = require('./targets/targets.route');
const pricing = require('./pricing/pricing.route');
const paystack_webhook = require('../utils/paystack/paystack_webhook.route');
const verify_paystack_transaction = require('../utils/paystack/verify_transaction.route');
const initializeUser = require('../utils/initializeUser.route');
const registeration = require('./registeration/registeration.route')


var mainRouter  = express.Router();

mainRouter.use('/api/v1/users', users);
mainRouter.use('/api/v1/operations',operations)
mainRouter.use('/api/v1/hubs',hubs)
mainRouter.use('/api/v1/packages',packages);
mainRouter.use('/api/v1/zones',zones)
mainRouter.use('/api/v1/groups',groups)
mainRouter.use('/api/v1/shippers',shippers)
mainRouter.use('/api/v1/discounts',discounts)
mainRouter.use('/api/v1/funds',funds)
mainRouter.use('/api/v1/targets',targets);
mainRouter.use('/api/v1/pricing',pricing);
mainRouter.use('/api/v1/webhook',paystack_webhook);
mainRouter.use('/api/v1/verify_paystack_transaction',verify_paystack_transaction);
mainRouter.use('/api/v1/initialize_user',initializeUser);
mainRouter.use('/api/v1/registeration',registeration);


module.exports = mainRouter;