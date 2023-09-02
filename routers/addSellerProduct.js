const express=require('express');
const router=express.Router();
const DB_user = require('../Database/product')
const DB_user1 = require('../Database/Basic_user')

router.get('/',async(req,res)=>{
    res.render('addSellerProduct.ejs',{error:"",message:""});
})

router.post('/', async(req,res)=>{
    let prod = req.body;
    let userid=req.user.id;
    let seller=await DB_user1.getSellerByUser(req.user.id);
    let sellerId=seller[0].SELLER_ID;
    console.log(sellerId);
    await DB_user.addSellerProduct(prod.name, prod.gender, prod.category, prod.material, prod.price, prod.quantity, prod.productImage, prod.size,prod.Used_status, sellerId)
    res.render('addSellerProduct.ejs',{error:"",message:"New Product Added!"});
});


module.exports=router;