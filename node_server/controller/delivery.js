const deliveryTrack = require("../models/delivery");

const addDelivery = async (req, res) => {
    try {
        const date = new Date();
        console.log(date.now());
        const entryExist = await deliveryTrack.findOne({ order_id });
        if (!entryExist) {
            const entry = new deliveryTrack(req.body);
            await entry.save();
            return res.status(201).json(entry);
        }
        res.status(400).json("Already Exist");
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {addDelivery};