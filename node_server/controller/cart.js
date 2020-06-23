const redis = require("../config/redis");
const { json } = require("body-parser");

const addToCart = (req, res) => {
   //req.query.id will be the user id returned at the time of login
   
    //req.body.cart should be like this

    // const cart = [{ _id: "potatoe", price: 20, quantity: 1 },
    // { _id: "tomatoe", price: 50, quantity: 2 },
    // { _id: "capsicum", price: 60, quantity: 3 }]
    if(req.query.id !== null){
        redis.hmset(req.query.id, ["cart", JSON.stringify(req.body.cart)], (err, reply) => {
            if (!err)
                return res.status(201).send(reply)
            res.send(err)
    
        })
    }else{
        res.send("cant add!")
    }
    
}
const myCart = (req, res) => {
    //the user id
    const id = req.query.id
    console.log(id)
    if(req.query.id !== null){
        redis.hgetall(id, (err, data) => {
            console.log(data)
            if (!err)
                return res.send(JSON.parse(data.cart))
            res.send(err)
        })
    }else{
        res.send("nothing in the cart")
    }
    
}
const dltCart = (req,res)=>{
    if(req.query.id !== null){
        redis.del(req.query.id,(err,reply)=>{
            if(!err)
            return res.status(200).send(reply)
            res.status(400).send(err)
        })
    }else{
        res.send("error")
    }
}
module.exports = { addToCart, myCart,dltCart }