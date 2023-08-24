const express=require('express');
const DB_user=require('../Database/register') ;
const router=express.Router();

router.get('/male',async(req,res)=>{
    res.render('male.ejs',{error:"",message:""});
})

router.get('/female',async(req,res)=>{
    res.render('female.ejs',{error:"",message:""});
})

router.get('/kids',async(req,res)=>{
    res.render('kids.ejs',{error:"",message:""});
})
module.exports=router;
module.exports=router;