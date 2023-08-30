const express=require('express');
const DB_user=require('../Database/register') ;
const DB_user1=require('../Database/product') ;
const router=express.Router();

let Gresults=[];

router.get('/:productID', async(req, res) => {
    const productID = req.params.productID;
    let results=[];
    const shopid=req.user.id;
    results=await DB_user1.getProductbyID(productID,shopid);
    Gresults=results;
    res.render('UpdateProduct.ejs',{message:"",product_data:results });
});

router.post('/', async (req, res) => {
    const productId=Gresults[0].PRODUCT_ID;
    const shopid=req.user.id;
            let details = {
                productid:productId,
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productMaterial:req.body.productMaterial,
                productCategory:req.body.productCategory,
                productGender:req.body.productGender,
                productSize: req.body.productSize,
                productQuantity: req.body.productQuantity,
                productUsedStatus:req.body.productUsedStatus
            }
            let result = await DB_user1.updateProduct(details);
            let results=await DB_user1.getProductbyID(productId,shopid) ; 
            res.render('UpdateProduct.ejs',{message:"Product Updated Successfully",product_data:results});
        }
    )
    


module.exports=router;