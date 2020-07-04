const redis = require("../config/redis");
const { json } = require("body-parser");

const addToCart = (req, res) => {
    console.log("add to cart")
    console.log(req.query.id);
    //req.query.id will be the user id returned at the time of login

    //req.body.cart should be like this

    // const cart = [{ _id: "potatoe", price: 20, quantity: 1 },
    // { _id: "tomatoe", price: 50, quantity: 2 },
    // { _id: "capsicum", price: 60, quantity: 3 }]
    if (req.query.id !== null) {
        redis.hmset(req.query.id, [req.body.id, JSON.stringify(req.body.detail)], (err, reply) => {
            console.log(reply)
            if (!err)
                return res.status(201).send(reply)
            console.log("added");
            res.send(err)

        })
    } else {
        res.send("cant add!")
    }

}
const myCart = (req, res) => {
    //the user id (req.query.id)

    let totalPrice = 0
    if (req.query.id !== null) {
        redis.hgetall(req.query.id, (err, data) => {
            console.log(data + "data")
            if (!err)
                if (data !== null) {
                    Object.values(data).forEach(item => {
                        totalPrice += JSON.parse(item)["price"]
                    })

                    return res.json({ data, totalPrice })

                }
           return res.json({err})
        })
    } else {
        res.send("nothing in the cart")
    }

}
//new
const dltItem = (req,res)=>{
    const newCart = {}
    redis.hdel(req.query.id,req.body.item_id,(err,data)=>{
        if(!err && data !== null)
        return res.status(200).json({data});
        return res.status(400).json("error in removing")
    })
}

const dltCart = (req, res) => {
    if (req.query.id !== null) {
        redis.del(req.query.id, (err, reply) => {
            if (!err)
                return res.status(200).json(reply)
            res.status(400).send(err)
        })
    } else {
        res.send("error")
    }
}
module.exports = { addToCart, myCart, dltCart,dltItem }