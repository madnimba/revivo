const express=require('express');
const DB_user=require('../Database/register') ;
const router=express.Router();
const DB_shop=require('../Database/shop');


router.get('/',async(req,res)=>{
    const shop=await DB_shop.getShopByID(req.user.id);
    res.render('realShopProfile.ejs',{shop:shop});
})

module.exports=router;
