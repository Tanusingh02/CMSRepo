const Category=require('../models/categories.models');
const Page=require('../')// pages model i need to take reference

//Admin:create category
exports.creatCategory = async (req,res)=>{
    try{
        const{title,type,description,pageIds}=req.body;

        const category=new Category({title,type,description});
        await category.save();
        res.status(201).json(category);
    }catch(error){
        res.status(500).json({message:'Create failed',error});
    }
       
};

//Admin:Update Category
exports.updateCategory=async(req,res)=>{
    try{
        const{id}=req.params;
        const updated=await Category.findByIdAndUpdate(id,req.body,{new:true});
        if(!updated) return res.status(404).json({message:"Not found"});
        res.json(updated);
    }catch(error){
        res.status(500).json({message:'Update failed',error});
    }
};

//admin:Delete Category

exexports.deleteCategory = async (req,res)=>{
    try{
        const{id}=req.params;
        await Page.updateMany({category:id},{$unset:{category:""}});
        res.json({message:'Category deleted'});
    }catch(error){
        res.status(500).json({message:'Delete failed',error});
    }
};

//user:View all categories
exports.getAllCategories=async(req,res)=>{
    try{
        const categories=await Category.find();
        res.json(categories);

    }catch(error){
        res.status(500).json({message:'Fetch failed',error})
    }
}
//user:viwe pages by category
exports.getPagesByCategory=async(req,res)=>{
    try{
        const{categoryId}=req.params;
        const pages=await Page.find({category:categoryId}).populated('category','title');
        res.json(pages);
    }catch(error){
        res.status(500).json({message:'Fetch pages failed'})
    }
}
