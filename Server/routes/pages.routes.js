var express=require('express');
var router=express.Router();
var pagesController=require('../controllers/pages.controller');


router.get('getAll',pagesController.getAllPages);
router.get('getAll/:id',pagesController.getUserPages);
router.post('addPage',pagesController.addPage);
router.put('editPage/:id',pagesController.editPage);
router.delete('deletePage/:id',pagesController.deletePage)

module.exports=router;
