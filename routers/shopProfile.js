const express=require('express');
const DB_user=require('../Database/register') ;
const router=express.Router();
const DB_login=require('../Database/login');


router.get('/',async(req,res)=>{
    res.render('realShopProfile.ejs',{error:"",message:""});
})