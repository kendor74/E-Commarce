const  mongoose  = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    slug:{
        type: String,
        lowercase: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }

},{timestamps: true})

const subCategoryModel = mongoose.model("SubCategory", subCategorySchema);

module.exports = subCategoryModel;