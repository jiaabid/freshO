const mongoose = require('mongoose');
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
    date: {
        type: String,
        default: Date.now()
    },
    time:String,
    tax: Number,
    discount: Number,
    bill: Number,
    subTotal: Number,
    status:{
        type:String,
        default:"recieved"
    }

});

const order = mongoose.model('orders', OrderSchema);
module.exports = order;