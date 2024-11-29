const fs = require('fs');
require('colors');
const dotenv = require('dotenv');
const Product = require('../../model/productModel');
const dbConnection = require('../../Config/database');

dotenv.config({ path: '../../config.env' });

const connectionString = process.env.DB_STRING_DEV

// connect to DB
dbConnection(connectionString);

// Read data
const products = JSON.parse(fs.readFileSync('./dummy.json'));


// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);

    console.log('Data Inserted'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}