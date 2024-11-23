const express = require('express');
const router = express.Router();
const subCategoryService = require('../Services/subCategoryService');
const subCategoryValidator = require('../utils/validations/subCategoryValidator');
// Get All Categories (specific route comes first)
router.get('/all', subCategoryService.getAll);

// Create a Category
router.post(
    //Route
    '/create',
    //Middelware for Validation
    subCategoryValidator.createSubCategoryValidator,
    //Service    
    subCategoryService.createSubCategory);

// Get a Category by ID
router.get(
    // Route
    '/:id', 
    //Middleware for Validation
    subCategoryValidator.getSubCategoryValidator,    
    //Service
    subCategoryService.getSubCategory);

// Update a Category by ID
router.put(    
    // Route
    '/:id', 
    subCategoryValidator.updateSubCategoryValidator,    
    //Service
    subCategoryService.updateSubCategory);

// Delete a Category by ID
router.delete(    
    // Route
    '/:id', 
    //Middleware for Validation
    subCategoryValidator.deleteSubCategoryValidator,    
    //Service
    subCategoryService.deleteSubCategory);

module.exports = router;
