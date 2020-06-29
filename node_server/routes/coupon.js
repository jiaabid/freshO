const router = require("express").Router()
const controller = require("../controller/coupon");

router.post("/add",controller.addCoupon);
router.post("/send",controller.sendCoupon);

module.exports = router;