const { category } = require("../models/inventory");


const addCat = async (req, res) => {
    try {
        const itemExist = await category.findOne(req.body);
        if (itemExist)
            throw new Error("item already exist");
        const newItem = new category(req.body);
        const { cat_name, _id } = newItem
        newItem.cat_id = `${cat_name.slice(0, 5)}${_id.toString().slice(0, cat_name.length)}`
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json(err)
    }
};
const getItems = async (req, res) => {
    try {
        let page = req.query.page || 0;
        const limit = 10;
        const totalItems = await category.countDocuments;
        if (totalItems.length != 0) {
            const items = await category.find()
                .limit(limit)
                .skip(limit * page);
            const totalPages = Math.ceil(totalItems / limit);
            return res.status(200).json({
                totalItems,
                totalPages
            })
        }
        res.status(404).json()

    } catch (err) {
        res.status(400).json(err)
    }
}
const dltItem = async (req, res) => {
    try {
        const item = await category.findOne(req.body);
        await item.remove();
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json();
    }
}

const categoryName = async(req, res, next) => {
    const categoryName = await category.find();
    console.log(categoryName);
    res.status(200).json({ categoryName});
}
module.exports = { addCat,getItems,dltItem, categoryName }