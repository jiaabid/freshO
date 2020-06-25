const mongoose = require("mongoose")
const couponSchema = mongoose.Schema({
    coupon_campaign: String,
    coupon_code: String,
    coupon_type: {
        type: String,
        default: "fixed"
    },
    usage_value: Number,
    order_limit: Number,
    start_date: Date,
    end_date: Date,
    status: {
        type: String,
        default: "active"
    }
});

const coupon = mongoose.model("coupon",couponSchema)
moudule.exports = coupon