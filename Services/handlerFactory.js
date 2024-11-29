const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/ApiFeatures');

// Create a new model
exports.create = (Model) => 
    asyncHandler(async (req, res) => {
        // Create a new instance of the model with the request body
        const newModel = await Model.create(req.body);

        // Return success message and the newly created model
        res.status(200).json({
            message: 'Model Created Successfully!',
            data: newModel
        });
    });

// Delete a model by ID
exports.delete = (Model) =>
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        // Attempt to find and delete the model by its ID
        const model = await Model.findByIdAndDelete(id);

        // If model is not found, return an error
        if (!model) {
            return ApiError(`Model not found for ID: ${id}`, 404);
        }

        // Return success message and deleted model data
        res.status(200).json({
            message: 'Deleted Successfully',
            data: model
        });
    });

// Update a model by ID
exports.update = (Model) =>
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        // Attempt to find and update the model with the provided data
        const updatedModel = await Model.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true } // Return the updated model instead of the original
        );

        // If model is not found, return an error
        if (!updatedModel) {
            return next(new ApiError(`Model not found for ID: ${id}`, 404));
        }

        // Return success message and the updated model data
        res.status(200).json({
            message: 'Update Successful',
            data: updatedModel
        });
    });

// Get a single model by ID
exports.getOneModel = (Model) =>
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        // Attempt to find the model by its ID
        const model = await Model.findById(id);

        // If model is not found, return an error
        if (!model) {
            return next(new ApiError(`Model not found for ID: ${id}`, 404));
        }

        // Return the model data
        res.status(200).json({
            data: model
        });
    });

// Get all models with pagination, filtering, and sorting
exports.getAllModels = (Model) =>
    asyncHandler(async (req, res) => {
        let filterObject = {};

        // If a filter object exists, use it for filtering the query
        if (req.filterObject) {
            filterObject = req.filterObject;
        }

        // Get the total count of models
        const count = await Model.countDocuments();

        // Apply API features for pagination, sorting, filtering, and searching
        const apiFeatures = new ApiFeatures(Model.find(filterObject), req.query)
            .page(count) // Pagination
            .sort()      // Sorting
            .filter()    // Filtering
            .search()    // Searching
            .limitFields(); // Limit fields

        const { mongoseQuery, paginationResult } = apiFeatures;

        // Execute the query to get the models
        const models = await mongoseQuery;

        // Return the results, including pagination data
        res.status(200).json({
            success: true,
            length: models.length,
            paginationResult: paginationResult,
            data: models
        });
    });

// Get a single model by ID with error handling
exports.getModel = (Model) =>
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        // Attempt to find the model by its ID
        const model = await Model.findById(id);

        // If model is not found, return an error
        if (!model) {
            return next(new ApiError(`Model not found for ID: ${id}`, 404));
        }

        // Return the model data
        res.status(200).json({
            data: model
        });
    });
