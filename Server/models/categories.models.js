const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    title:String,
    type:String,
    description:String
})
module.export=mongoose.model('Category',categorySchema);