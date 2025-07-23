var express=require('express');
var router=express.Router();
var pagesController=require('../controllers/pages.controller');


router.get('/getAll',pagesController.getAllPages);
router.get('/get/:id',pagesController.getUserPage);

router.post('/addPage',pagesController.addPage);
router.put('/editPage/:id',pagesController.editPage);
router.delete('/deletePage/:id',pagesController.deletePage)

router.post('/check',pagesController.checkCombination);

module.exports=router;


