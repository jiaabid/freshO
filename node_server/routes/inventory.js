const router = require("express").Router();
const controller = require("../controller/inventory");
const auth = require("../middleware/auth")
const multer = require("multer");
const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
            return cb(new Error("file format not support"))
        }
        cb(undefined, true)
    }
});


//routes for the admin view
router.get("/search",auth,controller.postSearch);
router.get("/editproduct", controller.editProduct);

router.post("/uploadItem",auth,  controller.uploadProduct);
router.patch("/updateItem",auth, controller.updateProduct);
router.delete("/dltItem",auth, controller.dltProduct);

//route used in customer view
router.get("/items",auth, controller.products);
module.exports = router
