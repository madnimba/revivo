const express=require('express');
const DB_user=require('../Database/register') ;
const router=express.Router();

router.get('/',async(req,res)=>{
    res.render('search_shop.ejs',{error:"",message:""});
})


module.exports=router;