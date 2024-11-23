const mongoose = require('mongoose');

const dbConnection = (dbString) => {
    mongoose
        .connect(dbString)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => {
            console.error('Database connection error:', err);
            process.exit(1);
        });
};

module.exports = dbConnection;
