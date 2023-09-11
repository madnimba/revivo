
const express=require('express');
const router=express.Router();
const {addShopProduct} = require('../Database/product');
const multer = require('multer'); 
const path=require('path');

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
    res.render('shopChangeProduct.ejs',{error:"",message:""});
})

router.post('/',upload.single('productImage'), async(req,res)=>{
    console.log(req);
    let prod = req.body;
    console.log(req.file);
    console.log("hello");
    console.log(req.file.path);
    const relativePath=path.relative('public',req.file.path);

    await addShopProduct(prod.name, prod.gender, prod.category, prod.material, prod.price, prod.quantity,relativePath, prod.size,prod.Used_status, req.user.id)
    res.render('shopChangeProduct.ejs',{error:"",message:"New Product Added!"});
});


module.exports=router;