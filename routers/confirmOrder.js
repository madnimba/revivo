const express=require('express');
const {createNewOrder,addToOrder} = require('../Database/cartOrder')
const router=express.Router();

router.post('/',async(req,res)=>{
    var products= req.body.checkedProducts;
    var cid = req.body.cid;
    var totalPrice = req.body.totalPrice;

    const id =await createNewOrder(cid);

    for(const product of products)
    {
        await addToOrder(product.ID,id,product.amount);
    }
    
    

})




module.exports= router;