const Pagemodel = require("../models/pages.model")

exoprts.addPages=(req,res)=>
{
   var page=Pagemodel({
       page_title:req.body.page_title,
       category:req.body.page_title,
       content:req.body.content
   })
   page.save().then(
    (result)=>res.send(result),
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
exports.getAllUserPages=(req,res)=>
{
    var id=req.params.id;
    Pagemodel.find({user_id:id}).then(
        (result)=>res.send(result),
        (error)=>res.send(error)
    )
}

