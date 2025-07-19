const expres=require('express');
const router=expres.Router();

const{
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getPagesByCategory
}=require('../controllers/categories.controller');

router.post('/',createCategory);
router.put('/:id',updateCategory);
router.delete('/:id',deleteCategory);
router.get('/',getAllCategories);
router.get('/categoryId/pages',getPagesByCategory);

module.exports=router;
