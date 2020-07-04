const mongoose = require('mongoose')

try{
    // "mongodb://127.0.0.1:27017/freshO"
    //mongodb+srv://Sana:gomart@cluster0-3ecd7.mongodb.net/test
    mongoose.connect("mongodb+srv://Sana:gomart@cluster0-3ecd7.mongodb.net/test", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    return true    
}catch(err){
    return false
}