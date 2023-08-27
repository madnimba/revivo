const express=require('express');
const DB_user=require('../Database/register') ;
const router=express.Router();
const DB_login=require('../Database/login');
const bcrypt = require('bcrypt');

router.get('/',async(req,res)=>{
    res.render('shopReg.ejs',{error:"",message:""});
})


// ROUTE: sign up (post)
router.post('/', async (req, res) => {
    let results=[];
    let errors=[];
    const salt = await bcrypt.genSalt(10);
        
    const pw = await bcrypt.hash(req.body.password, salt);
        results = await DB_login.readEmail(req.body.email,'shop');
        if(results.length > 0){
            errors.push('Email is already registered to a shop');
            //res.redirect('/app/User_register');
            res.render('shopReg.ejs',{message:"Shop Already exists!",error:"User Already exists!"});
        }
        
       

        if(errors.length==0){
            console.log('ekhane2');
            let user = {
                
                name: req.body.name,
                email:req.body.email,
                pass: pw,
                phone: req.body.phone
            }
            let result = await DB_user.createNewShopUser(user);  // might need the user info. but result doesnt give user info
            //res.redirect('/login');
            res.render('login.ejs',{message:"User Created Successfully!",error:""});
        }
    })


 


module.exports=router;