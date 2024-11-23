const Category = require('../model/categoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

// Get All Categories
exports.getAll = asyncHandler(async (req, res) => {
    const pages = req.query.pages * 1 ||1
    const limit = req.query.limit * 1 ||2
    const skip = (pages - 1) * limit
    const categories = await Category.find().skip(skip).limit(limit);
    res.status(200).json({ result :categories.length , Categories: categories });
});


//
exports.getCategory = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category){
        return next(new ApiError(`Category not found for this ID ${id}`, 404));
    }
    res.status(200).json({data: category})
})


// Create a Category
exports.createCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body;

    // Validate input
    if (!name) {
        return next(new ApiError("Name is required", 400));
    }

    // Create category
    const newCategory = await Category.create({
        name,
        slug: slugify(name),
    });

    res.status(201).json({ message: "Category created", category: newCategory });
});

// Update category
exports.updateCategory = asyncHandler (async (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const category = await Category.findOneAndUpdate(
        {_id:id},
        {name},
        {new: true}
    );

    if (!category){
        return next(new ApiError(`Not Found Id: ${id}`, 404));
    }

    res.status(200).json({data: category});
})


exports.deleteCategory = asyncHandler (async (req, res, next) => {
    const id = req.params.id
    const category = await Category.findByIdAndDelete(id);

    if (!category){
        return next(new ApiError(`Not Found Id: ${id}`, 404));
    }

    res.status(200).json({data: category});

})














// module.exports = {
//     createCategory,
//     getAll,
// };
