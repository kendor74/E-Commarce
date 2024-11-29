const SubCategory = require('../model/subCategoryModel');
const handlerFactory = require('./handlerFactory');

// Middleware to create filter object for querying SubCategories based on category
exports.createFilterObject = (req, res, next) => {
    let filterObject = {};
    if (req.params.categoryId) {
        filterObject = {
            category: req.params.categoryId
        };
    }
    req.filterObject = filterObject;
    next();
};

// Get All SubCategories - Using the handler factory for the generic function
exports.getAll = handlerFactory.getAllModels(SubCategory);

// Get a specific SubCategory by ID - Using the handler factory for the generic function
exports.getSubCategory = handlerFactory.getModel(SubCategory);

// Create a new SubCategory - Using the handler factory for the generic function
exports.createSubCategory = handlerFactory.create(SubCategory);

// Update an existing SubCategory - Using the handler factory for the generic function
exports.updateSubCategory = handlerFactory.update(SubCategory);

// Delete a SubCategory - Using the handler factory for the generic function
exports.deleteSubCategory = handlerFactory.delete(SubCategory);
