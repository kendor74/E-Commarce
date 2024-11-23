const { check } = require('express-validator');
const validationMiddleWare = require('../../middelWare/validationMiddleWare');

// Validator for fetching a category by ID
exports.getCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Category ID'),
    validationMiddleWare
];

// Validator for creating a new category
exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters long')
        .isLength({ max: 32 })
        .withMessage('Category name must not exceed 50 characters'),
    validationMiddleWare
];

// Validator for updating a category by ID
exports.updateCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Category ID'),
    check('name')
        .optional() // Name is optional in updates
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters long')
        .isLength({ max: 50 })
        .withMessage('Category name must not exceed 50 characters'),
    validationMiddleWare
];

// Validator for deleting a category by ID
exports.deleteCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Category ID'),
    validationMiddleWare
];