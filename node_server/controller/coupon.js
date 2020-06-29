const { coupon, coupon_tracker } = require("../models/coupon");
const customer = require("../models/customer");
const e = require("express");
const { object } = require("../config/redis");
const addCoupon = async (req, res) => {
    try {
        const exist = await coupon.findOne({ coupon_campaign: req.body.coupon_campaign })
        if (exist)
            return res.status(400).json({ msg: "Already exist" });
        const newCoupon = new coupon(req.body);
        await newCoupon.save();
        res.status(201).json(newCoupon)
    } catch (err) {
        res.status(400).json(err)
    }
}
const updateCoupon = async (req, res) => {
    try {
        const updateKeys = Object.keys(req.body.changes);
        const couponExist = await coupon.findOne({ _id: req.body.id });
        if (!couponExist)
            return res.status(404).json("Does Not exist");
        updateKeys.forEach(key => {
            couponExist[key] = req.body.changes[key]
        })
        await couponExist.save();
        res.status(200).json(couponExist);
    } catch (err) {
        res.status(400).json(err);
    }
}

const dltCoupon = async (req, res) => {
    try {
        const coup = await coupon.deleteOne({ _id: req.body.id });
        if (!coup)
            return res.status(400).json("it doesnt exist");
        const customers = await customer.updateMany({}, { $pull: { coupons: coup._id } });
        res.status(200).json(coup);
    } catch (err) {
        res.status(400).json(err);
    }
}
const sendCoupon = async (req, res) => {
    try {
        const { coup_id } = req.body
        const list = await customer.find();
        list.forEach(async id => {
            await new coupon_tracker({
                customer_id: id,
                coupon_id: coup_id
            }).save();
            const update = await customer.updateOne({ _id: id },
                { $push: { coupons: coup_id } });

        });
        res.status(200).json("done")
    } catch (err) {
        res.status(400).json(err)
    }
}

const checkCoupon = async (req, res) => {
    try {
        const date = new Date()
        const couponExist = await coupon.findOne({ _id: coupon_id })
        if (!couponExist)
            return res.status(404).json("Coupon expired");
        if (date.toUTCString(couponExist.end_date) >= date.toUTCString(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)) {
            await removeCoupon(req.body);
            return res.status(400).json("it is expired")
        }
        else {
            await availed(req.body);;
            res.status(200).json("coupon availed");
        }
    } catch (err) {
        res.status(400).json(err);
    }
}
const availed = async (body) => {
    try {
        const date = new Date()
        const { coupon_id, customer_id } = body
        const entry = await coupon_tracker.updateOne({ coupon_id, customer_id }, {
            $set: {
                avail: true,
                avail_date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            }
        })
        if (!entry)
            return "cant avail";
        await removeCoupon(body);
        return;
    } catch (err) {
        return err
    }
}
const removeCoupon = async (body) => {
    const { coupon_id, customer_id } = body
    const custUpdate = await customer.updateOne({ _id: customer_id }, { $pull: { coupons: coupon_id } });
    return;
}
module.exports = { addCoupon, sendCoupon }