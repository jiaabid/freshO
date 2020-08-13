const router = require("express").Router();
const controller = require("../controller/category");
const auth = require("../middleware/auth")

//for admin interface
router.post("/addItem",auth,controller.addCat);
router.delete("/dltItem",auth,controller.dltItem);

//for customer interface
router.get("/items",auth,controller.getItems);
router.get("/categoryNames",auth, controller.categoryName)


module.exports = router