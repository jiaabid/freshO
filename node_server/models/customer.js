const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: [
        { type: String }
    ]
});
CustomerSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

CustomerSchema.statics.findCredentials = async (email, password) => {
    try {
        const person = await customer.findOne({ email });
        if (!person) {
            throw new Error("Invalid Email , Retry!");
        }
        const same = await bcrypt.compare(password, person.password)
        console.log(same)
        if (!same) {
            throw new Error("Invalid Password!");
        }
        console.log(person)
        return person;
    }
    catch (err) {
        return err;
    }
}
//token generator remaining
//limiting data
CustomerSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
}
const customer = mongoose.model("customers", CustomerSchema);
module.exports = customer;