const {check, body} = require('express-validator');
const validationMiddleWare = require('../../middelWare/validationMiddleWare');
const slugify = require('slugify');


exports.getBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage('This Id is in valid '),
    validationMiddleWare
]


exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('name is required'),
    body('name').custom((value, {req}) =>{
        req.body.slug = slugify(value)
        return true;
    }),  
    validationMiddleWare    
]


exports.updateBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage('This ID is not valid'),
    check('name')
        .notEmpty()
        .withMessage('Name is required'),
    body('name').custom((value, { req }) => {
        if (value && typeof value === 'string') {
            // Create slug and attach it to the request body
            req.body.slug = slugify(value, { lower: true });
        }
        return true; // Validation passed
    }),
    validationMiddleWare
];


exports.deleteBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage('This Id is in valid'),
    validationMiddleWare
];