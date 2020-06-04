const router = require("express").Router();
const controller = require("../controller/delivery");

//for admin interface
router.post("/addEntry",controller.addDelivery);
//retrieving left

module.exports = router;