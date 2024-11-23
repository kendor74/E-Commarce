const SubCategory = require('../model/subCategoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

// Get All Categories
exports.getAll = asyncHandler(async (req, res) => {
    const pages = req.query.pages * 1 ||1
    const limit = req.query.limit * 1 ||2
    const skip = (pages - 1) * limit
    const subcategories = await SubCategory.find({})
    .skip(skip)
    .limit(limit)
    .populate({
        path:'category',
        select: 'name'
    });
    res.status(200).json({ result :subcategories.length , subCategories: subcategories });
});


//
exports.getSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id)  
    .populate({
        path:'category',
        select: 'name'
    });;
    if (!subCategory){
        return next(new ApiError(`Category not found for this ID ${id}`, 404));
    }
    res.status(200).json({data: subCategory})
})


// Create a Category
exports.createSubCategory = asyncHandler(async (req, res, next) => {
    const { name, category } = req.body;

    // Validate input
    if (!name) {
        return next(new ApiError("Name is required", 400));
    }

    // Create category
    const newSubCategory = await SubCategory.create({
        name,
        slug: slugify(name),
        category
    });

    res.status(201).json({ message: "Sub Category created", subCategory: newSubCategory });
});

// Update category
exports.updateSubCategory = asyncHandler (async (req, res, next) => {
    const { id } = req.params;
    const {name, category} = req.body;
    const subCategory = await SubCategory.findOneAndUpdate(
        {_id:id},
        {
            name,
            slug: slugify(name),
            category
        },
        {new: true}
    )
    .populate({
        path:'category',
        select: 'name'
    });

    if (!subCategory){
        return next(new ApiError(`Not Found Id: ${id}`, 404));
    }

    res.status(200).json({data: subCategory});
})


exports.deleteSubCategory = asyncHandler (async (req, res, next) => {
    const id = req.params.id
    const subCategory = await SubCategory.findByIdAndDelete(id)  
    .populate({
        path:'category',
        select: 'name'
    });;

    if (!subCategory){
        return next(new ApiError(`Not Found Id: ${id}`, 404));
    }

    res.status(200).json({data: subCategory});

})














// module.exports = {
//     createCategory,
//     getAll,
// };
