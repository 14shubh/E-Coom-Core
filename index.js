const express = require('express');
const app = express();
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
const mongoose = require('mongoose');
const login = require('./routes/login');
const productCategory = require('./routes/productCategory');
const category = require('./routes/category');
const subCategory = require('./routes/subCategory');
mongoose.connect("mongodb+srv://shoppers:GoShoppers@shop-1.zhoamnx.mongodb.net/shop-1?retryWrites=true&w=majority").then(data => {
    app.listen(port, () => {
        app.use('/', login);
        //app.use('/Category',productCategory)
        app.use('/api/Category',category)
        app.use('/api/SubCategory',subCategory)
        console.log(`Server is running on port number ${port}`);
        console.log(`Database connected succesfully`);
    })
}).catch(err => {
    console.log(err);
})