const express=require('express');
const {getAllShops} = require('../Database/shop')
const {getAllProductsOf, getBuyerID} = require('../Database/product');
const {getMenTrending} = require('../Database/product')

const { getImageForRole } = require('./imageUtils');
const router=express.Router();

const {getShopBySearchText} = require('../Database/shop');
const DB_user=require('../Database/login') ;

router.get('/',async(req,res)=>{
    const searchText = req.query.search;
    
    const allShops = await getShopBySearchText(searchText);

  const userData = await DB_user.readID(req.user.id, 'user');
  console.log(userData[0].FIRST_NAME);

  const roles = ['Men','Women','Child'];


  let allMen =[];
  let allWomen = [];
  let allChild = [];
  let dummy=[];
  for(let i=0;i<allShops.length;i++)
  {
    dummy = (await getImageForRole('Men',allShops[i].SHOP_ID));

    allMen.push(dummy);

    
    dummy = (await getImageForRole('Women',allShops[i].SHOP_ID));

    
    allWomen.push(dummy);
    
    dummy = (await getImageForRole('Child',allShops[i].SHOP_ID));
    
    allChild.push(dummy);
    
  }
  
  for(let i=0;i<allMen.length;i++)
  {
    console.log(allMen[i].IMAGE);
  }
 
  

  res.render('userProfile.ejs',{error:"",message:"",shops:allShops,role:roles,
    userData:userData,allMen:allMen, allWomen:allWomen,allChild:allChild});
})


module.exports=router;