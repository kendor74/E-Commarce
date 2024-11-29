const productServices = require('../Services/productServices')
const productValidation = require('../utils/validations/productValidator')
const express = require('express');
const router = express.Router();


router.get(
    //Route
    '/all',
    //Service
    productServices.getProducts
);

router.get(
    //Route
    '/:id',
    //Middleware for Validation
    productValidation.getProductValidation,
    //Service
    productServices.getProduct
);


router.post(
    //Route
    '/create',
    //Middelware for Validation
    productValidation.createProductValidation,
    //Service
    productServices.createProduct
);

router.put(
    //Route
    '/:id',
    //Middleware for Validation
    productValidation.updateProductValidation,
    //Service
    productServices.updateProduct
);


router.delete(
    //Route
    '/:id',
    //Middleware for Validation
    productValidation.deleteProductValidation,
    //Service
    productServices.deleteProduct
)


module.exports = router;