const Category = require("../models/category.model");

//for creating new category
exports.createCategory = async(req, res) =>{
    try{
        const{title, type, desc} =  req.body;

        const existing = await Category.findOne({title});
            if (existing) return res.status(400).json({error:"Category title already exists"})
        
                const category = new Category({title, type, desc});
                await category.save();
                res.status(201).json(category);
    }catch(err){

        res.status(500).json({error:err.message});
}};

//get categories with pagination
exports.getCategories = async(req, res)=>{
    try{
        const page = parseInt(req.query.page)||1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const categories = await Category.find().sort({createdAt: -1}).skip(skip).limit(limit);
        const total = await Category.countDocuments();

        res.json({
            categories,
            totalPages: Math.ceil(total/limit),
            currentPage: page,
        });
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

//get single category by id
exports.getCategoryById=async(req,res)=>{
    try{
        const category = await Category.findById(req.params.id);
        if(!category) return res.status(404).json({error:"Category not found"});
        res.json(category);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

//update
exports.updateCategory = async(req,res)=>{
    try{
        const{title, type, desc}=req.body;

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {title, type, desc},
            {new:true}
        );
        if(!category) return res.status(404).json({error:"Category not found"});
        res.json(category);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

//Delete
exports.deleteCategory = async(req, res)=>{
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category) return res.status(404).json({error:"Category not found"});
        res.json({message:"Deleted Succesfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}