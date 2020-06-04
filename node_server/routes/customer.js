const router = require("express").Router();
const controller = require("../controller/customer");

//for customer interface **not authenticated
router.post("/signUp",controller.signUp);

router.post("/login",controller.login);

module.exports = router