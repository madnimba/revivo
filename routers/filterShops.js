const express=require('express');
const router=express.Router();

const {getShopBySearchText} = require('../Database/shop');
const DB_user=require('../Database/login') ;

router.get('/',async(req,res)=>{
    const searchText = req.query.search;
    
    const result = await getShopBySearchText(searchText);

  const userData = await DB_user.readID(req.user.id, 'user');
  console.log(userData[0].FIRST_NAME);

  const roles = ['Men','Women','Child'];

  res.render('userProfile.ejs',{error:"",message:"",shops:result,role:roles,userData:userData});
})


module.exports=router;