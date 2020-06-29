const mongoose = require("mongoose");
const { time } = require("console");
const { Timestamp } = require("bson");
const settingSchema = mongoose.Schema({
    store_open: String,
    store_close: String,
    tax: Number,
    discount: Number,
    deliveryCharge: Number
});
console.log(Timestamp);
const setting = mongoose.model("settings", settingSchema);
module.exports = setting;