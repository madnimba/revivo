const express=require('express');
const router=express.Router();

router.get('/',async(req,res)=>{
    res.render('shopChangeProduct.ejs',{error:"",message:""});
})

router.post('/', async(req,res)=>{

});


module.exports=router;