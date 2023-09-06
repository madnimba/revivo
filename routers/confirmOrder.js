const express=require('express');
const {createNewOrder,addToOrder,removeFromCart,createPayment} = require('../Database/cartOrder')
const {Decrease_Product} = require('../Database/shop')
const router=express.Router();

router.post('/',async(req,res)=>{
    var products= req.body.checkedProducts;
    var cid = req.body.cid;
    var totalPrice = req.body.totalPrice;

    const id =await createNewOrder(cid);

    await createPayment(id,'COD',totalPrice);

    for(const product of products)
    {
        await addToOrder(product.ID,id,product.amount);
        await Decrease_Product(product.quantity-product.amount,product.ID)
        await removeFromCart(product.ID,cid);
        
    }
    
    res.status(200).json({ message: 'Products cancelled successfully' });

})




module.exports= router;