const auth = require("../middleware/auth");
const router = require("express").Router();
const controller = require("../controller/cart");
const express = require("express")



router.post("/add",auth,controller.addToCart);
router.get("/",controller.myCart)
router.delete("/dlt",controller.dltCart)
module.exports = router;
