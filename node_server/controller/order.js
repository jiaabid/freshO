const order = require("../models/order");

const addOrder = async (req, res) => {
    try {
        const item = new order(req.body);
        if (!item)
            return res.status(400).json();
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json(err);
    }
}

const allOrders = async (req, res) => {
    try {
        const page = req.query.page || 0;
        const limit = 25;
        const total = await order.countDocuments();
        if (total.length != 0) {
            const items = await order.find().limit(limit).skip(page * limit);
            return res.status(200).json({
                items,
                pages: Math.ceil(total / limit)
            });
        }
        res.status(400).json();
    } catch (err) {
        res.status(400).json(err);
    }
}

const updateOrder = async (req, res) => {
    try {
        const exist = await order.findById({ _id: req.query.id });
        if (exist && exist["cust_id"] == req.body["cust_id"]) {
            const changes = Object.keys(req.body);
            changes.forEach(change => exist[change] = req.body[change]);
            await exist.save();
            return res.status(200).json(exist);
        }
        res.status(404).json("Not Found");
    } catch (err) {
        res.status(400).json(err)
    }
}
const cancelOrder = async (req, res) => {
    try {
        const orderExist = await order.findById(req.body.id);
        if (orderExist) {
            if (orderExist["status"] == "delivered")
                return res.status(400).json("cant cancel now it is delivered");
            await orderExist.remove();
            return res.status(200).json("order canceled");
        }
        res.status(404).json("No such order");
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {addOrder,allOrders,updateOrder,cancelOrder}