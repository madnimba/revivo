const express=require('express');
const {removeFromCart} = require('../Database/cartOrder')
const router=express.Router();

router.post('/',async(req,res)=>{
    var productId = req.body.productId;
    var cid = req.body.cid;
    
    try{
    await removeFromCart(productId, cid);
    res.sendStatus(200);
    }catch(err)
    {
        res.status(404);
    }
    
})




module.exports= router;