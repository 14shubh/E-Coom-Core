const mongoose = require('mongoose');
const subCategorySchema = new mongoose.Schema({
    SubCategoryName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    CategoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

module.exports = mongoose.model('SubCategory', subCategorySchema);