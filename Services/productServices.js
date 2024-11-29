const Product = require('../model/productModel');
const handlerFactory = require('./handlerFactory');

// Get All Products - Using the handler factory for the generic function
exports.getProducts = handlerFactory.getAllModels(Product);

// Get a specific Product by ID - Using the handler factory for the generic function
exports.getProduct = handlerFactory.getModel(Product);

// Create a new Product - Using the handler factory for the generic function
exports.createProduct = handlerFactory.create(Product);

// Update an existing Product - Using the handler factory for the generic function
exports.updateProduct = handlerFactory.update(Product);

// Delete a Product - Using the handler factory for the generic function
exports.deleteProduct = handlerFactory.delete(Product);
