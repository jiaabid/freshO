const router = require("express").Router();
const controller = require("../controller/setting");
const auth = require("../middleware/auth")

router.post("/new",auth,controller.newSetting);
router.post("/update",auth,controller.updateSetting);

module.exports = router;