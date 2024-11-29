const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        lowercase: true
    },
    description:{
        type: String,
        required: true,
        minLength:20
    },
    quantity:{
        type: Number,
        required: true,
    },
    sold:{
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        required: true,
        trim: true,
    },
    priceAfterDiscount:{
        type: Number,
    },
    colors:{
        type: [String],
    },
    imageCover:{
        type: String,
    },
    image: {
        type: [String]
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory:[{
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
    }],
    brand:{
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
    },
    rattingsAvarage:{
        type: Number,
        min: 1,
        max: 5,
    },
    rattingQuantity:{
        type: Number,
        default: 0
    }
}, {timestamps: true});


module.exports = mongoose.model('Product', productSchema)