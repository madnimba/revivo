const express=require('express');
const DB_user=require('../Database/login') ;
const router=express.Router();
const bcrypt=require('bcrypt');

router.get('/',async(req,res)=>{
    res.render('login.ejs',{error:"",message:""});
})




router.post('/',async(req,res)=>{
    let results=[] ;
    let errors = [];

    // const salt = await bcrypt.genSalt(10);
    // const pw = await bcrypt.hash(req.body.password, salt);

    results=await DB_user.readEmail(req.body.email,req.body.option);
    console.log(results[0].PASSWORD)
   
    
    if(results.length==0){
        errors.push('No such user found');
        res.render('login.ejs',{error:"",message:"User not found! Please enter correct credentials!"});
    }

    else if(!(await bcrypt.compare(req.body.password, results[0].PASSWORD)))
    {
        errors.push('Wrong Password');
        res.render('login.ejs',{error:"",message:"Wrong Password! Please enter correct credentials!"}); 
    }
    
    else if(req.body.option==='user')

        {
           res.redirect('/app/user');
        }
        else if(req.body.option=='shop'){
            res.redirect('/app/shop');
        }
    
    
})




module.exports=router;
