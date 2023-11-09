const Category=require("../model/Category.js");
const express=require("express");
const router=express.Router();


router.get("/get-all", async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
    }
  });
router.put("/update-category",async(req,res)=>{
    try {
        await Category.findByIdAndUpdate({_id:req.body.categoryId},req.body);
        res.status(200).json("ıtem updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
})

router.delete("/delete-category",async(req,res)=>{
    try {
        await Category.findOneAndDelete({_id:req.body.categoryId});
        res.status(200).json("ıtem deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
})
router.post("/add-category",async (req,res)=>{
    try {
        const newCategory=new Category(req.body);
        await newCategory.save(); //beklettık ustekını yapmadan gecmsın sonra verı tabanına kaydettık
        res.status(200).json("item added successfully.")
    } catch (error) {
        res.status(400).json(error)
    }
});
module.exports=router;
