const express = require("express");
const router = express.Router();
const{
    createCategory,
    getCategories,
    updateCategory,
    deleteCategories
}= require("../controllers/category.controller");

const {verifyToken, verifyAdmin} = require("../middleware/auth");

router.post("/",verifyToken,verifyAdmin,createCategory);
router.get("/",getCategories);
router.put("/:id",verifyToken, verifyAdmin,updateCategory);
router.delete("/:id",verifyToken,verifyAdmin,deleteCategories);

module.exports = router;