const { check } = require('express-validator');
const validationMiddleWare = require('../../middelWare/validationMiddleWare');

// Validator for fetching a category by ID
exports.getSubCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Category ID'),
    validationMiddleWare
];

// Validator for creating a new category
exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters long')
        .isLength({ max: 32 })
        .withMessage('Category name must not exceed 50 characters'),
    check('category')
        .notEmpty()
        .isMongoId()
        .withMessage('Category Id is not valid'),
    validationMiddleWare
];

// Validator for updating a category by ID
exports.updateSubCategoryValidator = [
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
exports.deleteSubCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Category ID'),
    validationMiddleWare
];
