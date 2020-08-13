const router = require("express").Router();
const controller = require("../controller/order");
const auth = require("../middleware/auth")

//following 3 for customer interface
// router.post("/addToCart",auth,controller.addOrder);

// router.patch("/updateOrder",auth,controller.updateOrder);

// router.delete("/cancelOrder",controller.cancelOrder);


// //for admin interface
// router.get("/orders",controller.allOrders);

module.exports = router