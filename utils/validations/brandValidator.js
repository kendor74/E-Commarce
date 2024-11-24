const {check} = require('express-validator');
const validationMiddleWare = require('../../middelWare/validationMiddleWare');


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
    
    validationMiddleWare    
]


exports.updateBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('name is required'),
    validationMiddleWare
];


exports.deleteBrandValidator = [
    check('id')
        .isMongoId()
        .withMessage('This Id is in valid'),
    validationMiddleWare
];