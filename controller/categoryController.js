const categoryModel = require('../models/categoryModal');

// Get all list of Category Type
exports.getAllCategory = (request, response, next) => {
    categoryModel.find().then(data=>{
        return response.status(201).json({result:data});
    }).catch(error=>{
        return response.status(500).json({
            message: "Something wrong",
            error: error
        })
    });
}

// Get category by id
exports.getCategoryById = (request, response, next) => {
    categoryModel.findById(request.params.id).then(data=>{
        return response.status(201).json({
            result: data
        })
    }).catch(error=>{
        return response.status(201).json({
            message: "Category not found",
            error: data
        })
    });
}

// Save and update category type
exports.saveUpdateCategory = (request, response, next) => {
    const category = new categoryModel();

    if (request.params.id != null || request.params.id != undefined) {
        categoryModel.updateOne({ _id: request.params.id },{
            $set:{
                CategoryName: request.body.CategoryName
            }
        }).then(data => {
            if(data.modifiedCount){
                return response.status(201).json({
                    message: "Category updated successfully",
                    result: data
                })
            }else{
                return response.status(201).json({
                    message: "Cannot find category type",
                    result: data
                })
            }
        }).catch(error => {
            return response.status(201).json({
                message: "Something Wrong",
                result: error
            })
        });
    } else {
        category.CategoryName = request.body.CategoryName;
        categoryModel.exists({CategoryName: request.body.CategoryName}).collation({locale: 'en', strength: 2}).then(data=>{
            if(data != null || data != undefined){
                return response.status(201).json({
                    message: "Category already added"
                });
            }else{
                category.save().then(data => {
                    return response.status(201).json({
                        message: "Category added successfully",
                        result: data
                    });
                }).catch(error => {
                    return response.status(500).json({
                        message: "Something worng",
                        result: error
                    })
                });
            }
        }).catch(error=>{
            return response.status(500).json({
                message: "Something worng",
                result: error
            })
        })
        
    }

}

// delete category by id
exports.deleteCategory = (request, response, next) => {
    const categoryId = request.params.id;
    categoryModel.deleteOne({_id: categoryId}).then(data=>{
        if(data.deletedCount){
            return response.status(201).json({
                message: "Category deleted successfully"
            })
        }
    }).catch(error=>{
        return response.status(500).json({
            message: "Category not found",
            result: error
        })
    })
}