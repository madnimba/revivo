const express=require('express');
const DB_user=require('../Database/login') ;
const DB_product=require('../Database/product') ;
const DB_user1=require('../Database/Basic_user') ;
const router=express.Router();

router.get('/shop',async(req,res)=>{
    let results=[];
        try {
            let idshop=req.user.id;
            results = await DB_product.getProductbyName(req.query.product_search,idshop,'shop');
            //console.log(results);
            if(results.length==0){
                results=await DB_product.getProductbyCategory(req.query.product_search,idshop,'shop');
                if(results.length==0){
                    const userData = await DB_user.readID(req.user.id, 'shop');
                    res.render('shopProfile.ejs',{userData: userData,messag:"No such product/category Found"})
                }
                else{
                    res.render('search_shop.ejs',{product_data:results}); 
                }
            }
            else{
                res.render('search_shop.ejs',{product_data:results});
            }
        } catch (error) {
            console.error(error);
        }
    

    console.log(results);
})

router.get('/seller',async(req,res)=>{
    let results=[];
        try {
            let seller=await DB_user1.getSellerByUser(req.user.id);
            let id=seller[0].SELLER_ID;
            results = await DB_product.getProductbyName(req.query.product_search_seller,id,'user');
            //console.log(results);
            if(results.length==0){
                results=await DB_product.getProductbyCategory(req.query.product_search_seller,id,'user');
                if(results.length==0){
                    const userData = await DB_user.readID(id, 'user');
                    res.render('seller.ejs',{userData: userData,message:"No such product/category Found"})
                }
                else{
                    res.render('search_seller.ejs',{product_data:results}); 
                }
            }
            else{
                res.render('search_seller.ejs',{product_data:results});
            }
        } catch (error) {
            console.error(error);
        }
    

    console.log(results);
})


module.exports=router;