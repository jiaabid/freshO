const router = require("express").Router();
const controller = require("../controller/category");

//for admin interface
router.post("/addItem",controller.addCat);
router.delete("/dltItem",controller.dltItem);

//for customer interface
router.get("/items",controller.getItems)

module.exports = router