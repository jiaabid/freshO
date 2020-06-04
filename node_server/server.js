const express = require('express');
const app = express();
const connected = require('./config/db');
const CustomerRoutes = require('./routes/customer');
const CategoryRoutes = require('./routes/category');
const inventoryRoutes = require("./routes/inventory");
const deliveryRoutes = require("./routes/delivery");
const orderRoutes = require("./routes/order");

app.use(express.json());

app.use('/customer/', CustomerRoutes);
app.use("/category/", CategoryRoutes);
app.use("/products/", inventoryRoutes);
app.use("/delivery/", deliveryRoutes);
app.use("/order/",orderRoutes);

if (connected) {
    app.listen(3000, () => {
        console.log("server connected");
    })
}
else {
    console.log("check database");
}