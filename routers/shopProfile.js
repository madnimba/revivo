const express=require('express');
const DB_user=require('../Database/register') ;
const router=express.Router();
const DB_shop=require('../Database/shop');


router.get('/',async(req,res)=>{
    const shop=await DB_shop.getShopByID(req.user.id);
    let orders=await DB_shop.getProcessedOrders(req.user.id);
    console.log(orders);
   

        res.render('realShopProfile.ejs',{shop:shop,product:orders});
})

module.exports=router;
