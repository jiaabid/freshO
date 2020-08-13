const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');
const CategorySchema = mongoose.Schema({
    cat_id: {
        type: String,
    },
    cat_name: {
        type: String,
        required: true
    }
});

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    prod_id: {
        type: String
    },
    sale_price: {
        type: Number,
        required: true
    },
    cost_price: {
        type: Number,
        required: true
    },
    profit: {
        type: Number,
        default: function(){
            return this.sale_price-this.cost_price
        }
    },
    stock: {
        type: Number,
        required: true
    },
    cat_id: {
        type: String,
        required: true,
        ref: "category"
    },
    imgUrl: {
        type: String,
    }
})

const category = mongoose.model("category", CategorySchema);
const product = mongoose.model("products", productSchema);
module.exports = { category, product };