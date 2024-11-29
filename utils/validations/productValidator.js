const { check, body } = require('express-validator');
const validationMiddleWare = require('../../middelWare/validationMiddleWare');
const Category = require('../../model/categoryModel');
const SubCategory = require('../../model/subCategoryModel');
const slugify = require('slugify');

exports.getProductValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Product ID'),
    validationMiddleWare,
];

exports.createProductValidation = [
    check('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters'),
    
    body('title').custom((value, {req}) =>{
        req.body.slug = slugify(value);
        return true;
    }),
    check('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 20 })
        .withMessage('Description must be at least 20 characters long'),

    check('quantity')
        .notEmpty()
        .withMessage('Quantity is required')
        .isInt({ gt: 0 })
        .withMessage('Quantity must be a positive integer'),

    check('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),

    check('priceAfterDiscount')
        .optional()
        .isFloat({ gt: 0 })
        .withMessage('Price after discount must be a positive number')
        .custom((value, { req }) => {
            if (value >= req.body.price) {
                throw new Error('Price after discount must be less than the original price');
            }
            return true;
        }),

    check('colors')
        .optional()
        .isArray()
        .withMessage('Colors must be an array of strings'),

    check('imageCover')
        .notEmpty()
        .withMessage('Image cover is required'),

    check('image')
        .optional()
        .isArray()
        .withMessage('Images must be an array of strings'),

    check('category')
        .notEmpty()
        .withMessage('Category is required')
        .isMongoId()
        .withMessage('Invalid Category ID')
        .custom((categoryId) => 
            Category.findById(categoryId).then((category) => {
                if (!category){
                    return Promise.reject(
                        new Error(`Invalid Category Id: ${categoryId}`)
                    );
                }
            })
        ),

    check('subCategory')
        .optional()
        .isArray()
        .withMessage('SubCategory must be an array')
        .custom((subCategories) => 
            SubCategory.find({_id: {$exists: true, $in: subCategories}})
            .then((result)=>{
                if(result.length !== subCategories.length){
                    return Promise.reject(new Error(`Invalid Sub Category Ids`));
                }
            })
        ),

    check('brand')
        .optional()
        .isMongoId()
        .withMessage('Invalid Brand ID'),

    check('rattingsAvarage')
        .optional()
        .isFloat({ min: 1, max: 5 })
        .withMessage('Ratings average must be between 1 and 5'),

    check('rattingQuantity')
        .optional()
        .isLength({ min: 0 })
        .withMessage('Rating quantity must be a non-negative integer')
        .isLength({ max: 5 })
        .withMessage('Rating quantity must be a less than or = 5'),

    validationMiddleWare,
];

exports.updateProductValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Product ID'),
    
    check('title')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters'),
    body('title').custom((value, { req }) => {
        if (value && typeof value === 'string') {
            // Create slug and attach it to the request body
            req.body.slug = slugify(value, { lower: true });
        }
        return true; // Validation passed
    }),
    
    
    check('description')
        .optional()
        .isLength({ min: 20 })
        .withMessage('Description must be at least 20 characters long'),

    check('quantity')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Quantity must be a positive integer'),

    check('price')
        .optional()
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),

    check('priceAfterDiscount')
        .optional()
        .isFloat({ gt: 0 })
        .withMessage('Price after discount must be a positive number')
        .custom((value, { req }) => {
            if (req.body.price && value >= req.body.price) {
                throw new Error('Price after discount must be less than the original price');
            }
            return true;
        }),

    check('category')
        .optional()
        .isMongoId()
        .withMessage('Invalid Category ID')
        .custom((categoryId) =>
            Category.findById(categoryId).then((category) => {
                if (!category){
                    return Promise.reject(new Error(`Invalid Category Id: ${categoryId}`));
                }
            })
        ),

    check('subCategory')
        .optional()
        .isArray()
        .withMessage('SubCategory must be an array')
        .custom((subCategories) => 
            SubCategory.find({_id: {$exists: true, $in: subCategories}})
            .then((result)=>{
                console.log(result.length);
                if(result.length !== subCategories.length){
                    return Promise.reject(new Error(`Invalid Sub Category Ids`));
                }
            })
        ),

    check('brand')
        .optional()
        .isMongoId()
        .withMessage('Invalid Brand ID'),

    validationMiddleWare,
];

exports.deleteProductValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Product ID'),
    validationMiddleWare,
];
