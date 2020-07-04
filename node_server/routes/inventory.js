const router = require("express").Router();
const controller = require("../controller/inventory");
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
router.get("/search",controller.postSearch);
router.get("/editproduct", controller.editProduct);

router.post("/uploadItem", upload.single("image"), controller.uploadProduct);
router.post("/updateItem", controller.updateProduct);
router.delete("/dltItem", controller.dltProduct);

//route used in customer view
router.get("/items", controller.products);
module.exports = router
