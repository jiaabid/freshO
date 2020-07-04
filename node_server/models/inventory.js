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
    prod_id:{
        type:String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    cat_id: {
        type: String,
        required: true,
        ref: "category"
    },
    imgUrl:{
        type:String,
    }
})

const category = mongoose.model("category", CategorySchema);
const product = mongoose.model("products", productSchema);
module.exports = { category, product };