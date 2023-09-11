const express=require('express');
const {myOrderedProducts} = require('../Database/cartOrder');
const { getBuyerID } = require('../Database/product');
const router=express.Router();

router.get('/',async(req,res)=>{
    
    const id = await getBuyerID(req.user.id);

    const result =await myOrderedProducts(id);

    
    res.render('userOrders.ejs',{products: result});

})




module.exports= router;