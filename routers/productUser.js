const express=require('express');
const DB_user=require('../Database/register') ;
const {getProductbyID, getBuyerID, getCartID} = require('../Database/product');
const {inCart} = require('../Database/cartOrder')
const router=express.Router();


router.get('/',async(req,res)=>{
    
    var btnText = 'Add to Cart';
    const shopID = req.query.shopID;
    const prodID = req.query.prodID;
    const buyerID = await getBuyerID(req.user.id);
    const cartID = await getCartID(buyerID);
    

    
    const product = await getProductbyID(prodID,shopID);
    const incart = await inCart(prodID,cartID)
    if(incart.length>0)
    { btnText= 'Remove from Cart';}

    


    res.render('productUser.ejs',{error:"",message:"",product:product,cartID:cartID,btnText:btnText});
})


module.exports=router;