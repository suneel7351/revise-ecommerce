import { AsyncError } from "../../middleware/AsyncError.js"
import Category from "../../models/admin/category.js"
import ErrorHandler from "../../utility/errorHandlerClass.js"

class FeaturesController {

    static createCategory = AsyncError(async (req, res, next) => {
        const { name, fields } = req.body
        if (!name || !fields || !Array.isArray(fields) || fields.length === 0) {
            return next(new ErrorHandler(400, "Name and a non-empty array of fields are required."));
        }
        const category = await Category.create({ name, fields });
        res.status(200).json({ success: true, message: `category ${category.name} created successfully.` })
    })



    static getAllCategories = AsyncError(async (req, res, next) => {
        const categories = await Category.find({})
        res.status(200).json({ success: true, categories })
    })



    static deleteCategory = AsyncError(async (req, res, next) => {
        await Category.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: `category deleted successfully.` })
    })


    static updateCategory = AsyncError(async (req, res, next) => {
        const { name, fields } = req.body

        let category = await Category.findById(req.params.id)

        if (name) category.name = name
        if (fields && Array.isArray(fields) && fields.length !== 0) category.fields = fields
        await category.save()
        res.status(200).json({ success: true, message: `category ${category.name} updated successfully.` })
    })



    static getSingleCategory = AsyncError(async (req, res, next) => {
        let category = await Category.findById(req.params.id)
        res.status(200).json({ success: true, category })
    })


    static getAllCategoriesName = AsyncError(async (req, res, next) => {
        const categories = await Category.find({})
        let names=[]
        categories.length>0 && categories.forEach((item)=>{
            names.push(item.name)
        })
        res.status(200).json({ success: true,names })
    }) 
    
    static getFieldsACToCategory = AsyncError(async (req, res, next) => {
        const category = await Category.findOne({name:req.params.category})
             
        res.status(200).json({ success: true,fields:category?.fields || []})
    })




}






export default FeaturesController