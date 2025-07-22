const mongoose=require('mongoose')
var pageSchema=new mongoose.Schema({
    page_title:{
        type:String,
        required:true},
    category:{
        type:String,
        required:true},
    content:{
        type:String,
        required:true},
    author:{
        type:String,
        required:true},
    createdAt:{
        type:Date,
        default:Date.now()}
});

var pagemodel=mongoose.model('Page',pageSchema);
module.exports=pagemodel;
