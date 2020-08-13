const customer = require('../models/customer');

const signUp = async (req, res) => {
    try {
       
       
        const { jwt } = req.body;
        const existedCustomer = await customer.findOne({ email: jwt.email });
        console.log(existedCustomer)
        if (existedCustomer) {
            return res.status(200).json("this account already exist");

        }
        console.log("yes going")
        const newCustomer = new customer(req.body);
        await newCustomer.save();
        console.log(newCustomer + "cust")
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(400).json(err);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isCustomer = await customer.findCredentials(email, password);
        if (!isCustomer)
            return console.log("No such user");
        const token = await isCustomer.myToken();
        res.status(200).json({ id: isCustomer._id, token });
    } catch (err) {
        res.status(400).json(err);
    }
}

//myprofile
const myProfile = (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (err) {
        res.status(404).send(err);
    }
}
const googleAuth = async (req, res) => {
    try {
        console.log(req.user)
        const token = await req.user.myToken();
        res.send(token)
    } catch (err) {
        res.send(err)
    }
}
const checkCoupons = async (req, res) => {
    try {
        res.status(200).json({
            coupons: await customer.find().populate("coupons")
        })
    } catch (err) {
        res.status(400).json(err)
    }
}
module.exports = { signUp, login, googleAuth,checkCoupons };