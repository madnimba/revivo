const express=require('express');
const DB_user=require('../Database/register') ;
const {getAllProductsOfSeller} = require('../Database/product')
const router=express.Router();

router.get('/',async(req,res)=>{

    const products = await getAllProductsOfSeller();
    
    res.render('shopUser.ejs',{products: products,ownerID:-1});   // renders the open marketplace view
})

module.exports=router;