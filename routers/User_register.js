const express=require('express');
const DB_user=require('../Database/register') ;
const DB_login=require('../Database/login');
const router=express.Router();

router.get('/',async(req,res)=>{
    res.render('reg.ejs',{error:"",message:""});
})


// ROUTE: sign up (post)
router.post('/', async (req, res) => {
    let results=[];
    let errors=[];
        results = await DB_login.readEmail(req.body.email,'user');
        if(results.length > 0){
            errors.push('Email is already registered to a user');
            res.redirect('/app/User_register');
            res.render('reg.ejs',{message:"User Already exists!",error:"User Already exists!"});
        }

        if(errors.length==0){
            let user = {
                fname: req.body.fname,
                lname: req.body.lname,
                email:req.body.email,
                address:req.body.address,
                pass: req.body.pass,
                phone: req.body.phone
            }
            let result = await DB_user.createNewUser(user);
            res.redirect('/login');
            res.render('login.ejs',{message:"User Created Successfully!",error:""});
        }
    })


 

    module.exports=router;

