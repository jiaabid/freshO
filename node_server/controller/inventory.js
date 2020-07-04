const { product } = require('../models/inventory');
const uploadProduct = async (req, res) => {
    console.log("upload")
    const price = Number(req.body.price);
    console.log(price);
    const existeditem = await product.findOne({ product_name: req.body.product_name });
    if (existeditem)
    return res.status(400).send("already exist");
    // console.log(req.body);
    // const imagePath = req.body.file.path;
    // console.log(imagePath)
    // const newItem = new product({ ...req.body });
    // console.log(req.body.files[0].base64);
    console.log("picced")
    const newItem = new product({
        product_name: req.body.product_name,
        price: price,
        stock: req.body.stock,
        cat_id: req.body.option,
        imgUrl: req.body.files[0].base64
        

    })
    // console.log(newItem + "jkk");
    const { product_name, _id } = newItem
    // console.log(product_name.slice(0,4))
    // console.log(_id.toString().length,product_name.length)
    // console.log((Math.ceil(_id.toString().length/product_name.length)+2))
    newItem.prod_id = `${product_name.slice(0,4)}00${_id.toString().slice(-(Math.ceil(_id.toString().length / product_name.length)))}${_id.toString().length + product_name.length}`
    await newItem.save();
    res.status(200).send(newItem);

}
    // try {
    //     const existeditem = await product.findOne({ product_name: req.body.product_name });
    //     // console.log(typeof existeditem);
    //     // console.log("hello");
    //     if (existeditem)
    //         return res.status(400).json("already exist");
    //         req.body.price = parseInt(req.body.price)
    //     const newItem = new product({ ...req.body, imgUrl: req.file.buffer });
    //     const { product_name, _id } = newItem
    //     // console.log(product_name.slice(0,4))
    //     // console.log(_id.toString().length,product_name.length)
    //     // console.log((Math.ceil(_id.toString().length/product_name.length)+2))
    //     newItem.prod_id = `${product_name.slice(0, 4)}00${_id.toString().slice(-(Math.ceil(_id.toString().length / product_name.length)))}${_id.toString().length + product_name.length}`
    //     await newItem.save();
    //     res.status(201).json(newItem);

    // } catch (err) {
    //     res.status(400).json(err);
    // }

// const updateProduct = async (req, res) => {
//     try {
//         const itemExist = await product.findOne({ prod_id: req.query.id });
//         if (itemExist) {
//             const itemKeys = Object.keys(req.body);
//             itemKeys.forEach(key => itemExist[key] = req.body[key]);
//             await itemExist.save();
//             return res.status(200).json(itemExist);
//         }
//         return res.status(404).json("Not Found");
//     } catch (err) {
//         res.status(400).json(err);
//     }
// }

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
                console.log(items)
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
      //  res.status(400).json("No item");

    } catch (err) {
        console.log(err)
       // res.status(400).json(err);
    }
}
const sortORcat = function (field, val, query) {
    // console.log(field, val, query)
    if (field == "sort")
        return query.sort({ price: val }).select("product_name cat_id price imgUrl");
    else if (field == "cat")
        return query.where({ cat_id: val }).select("product_name cat_id price imgUrl");
}
const sortNDcat = function (field, query) {
    //console.log(field["cat"])
    //.select("product_name cat_id price")
    return query.where({ cat_id: field["cat"] }).sort({ price: field["sort"] }).select("product_name cat_id price imgUrl");
}

const updateProduct = async (req, res) => {
    try {
        console.log("update controller");
         console.log(req.query.id);
         product.findById({ _id: req.query.id}).then(data => {
           //  console.log(data);
             data.product_name = req.body.update.product_name;
             data.price = req.body.update.price;
             data.stock = req.body.update.stock;
             data.save();
             res.status(200).json(data)

         }).catch(err => {
             console.log(err)
         })
    } catch (err) {
        res.status(400).json(err);
    }
}

const postSearch = (req, res, next) => {
    const search = req.query.search;
    console.log(search);
    product.find({product_name: search}).then(result => {
     //    console.log(result);
     res.status(200).send(result)
    }).catch(err => {
        console.log(err);
        res.status(400).send(" Item Not Found");
    })
   
 }

 const editProduct = async(req, res, next) => {
    const id = req.query.id;
    console.log(id);
    product.findById({_id: id}).then(result => {
        //console.log(result);
        res.status(200).json({ result });
    }).catch(err => {
        console.log(err);
    })
}
module.exports = { uploadProduct, updateProduct, dltProduct, products, postSearch, editProduct };