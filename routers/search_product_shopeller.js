const express=require('express');
const DB_user=require('../Database/login') ;
const DB_product=require('../Database/product') ;
const DB_user1=require('../Database/Basic_user') ;
const DB_user2=require('../Database/shop') ;
const router=express.Router();

router.get('/shop',async(req,res)=>{
    let results=[];
            let idshop=req.user.id;
            results = await DB_user2.getProductofShopBySearchText(req.query.product_search,idshop);
            console.log(results);
           if(results.length>0) {
           res.render('search_shop.ejs',{product_data:results});
           }
            else{
                res.render('No_data_Found.ejs');
            }
           
    console.log(results);
})

router.get('/seller',async(req,res)=>{
    let results=[];
            let seller=await DB_user1.getSellerByUser(req.user.id);
            let id=seller[0].SELLER_ID;
            console.log("Here");
            console.log(req.query.product_search);
            results = await DB_user2.getProductofSellerBySearchText(req.query.product_search_seller,id);
            if(results.length>0){
            res.render('search_shop.ejs',{product_data:results});
            }
            else{
                res.render('No_data_Found.ejs');
            }

    console.log(results);
   
})







router.get('/single', async(req, res) => {
    const productID = req.query.productID;
    console.log(productID);
    let results=[];
    results=await DB_product.getProductbyID(productID);
    res.render('search_shop.ejs',{product_data:results});
});

module.exports=router;