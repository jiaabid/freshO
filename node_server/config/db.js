const mongoose = require('mongoose')
try{
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