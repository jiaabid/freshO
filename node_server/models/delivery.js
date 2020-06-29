const mongoose = require('mongoose');
const order = require("./order");
const DeliveryTrackSchema = mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "orders"
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }

});

DeliveryTrackSchema.pre("save", async function (next) {
    try {
        const orderExist = await order.findOne({ _id: this.order_id });
        if (!orderExist)
            return next(new Error("such item doesnot exist"));
        orderExist.status = "delivered";
        await orderExist.save();
        next();
    } catch (err) {
        next(err);
    }
})
const deliveryTrack = mongoose.model("deliveryTrack", DeliveryTrackSchema);
module.exports = deliveryTrack;