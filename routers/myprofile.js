const express=require('express');
const { getUserInfo, updateUserInfo } = require('../Database/Basic_user');
const router=express.Router();


router.get('/',async(req,res)=>{
   const id = req.user.id;

   const userinfo = await getUserInfo(id);
   console.log(userinfo);

  

    res.render('myProfile.ejs',{user: userinfo[0]});
})

router.get('/update',async(req,res)=>{
    const id = req.user.id;

   const userinfo = await getUserInfo(id);
   console.log(userinfo);

  

    res.render('updateMyProfile.ejs',{user: userinfo[0],message:''});
})

router.post('/update',async(req,res)=>{
    const id = req.user.id;

    
    const user = req.body;
    await updateUserInfo(id,user.fname,user.lname,user.address,user.email,user.phone);

    const userinfo = await getUserInfo(id);

  

    res.render('myProfile.ejs',{user: userinfo[0]});
})

module.exports=router;