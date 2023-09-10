const express=require('express');
const DB_user=require('../Database/register') ;
const router=express.Router();
const DB_login=require('../Database/login');
const bcrypt = require('bcrypt');
const path=require('path');
const multer=require('multer');
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'public/uploads');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },
  
    }
  );
    
    const upload = multer({ storage: storage });

router.get('/',async(req,res)=>{
    res.render('shopReg.ejs',{error:"",message:""});
})


// ROUTE: sign up (post)
router.post('/',upload.single('image'), async (req, res) => {
    let results=[];
    let errors=[];
    const salt = await bcrypt.genSalt(10);
        
    const pw = await bcrypt.hash(req.body.password, salt);
        results = await DB_login.readEmail(req.body.email,'shop');
        const relativePath=path.relative('public',req.file.path);
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
                phone: req.body.phone,
                image: relativePath
            }
            let result = await DB_user.createNewShopUser(user);  // might need the user info. but result doesnt give user info
            //res.redirect('/login');
            res.render('login.ejs',{message:"User Created Successfully!",error:""});
        }
    })


 


module.exports=router;