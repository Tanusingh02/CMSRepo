const express = require("express");
const router = express.Router();
const{
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategories,
    
}= require("../controllers/category.controller");

const {verifyToken, verifyAdmin} = require("../middleware/auth");
const { route } = require("./pages.routes");

router.get("/getAll",getCategories);
router.post("/",verifyToken,verifyAdmin,createCategory);
// router.get("/get/:id",verifyToken,verifyAdmin,getCategoryById);
router.get("/get/:id",getCategoryById);

router.put("/editCategory/:id",verifyToken, verifyAdmin,updateCategory);
router.delete("/deleteCategory/:id",verifyToken,verifyAdmin,deleteCategories);

module.exports = router;