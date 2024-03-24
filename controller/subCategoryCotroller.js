const subCategoryModel = require("../models/subCategoryModel");
const category = require('../models/categoryModal');
const { default: mongoose, isObjectIdOrHexString } = require("mongoose");

// add update sub category
exports.saveUpdateSubCategory = (request, response, next) => {
    category.findById(request.body.CategoryId).then(data => {
        if (data != null) {
            if (request.body.id != null) {
                subCategoryModel.findById({ _id: request.body.id }).then((data) => {
                    subCategoryModel.updateOne({ _id: request.body.id }, {
                        $set: {
                            SubCategoryName: request.body.SubCategoryName,
                            CategoryId: request.body.CategoryId ? request.body.CategoryId : data.CategoryId
                        }
                    }).then((data) => {
                        if (data.modifiedCount) {
                            return response.status(200).json({
                                message: "Sub category successfully updated"
                            })
                        } else {
                            return response.status(200).json({
                                message: "Sub category not updated"
                            })
                        }
                    }).catch((error) => {
                        return response.status(500).json({
                            error: "Something went wrong",
                            data: error
                        })
                    })
                }).catch((error) => {
                    return response.status(500).json({
                        error: "Something went wrong",
                        data: error
                    })
                })

            } else {
                subCategoryModel.find({ SubCategoryName: request.body.SubCategoryName.toLowerCase() }).then(data => {
                    if (data.length == 0) {
                        const subCategoryData = new subCategoryModel();
                        subCategoryData.SubCategoryName = request.body.SubCategoryName.toLowerCase();
                        subCategoryData.CategoryId = request.body.CategoryId;

                        subCategoryData.save().then(data => {
                            return response.status(200).json({
                                result: data,
                                message: "Sub category successfully added"
                            })
                        }).catch(error => {
                            return response.status(501).json({
                                result: error,
                                errorMessage: "Something went wrong"
                            })
                        })
                    } else {
                        return response.status(200).json({
                            errorMessage: "Sub category must be unique"
                        })
                    }
                }).catch(error => {
                    return response.status(502).json({
                        result: error,
                        errorMessage: "Something went wrong"
                    })
                })
            }
        } else {
            return response.status(503).json({
                errorMessage: "Category not found"
            })
        }
    }).catch(error => {
        return response.status(500).json({
            error: "Something went wrong",
            data: error
        })
    })
}

// Get all sub Category
exports.getAllSubCategory = (request, response, next) => {
    subCategoryModel.find().then(data => {
        return response.status(201).json({ result: data });
    }).catch(error => {
        return response.status(500).json({
            message: "Something wrong",
            error: error
        })
    });
}

// get sub category by id
exports.getSubCategoryById = (request, response, next) => {
    subCategoryModel.findById({ _id: request.params.id }).then(data => {
        return response.status(200).json({
            result: data,
        })
    }).catch(error => {
        return response.status(500).json({
            result: error,
            errorMessage: "Something went wrong"
        })
    })
}

// get sub category by Category id
exports.getSubCategoryByCategoryId = (request, response, next) => {
    subCategoryModel.find({ CategoryId: request.params.categoryId }).populate('CategoryId').then(data => {
        console.log(data)
        return response.status(200).json({
            result: data,
        })
    }).catch(error => {
        return response.status(500).json({
            result: error,
            errorMessage: "Something went wrong"
        })
    })
}

// delete sub category
exports.deleteSubCategory = (request, response, next) => {
    subCategoryModel.deleteOne({ _id: request.params.id }).then(data => {
        if (data.deletedCount > 0) {
            return response.status(200).json({
                result: data,
                message: "Sub Category deleted"
            })
        } else {
            return response.status(200).json({
                result: data,
                message: "Sub Category not found"
            })
        }
    }).catch(error => {
        return response.status(500).json({
            result: error,
            errorMessage: "Something went wrong"
        })
    })
}