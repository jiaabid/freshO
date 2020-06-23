const express = require('express');
const app = express();
const connected = require('./config/db');
const CustomerRoutes = require('./routes/customer');
const CategoryRoutes = require('./routes/category');
const inventoryRoutes = require("./routes/inventory");
const deliveryRoutes = require("./routes/delivery");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const client = require("./config/redis");
app.use(express.json());

app.use('/customer/', CustomerRoutes);
app.use("/category/", CategoryRoutes);
app.use("/products/", inventoryRoutes);
app.use("/delivery/", deliveryRoutes);
app.use("/order/",orderRoutes);
app.use("/cart/",cartRoutes);

//connecting to redis cache
client.on("connect",(err,data)=>{
    if(err){
        return console.log(err)
    }
    console.log("connected to redis")
})

if (connected) {
    app.listen(3000, () => {
        console.log("server connected");
    })
}
else {
    console.log("check database");
}