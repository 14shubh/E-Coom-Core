const express = require('express');
const route = express.Router();
const subCategory = require('../controller/subCategoryCotroller');

route.post('/saveSubCategory',subCategory.saveUpdateSubCategory);
route.post('/updateSubCategory/',subCategory.saveUpdateSubCategory);
route.get('/getAll',subCategory.getAllSubCategory);
route.get('/getSubCategory/:id',subCategory.getSubCategoryById);
route.get('/getSubCategoryByCategory/:categoryId',subCategory.getSubCategoryByCategoryId);
route.post('/deleteSubCategory/:id',subCategory.deleteSubCategory);
module.exports = route;