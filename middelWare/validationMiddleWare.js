const { validationResult } = require('express-validator');

const validatorMiddelWare = (req, res, next) => {
    const errors = validationResult(req);
    
    // Check if there are validation errors
    if (!errors.isEmpty()) {
        // Map through the error array to provide detailed feedback
        const formattedErrors = errors.array().map(error => ({
            field: error.param,  // The name of the field that failed validation
            message: error.msg,   // The error message explaining why it failed
            value: error.value,   // The value that was submitted for the field
            location: error.location || 'body', // The location of the parameter (default is body)
            // You can add additional properties like `type`, `nestedErrors`, etc. based on your use case
        }));

        // Return detailed error response with request data for debugging
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: formattedErrors,
            requestBody: req.body, // Optionally include the body to help debug
        });
    }
    
    next(); // Proceed to the next middleware/controller if no validation errors
};

module.exports = validatorMiddelWare;
