const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const dbConnection = require('./Config/database');

// Routes
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const productRoutes = require('./routes/productRoutes');

// Error handling utilities
const ApiError = require('./utils/apiError');
const errorHandler = require('./middelWare/errorHandler');

// Load environment variables
dotenv.config({ path: './config.env' });

const port = process.env.PORT || 5000;

// Determine the database connection string based on the environment
const dbString =
    process.env.NODE_ENV === 'production'
        ? process.env.DB_STRING_PROD
        : process.env.DB_STRING_DEV;

const app = express();

// Connect to Database
dbConnection(dbString);

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Log HTTP requests in development mode
    console.log('Running in development mode');
} else if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode');
}

// Parse incoming JSON requests
app.use(express.json());

// Define Routes
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subCategoryRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/product', productRoutes);

// Catch-all error handler for undefined routes
app.use('*', (req, res, next) => {
    next(new ApiError(`Route not found: ${req.originalUrl}`, 400));
});

// Global error handler
app.use(errorHandler);

// Start the server
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Graceful shutdown for unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled rejection: ${err.name} | ${err.message}`);
    server.close(() => {
        console.log('Server shutting down...');
        process.exit(1); // Exit the process with failure code
    });
});
