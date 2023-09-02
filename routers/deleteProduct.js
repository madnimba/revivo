const express=require('express');
const DB_user=require('../Database/register') ;
const DB_user1=require('../Database/product') ;
const router=express.Router();


router.delete('/:productId', async (req, res) => {
       const productId = req.params.productId;
        console.log(productId);
        // Perform your database deletion operation here
         await DB_user1.deleteProduct(productId);
         res.json({ success: true });
         console.log("executed");

});
module.exports=router;