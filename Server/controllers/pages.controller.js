const Pagemodel = require("../models/pages.model")

exports.addPage=(req,res)=>
{
   const page=Pagemodel({
       page_title:req.body.page_title,
       category:req.body.page_title,
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