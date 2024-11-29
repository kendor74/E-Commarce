const Brand = require('../model/brandsModel');
const slugify = require('slugify');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler');
const ApiFeatures = require('../utils/ApiFeatures');
const handlerFactory = require('./handlerFactory');

// Get All Brands - Using the handler factory for the generic function
exports.getAll = handlerFactory.getAllModels(Brand);

// Get a specific Brand by ID - Using the handler factory for the generic function
exports.getBrand = handlerFactory.getModel(Brand);

// Create a new Brand - Using the handler factory for the generic function
exports.createBrand = handlerFactory.create(Brand);

// Update an existing Brand - Using the handler factory for the generic function
exports.updateBrand = handlerFactory.update(Brand);

// Delete a Brand - Using the handler factory for the generic function
exports.deleteBrand = handlerFactory.delete(Brand);
