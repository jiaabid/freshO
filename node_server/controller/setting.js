const setting = require("../models/settings");
const { object } = require("../config/redis");

const newSetting = async (req, res) => {
    try {
        const set = new setting(req.body);
        if (!set)
            return res.status(400).json("It doesn't exist");
        await set.save();
        res.status(201).json(set);
    } catch (err) {
        res.status(400).json(err);
    }
}

const updateSetting = async (req, res) => {
    try {
        const exist = await setting.findOne({ _id: req.body.id });
        if (!exist)
            return res.status(400).json("Error!");
        const keys = Object.keys(req.body.changes);
        keys.forEach(key => {
            exist[key] = req.body.changes[key]
        });
        await exist.save();
        res.status(200).json("updated");
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = { newSetting, updateSetting }