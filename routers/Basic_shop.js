const express=require('express');
const DB_user1=require('../Database/login') ;
const DB_user=require('../Database/register') ;
const router=express.Router();





router.get('/',async(req,res)=>{
    try{
        console.log(req.user.id);
        
    const userData = await DB_user1.readID(req.user.id, 'shop');
    console.log(userData);
    res.render('shopProfile.ejs', { userData: userData,messag:"" });
    }
    catch (error) {
        // Handle any errors that might occur during async operations
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router;