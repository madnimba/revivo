const express=require('express');
const DB_user=require('../Database/Basic_user') ;
const router=express.Router();





router.get('/',async(req,res)=>{
    res.render('Shipping.ejs');
})

module.exports=router;