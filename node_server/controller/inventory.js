const { product } = require('../models/inventory');
const uploadProduct = async (req, res) => {
    try {
        const existeditem = await product.findOne({ product_name: req.body.product_name });
        // console.log(typeof existeditem);
        // console.log("hello");
        if (existeditem)
            return res.status(400).json("already exist");
            req.body.price = parseInt(req.body.price)
        const newItem = new product({ ...req.body, imgUrl: req.file.buffer });
        const { product_name, _id } = newItem
        // console.log(product_name.slice(0,4))
        // console.log(_id.toString().length,product_name.length)
        // console.log((Math.ceil(_id.toString().length/product_name.length)+2))
        newItem.prod_id = `${product_name.slice(0, 4)}00${_id.toString().slice(-(Math.ceil(_id.toString().length / product_name.length)))}${_id.toString().length + product_name.length}`
        await newItem.save();
        res.status(201).json(newItem);

    } catch (err) {
        res.status(400).json(err);
    }
}
const updateProduct = async (req, res) => {
    try {
        const itemExist = await product.findOne({ prod_id: req.query.id });
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
        const limit = 20;
        let items = [];
        const total = await product.countDocuments();
        if (total.length != 0) {
            const query = product.find({}).limit(limit).skip(page * limit);
            const pages = Math.ceil(total / limit);
            const filters = Object.keys(req.query);
            if (filters.length == 2) {
                items = await sortORcat(filters[1], req.query[filters[1]], query)
                //console.log(items)
                return res.status(200).json({
                    items,
                    pages
                })
            }
            else if (filters.length == 3) {
                items = await sortNDcat(req.query, query)
                return res.status(200).json({
                    items,
                    pages
                })

            }
            items = await query
            res.status(200).json({
                items, pages
            })
        }
        res.status(400).json("No item");

    } catch (err) {
        res.status(400).json(err);
    }
}
const sortORcat = function (field, val, query) {
    // console.log(field, val, query)
    if (field == "sort")
        return query.sort({ price: val }).select("product_name cat_id price");
    else if (field == "cat")
        return query.where({ cat_id: val }).select("product_name cat_id price");
}
const sortNDcat = function (field, query) {
    //console.log(field["cat"])
    //.select("product_name cat_id price")
    return query.where({ cat_id: field["cat"] }).sort({ price: field["sort"] }).select("product_name cat_id price");
}
module.exports = { uploadProduct, updateProduct, dltProduct, products };