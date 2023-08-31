const express=require('express');
const DB_user = require('../Database/product');
const DB_user1=require('../Database/Basic_user');
const router=express.Router();

router.get('/',async(req,res)=>{
    let seller=await DB_user1.getSellerByUser(req.user.id);
    let id=seller[0].SELLER_ID;
    console.log(id);

    let product_list = await DB_user.getAllProductsOf(id,'user');
    console.log(product_list);  
      
    res.render('showAllProductsSeller.ejs', { products: product_list });
})

router.get('/men',async(req,res)=>{
  
    let seller=await DB_user1.getSellerByUser(req.user.id);
    let id=seller[0].SELLER_ID;

  let product_list = await DB_user.getProductbyGender('male',id,'user');
  console.log(product_list);   
  res.render('showAllProductsSeller.ejs', { products: product_list });
})

router.get('/women',async(req,res)=>{
    let seller=await DB_user1.getSellerByUser(req.user.id);
    let id=seller[0].SELLER_ID;

  let product_list = await DB_user.getProductbyGender('female',id,'user');
  console.log(product_list);   
  res.render('showAllProductsSeller.ejs', { products: product_list });
})

router.get('/children',async(req,res)=>{
  
    let seller=await DB_user1.getSellerByUser(req.user.id);
    let id=seller[0].SELLER_ID;

  let product_list = await DB_user.getProductbyGender('child',id,'user');
  console.log(product_list);   
  res.render('showAllProductsSeller.ejs', { products: product_list });
})


module.exports=router;