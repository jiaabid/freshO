const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const CustomerSchema = mongoose.Schema({
    method: {
        type: String,
        required: true,
        default: "jwt"
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
    },
    jwt: {
        email: {
            type: String
        },
        password: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        mail: {
            type: String
        }
    }
    ,
    address: {
        type: String
    },
    city: {
        type: String
    },
    tokens: [
        { token: String }
    ],
    coupons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"coupon"
        }
    ]
});
CustomerSchema.pre('save', async function (next) {
    try {
        console.log(this)
        if (this.method == "jwt") {
            if (this.isModified("jwt.password")) {
                this.jwt.password = await bcrypt.hash(this.jwt.password, 10);
                return next();
            }
        }
        next();
    } catch (err) {
        next(err);
    }
});

CustomerSchema.statics.findCredentials = async (email, password) => {
    try {
        const person = await customer.findOne({ "jwt.email": email });
        console.log(person)
        if (!person) {
            return console.log("Invalid Email , Retry!");
        }
        console.log(person.jwt.password)
        const same = await bcrypt.compare(password, person.jwt.password)
        console.log(same)
        if (!same) {
            return console.log("Invalid Password!");
        }
        console.log(person)
        return person;
    }
    catch (err) {
        return err;
    }
}
// CustomerSchema.virtual("order", {
//     ref: "orders",
//     localField: "_id",
//     foreignField: "cust_id"
// })
//token generator remaining
CustomerSchema.methods.myToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id.toString() }, "freshO");
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) {
        return err
    }
}
//limiting data
CustomerSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
}
const customer = mongoose.model("customers", CustomerSchema);
module.exports = customer;