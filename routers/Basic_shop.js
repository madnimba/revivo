const express=require('express');
const DB_user1=require('../Database/login') ;
const DB_user=require('../Database/register') ;
const router=express.Router();





router.get('/',async(req,res)=>{
    try{
    const userData = await DB_user1.readEmail('gburrill1@opera.com', 'shop');
    res.render('shopProfile.ejs', { userData: userData });
    }
    catch (error) {
        // Handle any errors that might occur during async operations
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router;