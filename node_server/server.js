const express = require('express');
const app = express();
const connected = require('./config/db');
// const { httpServer, io } = require("./config/socket");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const path = require("path");
const OrderController = require("./controller/order");
const CustomerRoutes = require('./routes/customer');
const CategoryRoutes = require('./routes/category');
const inventoryRoutes = require("./routes/inventory");
const deliveryRoutes = require("./routes/delivery");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const client = require("./config/redis");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))
app.get("/", (req, res) => {
    res.send("hello")
})
console.log(__dirname)
app.use('/customer/', CustomerRoutes);
app.use("/category/", CategoryRoutes);
app.use("/products/", inventoryRoutes);
app.use("/delivery/", deliveryRoutes);
app.use("/order/", orderRoutes);
app.use("/cart/", cartRoutes);

//connecting to redis cache
client.on("connect", (err, data) => {
    if (err) {
        return console.log(err)
    }
    console.log("connected to redis")
})



//socket.io events
io.on("connection", socket => {
    console.log(socket.id)
    io.emit("hello", { msg: "hello world" })

    //when client add new order
    socket.on("addOrder", (data) => {
        OrderController.addOrder(data).then(result => {
            if (result.status) {
                //if successfully added to db then send to admin panel
                io.emit("newOrder", result.newEntry)
                //affirming on client side
                return socket.emit("orderAdded", result)
            }
            else {
                //sending error to client-side
                socket.emit("orderError", result)
            }

        }).catch(err => {
            console.log(err)
        })
    })
    //order will be edited from api and if api return true then listen this notification
    socket.on("orderEdit", (id) => {
        //sending admin side
        io.emit("edited", { id })
    })
    //order cancelled from api and if done then listen this notification
    socket.on("cancelOrder", (id) => {
        //sending to admin side
        io.emit("cancelled", { id })
    })
})

//server listening
if (connected) {
    httpServer.listen(3000, () => {
        console.log("server connected");
    })
}
else {
    console.log("check database");
}