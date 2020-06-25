const coupon = require("../models/coupon");

const addCoupon = async (req, res) => {
    try {
        const exist = await coupon.findOne({ coupon_campaigm: req.body.coupon_campaign })
        if (exist)
            return res.status(400).json({ msg: "Already exist" });
        const newCoupon = new coupon(req.body);
        await newCoupon.save();
        res.status(201).json(newCoupon)
    } catch (err) {
        res.status(400).json(err)
    }
}

const sendCoupon = async (req, res) => {
    try {
z
    } catch (err) {

    }
}
