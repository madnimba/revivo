const express=require('express');
const {getAllShops} = require('../Database/shop')
const {getAllProductsOf, getBuyerID} = require('../Database/product');
const {getMenTrending} = require('../Database/product')
const DB_user=require('../Database/login') ;
const router=express.Router();

router.get('/',async(req,res)=>{
  console.log(req.user.id);
  const userData = await DB_user.readID(req.user.id, 'user');
  console.log(userData[0].FIRST_NAME);

  const allShops = await getAllShops();
  const roles = ['Men','Women','Child'];
  

 

      
    res.render('userProfile.ejs',{error:"",message:"",shops:allShops,role:roles,userData:userData});
})

module.exports=router;