const express=require('express');
const DB_user=require('../Database/login') ;
const router=express.Router();

router.get('/',async(req,res)=>{
    res.render('login.ejs',{error:"",message:""});
})
router.get('/user',async(req,res)=>{
    res.render('userProfile.ejs',{fname:"",lname:"",email:"",phone:"",address:""});
})

router.post('/user',async(req,res)=>{
    res.render('userProfile.ejs',{fname:"",lname:"",email:"",phone:"",address:""});
})


router.post('/',async(req,res)=>{
    let results=[] ;
    let errors = [];

    results=await DB_user.readEmail(req.body.email,req.body.option);
    if(results.length==0){
        errors.push('No such user found');
        res.render('login.ejs',{error:"",message:"User not found! Please enter correct credentials!"});
    }
        if(req.body.option==='user')
        {
           res.redirect('/app/login/user');
        }
        else if(req.body.option=='shop'){
           // res.redirect('/shop');
        }
    
})




module.exports=router;
