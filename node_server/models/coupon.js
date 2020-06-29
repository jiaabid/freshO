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
    start_date: String,
    end_date: String,
    status: {
        type: String,
        default: "active"
    }
});
const couponGivenSchema = mongoose.Schema({
    coupon_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "coupon"
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "customers"
    },
    avail: {
        type: Boolean,
        default: false
    },
    avail_date: {
        type: Date
    }
});
const coupon_tracker = mongoose.model("couponTracker", couponGivenSchema)
const coupon = mongoose.model("coupon", couponSchema)
module.exports = { coupon, coupon_tracker }