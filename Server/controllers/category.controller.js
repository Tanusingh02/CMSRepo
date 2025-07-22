const Category = require("../models/category.model");

//for creating new category
exports.createCategory = async(req, res) => {
    try{
        const {title, type, desc} = req.body;

        const category = new Category({title, type, desc});
        await category.save();

        res.status(201).json(category);
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

//get category with pagination
exports.getCategories = async (req, res)=> {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip =(page - 1)*limit;

        const categories = await Category.find()
        .sort({createdAt:-1})
            .skip(skip)
            .limit(limit);

            const total = await Category.countDocuments();

            res.json({
                categories,
                totalPages: Math.ceil(total/limit),
                currentPage:page,
            });
        } catch(err){
            res.status(500).json({error:err.message});
        }
    };

    //update category
    exports.updateCategory = async(req,res)=>{
        try{
            const category = await Category.findByIdAndUpdate(
                req.params.id,
                {
                    title: req.body.title,
                    type:  req.body.type,
                    desc:  req.body.desc,

                },
                {new: true}
            );
            if(!category) return res.status(404).json({error: "Not Found"});
            res.json(category);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    };

    //Delete category
    exports.deleteCategories = async(req, res)=>{
        try{
            const category = await Category.findByIdAndDelete(req.params.id);
            if(!category) return res.status(404).json({error:"Not found"});
            res.json({message:"Deleted Succesfully"});
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }


