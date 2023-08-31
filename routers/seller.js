const express=require('express');
const DB_user=require('../Database/Basic_user') ;
const router=express.Router();





router.get('/',async(req,res)=>{
    try{  
    const sellerId = await DB_user.getSellerByUser(req.user.id);
    console.log(req.user.id);
    console.log(sellerId);
    res.render('seller.ejs', { message:"" });
    }
    catch (error) {
        // Handle any errors that might occur during async operations
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router;