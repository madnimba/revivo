const express=require('express');
const DB_user=require('../Database/register') ;
const DB_user1=require('../Database/product') ;
const router=express.Router();

router.get('/:productID', async(req, res) => {
    const productID = req.params.productID;
    let results=[];
    const shopid=req.user.id;
    console.log(productID);
    console.log(shopid);
    results=await DB_user1.getProductbyID(productID,shopid);
    console.log(results);
    res.render('UpdateProduct.ejs',{product_data:results});
});


module.exports=router;