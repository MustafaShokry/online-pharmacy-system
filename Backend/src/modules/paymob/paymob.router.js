const express = require('express');
const {
    authenticatePaymob,
    createPayment,
    completePayment,
    handlePaymobWebhook
} = require('./paymob.controller.js');

const router = express.Router();

router.post('/authenticate', authenticatePaymob);
router.post('/create-payment', createPayment);
router.post('/complete-payment', completePayment);
router.route('/paymob-webhook')
    .post(handlePaymobWebhook)
    .get(handlePaymobWebhook);

module.exports = router;
