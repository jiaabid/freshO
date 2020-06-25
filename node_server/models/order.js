const mongoose = require('mongoose');
const { timeStamp } = require('console');
const OrderSchema = mongoose.Schema({
    products: [
        {
            id: {
                type: String,
                required: true,
                ref: "products"
            },
            quantity: Number
        }
    ],
    cust_id: {
        type: String,
        required: true,
        ref: "custmomers"
    },
    tax: Number,
    discount: Number,
    bill: Number,
    subTotal: Number,
    status: {
        type: String,
        default: "recieved"
    }

}, { timestamps: true });
OrderSchema.virtual("delivered", {
    ref: "deliveryTrack",
    localField: "_id",
    foreignField: "order_id"
})
const order = mongoose.model('orders', OrderSchema);
module.exports = order;