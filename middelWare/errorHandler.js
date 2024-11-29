const errorHandler = ((err, req, res, next) => {
    // Default status code and status message
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Call respective error handling method depending on environment
    if (process.env.NODE_ENV === 'development') {
        devError(err, res);
    } else {
        prodError(err, res);
    }
});

// Development error handler (detailed error info)
const devError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err, // Full error stack and object for debugging
        stack: err.stack, // Display stack trace for easier debugging
        name: err.name, // Display error name for specific identification
        details: err.details || null, // Custom error details if any (e.g., validation errors)
        timestamp: new Date().toISOString() // Add timestamp for better tracking
    });
};

// Production error handler (generalized error message)
const prodError = (err, res) => {
    // Check if the error is a known, user-friendly error (e.g., validation error)
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: new Date().toISOString()
        });
    }

    // For unexpected errors, log the full error details (in the background) and send generic message to the user
    console.error('ERROR 💥', err);

    res.status(err.statusCode).json({
        status: err.status,
        message: 'Something went wrong! Please try again later.',
        timestamp: new Date().toISOString()
    });
};

module.exports = errorHandler;
