const express=require('express');
const {allinCart} = require('../Database/cartOrder');
const {getBuyerID,getCartID} = require('../Database/product')
const router=express.Router();

router.get('/',async(req,res)=>{

  const buyerID = await getBuyerID(req.user.id);
  const cartID = await getCartID(buyerID);

  let allProductinCart = await allinCart(cartID);
  console.log(allProductinCart);
      
    
      
    res.render('cart.ejs', { products: allProductinCart,cartID: cartID });
})


module.exports=router;