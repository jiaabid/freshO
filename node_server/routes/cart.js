const auth = require("../middleware/auth");
const router = require("express").Router();
const controller = require("../controller/cart");
const express = require("express")
const auth = require("../middleware/auth")


router.post("/add",auth,controller.addToCart);
router.get("/",auth,controller.myCart)
router.delete("/dlt",auth,controller.dltCart)
router.delete("/dltItem",auth,controller.dltItem)
module.exports = router;
