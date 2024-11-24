const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true        
    },
    slug:{
        type: String,
        lowercase: true,
    },
    image:{
        path: String
    }
},{timestamps: true});


const BrandModel = mongoose.model('Brand', brandSchema);
module.exports = BrandModel;