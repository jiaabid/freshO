const router = require("express").Router();
const controller = require("../controller/setting");

router.post("/new",controller.newSetting);
router.post("/update",controller.updateSetting);

module.exports = router;