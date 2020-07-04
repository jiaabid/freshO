const auth = require("../middleware/auth");
const router = require("express").Router();
const controller = require("../controller/cart");
const express = require("express")



router.post("/add",controller.addToCart);
router.get("/",controller.myCart)
router.delete("/dlt",controller.dltCart)
router.delete("/dltItem",controller.dltItem)
module.exports = router;
