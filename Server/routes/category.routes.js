const express = require("express");
const router = express.Router();
const{
    createCategory,
    getCategories,
    updateCategory,
    deleteCategories
}= require("../controllers/category.controller");

const {verifyToken, verifyAdmin} = require("../middleware/auth");
const { route } = require("./pages.routes");

router.get("/getAll",getCategories);
router.get("/get/:id",getCategories);
router.post("/createCategory",verifyToken,verifyAdmin,createCategory);

router.put("/editCategory/:id",verifyToken, verifyAdmin,updateCategory);
router.delete("/deleteCtaegory/:id",verifyToken,verifyAdmin,deleteCategories);

module.exports = router;