const express=require('express');
const {addToCart} = require('../Database/cartOrder')
const router=express.Router();

router.post('/',async(req,res)=>{
    console.log("adding");
    var productId = req.body.productId;
    var cid = req.body.cid;
    var quantity = req.body.quantity;
    var status = req.body.status;
    try{
    await addToCart(productId, cid, status, quantity);
    res.sendStatus(200);
    }catch(err)
    {
        res.status(404);
    }
    
})




module.exports= router;