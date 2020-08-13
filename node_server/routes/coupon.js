const router = require("express").Router()
const controller = require("../controller/coupon");
const auth = require("../middleware/auth")

router.post("/add",auth,controller.addCoupon);
router.post("/send",auth,controller.sendCoupon);

module.exports = router;