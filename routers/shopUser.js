const express=require('express');
const DB_user=require('../Database/register') ;
const {getAllProductsOf} = require('../Database/product')
const router=express.Router();

router.get('/:shopID',async(req,res)=>{

  const shopID = req.params.shopID;

  let allProducts = await getAllProductsOf(shopID, 'shop');
      
      
      
    res.render('shopUser.ejs', { products: allProducts });
})


module.exports=router;