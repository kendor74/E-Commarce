const brandServices = require('../Services/brandServices')
const brandValidation = require('../utils/validations/brandValidator')
const express = require('express');
const router = express.Router();


router.get(
    //Route
    '/all',
    //Service
    brandServices.getAll
);

router.get(
    //Route
    '/:id',
    //Middleware for Validation
    brandValidation.getBrandValidator,
    //Service
    brandServices.getBrand
);


router.post(
    //Route
    '/create',
    //Middelware for Validation
    brandValidation.createBrandValidator,
    //Service
    brandServices.createBrand
);

router.put(
    //Route
    '/:id',
    //Middleware for Validation
    brandValidation.updateBrandValidator,
    //Service
    brandServices.updateBrand
);


router.delete(
    //Route
    '/:id',
    //Middleware for Validation
    brandValidation.deleteBrandValidator,
    //Service
    brandServices.deleteBrand
)


module.exports = router;