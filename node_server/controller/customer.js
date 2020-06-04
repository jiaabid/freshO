const customer = require('../models/customer');

const signUp = async (req, res) => {
    try {
        const existedCustomer = await customer.findOne({ email: req.body.email });
        console.log(existedCustomer)
        if (existedCustomer) {
            return res.status(200).json("this account already exist");

        }
        const newCustomer = new customer(req.body);
        await newCustomer.save();
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
            throw new Error("No such user");
        res.status(200).json(isCustomer);
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

module.exports = { signUp, login };