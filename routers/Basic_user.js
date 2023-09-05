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
  

  // let menProduct = [];
  // for(let l=0;l<allShops.length;l++)
  // {
  //   let menz = await getMenTrending();
  //   productArr.push()
  // }
  // let menz = await getMenTrending();
  // console.log(menz);
  
  // const allProduct = await getAllProductsOf('shop');
  // console.log(allProduct);

    const shops = [
        {
          name: "Shop 1",
          shopImage: '../images/shop1.jpg', // Assuming the image is named "shop1.jpg" in your "/images" directory
          dressImages: ['../images/dress1.png', '../images/dress2.jpg', '../images/dress2.jpg'], // Dress images associated with Shop 1
          role: ["Men","Women","Child"]
        },
        {
          name: "Shop 2",
          shopImage: '../images/shop2.jpg', // Assuming the image is named "shop2.jpg" in your "/images" directory
          dressImages:  ['../images/dress1.png', '../images/dress2.jpg', '../images/dress2.jpg'] // Dress images associated with Shop 2
          ,role: ["Men","Women","Child"]
        },
        {
          name: "Shop 3",
          shopImage: '../images/shop3.jpg', // Assuming the image is named "shop3.jpg" in your "/images" directory
          dressImages: ['../images/dress1.png', '../images/dress2.jpg', '../images/dress2.jpg'] // Dress images associated with Shop 3
          ,role: ["Men","Women","Child"]
        },
        {
          name: "Shop 3",
          shopImage: '../images/shop3.jpg', // Assuming the image is named "shop3.jpg" in your "/images" directory
          dressImages: ['../images/dress1.png', '../images/dress2.jpg', '../images/dress2.jpg'] // Dress images associated with Shop 3
          ,role: ["Men","Women","Child"]
        }
        // Add more shops as needed
      ];
      

      
    res.render('userProfile.ejs',{error:"",message:"",shops:allShops,role:roles,userData:userData});
})

module.exports=router;