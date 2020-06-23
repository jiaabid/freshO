const jwt = require("jsonwebtoken");
const user = require("../models/customer");

const authentication = async (req, res, next) => {
    try {
        const token = req.query.token;
        const decode = jwt.verify(token, "freshO")
        const verfied = await user.findOne({ _id: decode._id, "tokens.token": token })
        if (user) {
            req.user = verfied
            req.token = token
            return next();
        }
        throw new Error("Invalid")
    } catch (err) {
        next(err);
    }
}
module.exports = authentication