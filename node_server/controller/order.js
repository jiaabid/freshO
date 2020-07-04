const order = require("../models/order");

const addOrder = async (newOrder) => {
    try {
        console.log(newOrder)
        const item = new order(newOrder);
        if (!item)
            return { status: false, err: "error!" };
        await item.save();
        return { status: true, newEntry: item };
    } catch (err) {
        return { status: false, err };
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
const specificOrder = async(req,res)=>{
    try{

    }catch(err){
        
    }
}
const date = new Date()
const updateOrder = async (req, res) => {
    try {

        const exist = await order.findById({ _id: req.query.id });
        if (exist && exist["cust_id"] == req.body["cust_id"]) {
            if (checkTime(exist.createdAt)) {
                const changes = Object.keys(req.body);
                changes.forEach(change => exist[change] = req.body[change]);
                await exist.save();
                return res.status(200).json(exist);
            } else {
                res.status(400).json("Only change within 10 minutes");
            }
        }
        res.status(404).json("Not Found");
    } catch (err) {
        res.status(400).json(err)
    }
}
const checkTime = (createdAt) => {
    const placedTime = new Date(createdAt).getTime();
    const changeTime = date.getTime()
    const diff = Math.floor((changeTime - placedTime) / 1000 / 60);
    if (diff <= 10)
        return true
    return false

}
const cancelOrder = async (req, res) => {
    try {
        const orderExist = await order.findById(req.body.id);
        if (orderExist) {
            if (orderExist["status"] == "delivered")
                return res.status(400).json("cant cancel now it is delivered");
            if (checkTime(orderExist.createdAt)) {

                await orderExist.remove();
                return res.status(200).json("order canceled");
            } else {
                return res.status(400).json("You can cancel within 10 minutes")
            }
        }
        res.status(404).json("No such order");
    } catch (err) {
        res.status(400).json(err);
    }
}
const changeStatus = async (body) => {
    try {
        const updateIt = await order.updateOne({ _id: body.id }, { $set: { status: body.status, deliverBy: body.d_id } })
        if (updateIt)
            return true
        return false
    } catch (err) {
        return false
    }
}

module.exports = { addOrder }