const express=require('express');
const DB_user=require('../Database/register') ;
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



router.get('/:productID', async(req, res) => {
    const productID = req.params.productID;
    let results=[];
    results=await DB_user1.getProductbyID(productID);
    Gresults=results;
    res.render('UpdateProduct.ejs',{message:"",product_data:results });
});

router.post('/',upload.single('productImage'), async (req, res) => {
    const productId=Gresults[0].PRODUCT_ID;
    const relativePath=path.relative('public',req.file.path);
    console.log(req.body.productGender);
            let details = {
                productid:productId,
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productMaterial:req.body.productMaterial,
                productCategory:req.body.productCategory,
                productGender:req.body.productGender,
                productSize: req.body.productSize,
                productQuantity: req.body.productQuantity,
                productUsedStatus:req.body.productUsedStatus,
                productImage:relativePath
            }
            console.log(details);
            let result = await DB_user1.updateProduct(details);
            let results=await DB_user1.getProductbyID(productId) ; 
            res.render('UpdateProduct.ejs',{message:"Product Updated Successfully",product_data:results});
        }
    )
    


module.exports=router;