const Pagemodel = require("../models/pages.model")
const Categorymodel=require("../models/category.model")

exports.addPage=(req,res)=>
{
   const page=Pagemodel({
       page_title:req.body.page_title,
       category:req.body.category,
       content:req.body.content,
       author:req.body.author
   })
   page.save().then(
    (result)=>res.send({"message":"Inserted",data:result}),
    (error)=>res.send(error)
   )
}
exports.getAllPages=(req,res)=>
{
  Pagemodel.find().then(
    (result)=>res.send(result),
    (error)=>res.send(error)
  )
}
exports.getUserPage=(req,res)=>
{
    var id=req.params.id;
    Pagemodel.findById(id).then(
        (result)=>res.send(result),
        (error)=>res.send(error)
    )
}
exports.editPage=(req,res)=>
{
  var details={
    id:req.params.id,
    page_title:req.body.page_title,
    category:req.body.category,
    content:req.body.content,
    author:req.body.author
  }
  Pagemodel.findByIdAndUpdate(req.params.id,details)
  .then(
    (result)=>res.send({'message':"Updated",data:result}),
    (error)=>res.send(error))
}
exports.deletePage=(req,res)=>
{
  const id=req.params.id;
  Pagemodel.findByIdAndDelete(id)
  .then(
    (result)=>res.send({'message':'Deleted',data:result}),
    (error)=>res.send(error)
  )
}
exports.checkCombination=(req,res)=>{
   const category=req.body.category;
   const author=req.body.author;
   Pagemodel.findOne({
     category: category,
     author: author })
   .then((result)=>{
       if(result)
       {
         res.send({exists:true})
       }
       else{
        res.send({exists:false})
       }
      }).catch((error)=>
      {
        res.status(500).send({error:'Error checking combination'})
      })
}
  