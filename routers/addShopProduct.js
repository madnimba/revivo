const express=require('express');
const router=express.Router();
const {addShopProduct} = require('../Database/product')

router.get('/',async(req,res)=>{
    res.render('shopChangeProduct.ejs',{error:"",message:""});
})

router.post('/', async(req,res)=>{
    let prod = req.body;
    await addShopProduct(prod.name, prod.gender, prod.category, prod.material, prod.price, prod.quantity, '', prod.size, req.user.id)
    res.render('shopChangeProduct.ejs',{error:"",message:"New Product Added!"});
});


module.exports=router;