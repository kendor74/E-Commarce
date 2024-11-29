const Category = require('../model/categoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/ApiFeatures');
const handlerFactory = require('./handlerFactory');

// Get All Categories - Using the handler factory for the generic function
exports.getAll = handlerFactory.getAllModels(Category);

// Get a specific Category by ID - Using the handler factory for the generic function
exports.getCategory = handlerFactory.getModel(Category);

// Create a Category - Using the handler factory for the generic function
exports.createCategory = handlerFactory.create(Category);

// Update a Category - Using the handler factory for the generic function
exports.updateCategory = handlerFactory.update(Category);

// Delete a Category - Using the handler factory for the generic function
exports.deleteCategory = handlerFactory.delete(Category);

// If you need to export individual methods (optional)
// module.exports = {
//     createCategory,
//     getAll,
// };
