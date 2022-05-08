const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripeApi,
} = require("../controller/paymentController");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);

module.exports = router;
