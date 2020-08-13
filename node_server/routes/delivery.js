const router = require("express").Router();
const controller = require("../controller/delivery");
const auth = require("../middleware/auth")

//for admin interface
router.post("/addEntry",auth,controller.addDelivery);
//retrieving left

module.exports = router;