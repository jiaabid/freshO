const { product } = require('../models/inventory');
const uploadProduct = async (req, res) => {
    try {
        const existeditem = await product.findOne({ product_name: req.body.product_name });
        // console.log(typeof existeditem);
        // console.log("hello");
        if (existeditem)
        return res.status(400).json("already exist");
        const newItem = new product({ ...req.body, imgUrl: req.file.buffer });
        const { product_name, _id } = newItem
        // console.log(product_name.slice(0,4))
        // console.log(_id.toString().length,product_name.length)
        // console.log((Math.ceil(_id.toString().length/product_name.length)+2))
        newItem.prod_id = `${product_name.slice(0,4)}00${_id.toString().slice(-(Math.ceil(_id.toString().length / product_name.length)))}${_id.toString().length + product_name.length}`
        await newItem.save();
        res.status(201).json(newItem);

    } catch (err) {
        res.status(400).json(err);
    }
}
const updateProduct = async (req, res) => {
    try {
        const itemExist = await product.findOne({ _id: req.query.id });
        if (itemExist) {
            const itemKeys = Object.keys(req.body);
            itemKeys.forEach(key => itemExist[key] = req.body[key]);
            await itemExist.save();
            return res.status(200).json(itemExist);
        }
        return res.status(404).json("Not Found");
    } catch (err) {
        res.status(400).json(err);
    }
}

const dltProduct = async (req, res) => {
    try {
        const item = await product.findOne({ _id: req.query.id });
        if (!item)
            return res.status(404).json("Not Found");
        await item.remove();
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json(err);
    }
}

const products = async (req, res) => {
    try {
        const page = req.query.page || 0;
        const limit = 25;
        const total = await product.countDocuments();
        if (items.length != 0) {
            const items = await product.find({}).limit(limit).skip(page * limit);
            return res.status(200).json({
                items,
                pages: Math.ceil(total / limit)
            })
        }
        res.status(400).json("No item");

    } catch (err) {
        res.status(400).json(err);
    }
}
module.exports = { uploadProduct, updateProduct, dltProduct, products };