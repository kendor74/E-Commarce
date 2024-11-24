const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const dbConnection = require('./Config/database');
//Routes
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const ApiError = require('./utils/apiError');
const errorHandler = require('./middelWare/errorHandler');

// Load environment variables
dotenv.config({ path: './config.env' });

const port = process.env.PORT || 5000;

// Determine environment-specific variables
const dbString =
    process.env.NODE_ENV === 'production'
        ? process.env.DB_STRING_PROD
        : process.env.DB_STRING_DEV;

const app = express();

// Connect to Database
dbConnection(dbString);

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Log requests in development mode
    console.log('Mode: development');
} else if (process.env.NODE_ENV === 'production') {
    console.log('Mode: production');
}

// Parse incoming JSON data
app.use(express.json());

// Routes
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subCategoryRoutes);
app.use('/api/brand', brandRoutes);

// Catch-all error for unknown routes
app.use('*', (req, res, next) => {
    next(new ApiError(`Cannot find this route: ${req.originalUrl}`, 400));
});

// Global Error Handler
app.use(errorHandler);

// 404 Error Handling
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start Server
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


process.on('uncaughtRejection', (err) => {
    console.error(`Unhandled rejection Error: ${err.name} | ${err.message}`);
    server.close(() =>{
        console.log('Shutting down....');
        process.exit(1);
    });
})