const express = require('express');
const router = express.Router();
const categoryService = require('../Services/categoryService');
const categoryValidator = require('../utils/validations/categoryValidator');
// Get All Categories (specific route comes first)
router.get('/all', categoryService.getAll);

// Create a Category
router.post(
    //Route
    '/create',
    //Middelware for Validation
    categoryValidator.createCategoryValidator,
    //Service    
    categoryService.createCategory);

// Get a Category by ID
router.get(
    // Route
    '/:id', 
    //Middleware for Validation
    categoryValidator.getCategoryValidator,    
    //Service
    categoryService.getCategory);

// Update a Category by ID
router.put(    
    // Route
    '/:id', 
    categoryValidator.updateCategoryValidator,    
    //Service
    categoryService.updateCategory);

// Delete a Category by ID
router.delete(    
    // Route
    '/:id', 
    //Middleware for Validation
    categoryValidator.deleteCategoryValidator,    
    //Service
    categoryService.deleteCategory);

module.exports = router;
