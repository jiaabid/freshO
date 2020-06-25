const router = require("express").Router();
const controller = require("../controller/customer");
const passport = require("passport")
require("../config/passport");
//for customer interface **not authenticated
router.post("/signUp",controller.signUp);
router.post("/login",controller.login);
//google signIn
router.get("/auth/google",passport.authenticate("google",{
    scope:["profile","email"]
}))
router.get("/auth/google/callback",passport.authenticate("google",{session:false}),controller.googleAuth)

module.exports = router