const express=require('express');
const DB_user=require('../Database/shop') ;
const DB_user1=require('../Database/product') ;
const router=express.Router();
const multer=require('multer');
const path=require('path');


let Gresults=[];

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



router.get('/', async(req, res) => {
    const userId=req.user.id;
    let results=[];
    results=await DB_user.getShopByID(userId);
    Gresults=results;
    res.render('UpdateShopProfile.ejs',{message:"",shop_data:results });
});

router.post('/',upload.single('shopImage'), async (req, res) => {
    const shopId=req.user.id;
    const relativePath=path.relative('public',req.file.path);
            let details = {
                shopid:shopId,
                shopName: req.body.shopName,
                email: req.body.email,
                phone:req.body.phone,
                shopImage:relativePath
            }
            console.log(details);
            let result = await DB_user1.updateShop(details); 
            let results=await DB_user.getShopByID(shopId);
            res.render('UpdateShopProfile.ejs',{message:"Profile Updated Successfully",shop_data:results});
        }
    )
    module.exports=router;