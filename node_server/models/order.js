const mongoose = require('mongoose');
const { timeStamp } = require('console');
const OrderSchema = mongoose.Schema({
    products: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "products"
            },
            quantity: Number
        }
    ],
    cust_id: {
        type: mongoose.Schema.Types.ObjectId,
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
    },
    deliveryTime:"String",
    deliverBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"rider"
    }

}, { timestamps: true });
// OrderSchema.virtual("delivered", {
//     ref: "deliveryTrack",
//     localField: "_id",
//     foreignField: "order_id"
// })
const order = mongoose.model('orders', OrderSchema);
module.exports = order;