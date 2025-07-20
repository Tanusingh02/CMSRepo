var express=require('express');
var router=express.Router();
var pagesController=require('../controllers/pages.controller');


router.get('getAll',pagesController.getAllPages);
router.get('getAll/:id',pagesController.getAllUserPages);
router.post('addPage',pagesController.addPage);
router.put('editpage',pagesController.editPage);
router.delete('deletePage',pagesController.deletePage)

module.exports=router;
