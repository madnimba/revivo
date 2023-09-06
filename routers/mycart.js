const express=require('express');
const {allinCart, removeFromCart, updateProductStatus} = require('../Database/cartOrder');
const {getBuyerID,getCartID} = require('../Database/product');
const router=express.Router();

router.get('/',async(req,res)=>{

  const buyerID = await getBuyerID(req.user.id);
  const cartID = await getCartID(buyerID);

  let allProductinCart = await allinCart(cartID);
  console.log(allProductinCart);
      
    
      
    res.render('cart.ejs', { products: allProductinCart,cartID: cartID });
})

router.post('/cancelProduct', async(req,res)=>{

  const cancelledProducts = req.body.cancelledProducts;
  const cid = req.body.cid;

  for(const product of cancelledProducts)
  {
      
      await removeFromCart(product,cid);
  }
  
})


router.post('/updateStatus', async(req,res)=>{

  const product = req.body.Product;
  const status = req.body.status;

  await updateProductStatus(product,status);
  
})


module.exports=router;