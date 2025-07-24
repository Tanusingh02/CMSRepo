var express=require('express');
var router=express.Router();
var pagesController=require('../controllers/pages.controller');
const {verifyToken ,verifyAdmin} =require('../middleware/auth');


router.get('/getAll',pagesController.getAllPages);
router.get('/get/:id',pagesController.getUserPage);

router.post('/addPage',pagesController.addPage);
router.put('/editPage/:id',verifyToken,verifyAdmin,pagesController.editPage);
router.delete('/deletePage/:id',verifyToken,verifyAdmin,pagesController.deletePage)

router.post('/check',pagesController.checkCombination);

module.exports=router;


