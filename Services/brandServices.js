const Brand = require('../model/brandsModel')
const slugify = require('slugify');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler');



exports.getAll = asyncHandler(async(req, res) =>{
    const pages = req.query.pages * 1 || 1;
    const limit = req.query.limit * 1 || 2;
    const skip = (pages - 1) * limit;

    const brands = await Brand.find()
    .skip(skip)
    .limit(limit);

    res.status(200).json({length: brands.length, Brands: brands });
})



exports.getBrand = asyncHandler(async(req, res, next) =>{
    const { id } = req.params
    const brand = await Brand.findById(id);

    if(!brand){
        return next(new ApiError(`Brand not found for Id: ${id}`, 404))
    }

    res.status(200).json({data: brand});
})


exports.createBrand = asyncHandler(async(req, res) =>{
    const { name } = req.body
    const newBrand = await Brand.create({
        name,
        slug: slugify(name)
    })

    res.status(200).json({message: 'Brand Created Successfuly!', data: newBrand});
})


exports.updateBrand = asyncHandler(async(req, res) =>{
    const { id } = req.params
    const { name } = req.body
    const slug = slugify(name)
    const newBrand = await Brand.findOneAndUpdate(
        {_id: id},
        {name, slug},
        {new: true}
    );
    if(!newBrand){
        return next(ApiError(`This Brand not found for Id: ${id}`,404))
    }

    res.status(200).json({message: 'Brand Updated Successfuly', data: newBrand});
})


exports.deleteBrand = asyncHandler(async(req, res) =>{
    const { id } = req.params
    const brand = await Brand.findByIdAndDelete(id)

    if(!brand){
        return ApiError(`The brand is not found for Id: ${id}`, 404)
    }

    res.status(200).json({message: 'Brand Deleted Successfuly', data: brand})
});