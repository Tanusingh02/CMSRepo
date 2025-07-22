const express = require("express");
const router = express.Router();
const{
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}= require("../controllers/category.controller");

const {verifyToken, verifyAdmin} = require("../middleware/auth");

router.post("/",verifyToken,verifyAdmin,createCategory);
router.get("/",getCategories);
router.get("/:id", verifyToken,verifyAdmin,getCategoryById);
router.put("/:id",verifyToken,verifyAdmin,updateCategory);
router.delete("/:id",verifyToken,verifyAdmin,deleteCategory);

module.exports = router;