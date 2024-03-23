const express = require('express');
const route = express.Router();
const category = require('../controller/categoryController');

route.post('/saveCategory',category.saveUpdateCategory);
route.post('/updateCategory/:id',category.saveUpdateCategory);
route.get('/getAll',category.getAllCategory);
route.get('/getCategory/:id',category.getCategoryById);
route.post('/deleteCategory/:id',category.deleteCategory);
module.exports = route;