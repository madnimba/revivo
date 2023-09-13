const express=require('express');
const {allinCart, removeFromCart, updateProductStatus} = require('../Database/cartOrder');
const {getBuyerID,getCartID} = require('../Database/product');
const { getUserInfo } = require('../Database/Basic_user');
const router=express.Router();

router.get('/',async(req,res)=>{

  const userinfo = await getUserInfo(req.user.id);
  const buyerID = await getBuyerID(req.user.id);
  const cartID = await getCartID(buyerID);

  let allProductinCart = await allinCart(cartID);
  console.log("hi");
  console.log(allProductinCart);
  console.log(userinfo);
    
      
    res.render('cart.ejs', { products: allProductinCart,cartID: cartID, user:userinfo });
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