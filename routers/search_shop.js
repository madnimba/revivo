const express=require('express');
const DB_user=require('../Database/register') ;
const DB_product=require('../Database/product') ;
const DB_user1=require('../Database/login') ;
const router=express.Router();

router.get('/',async(req,res)=>{
    let results=[];
        try {
            let idshop=req.user.id;
            results = await DB_product.getProductbyName(req.query.product_search,idshop);
            //console.log(results);
            if(results.length==0){
                results=await DB_product.getProductbyCategory(req.query.product_search,idshop);
                if(results.length==0){
                    const userData = await DB_user1.readID(req.user.id, 'shop');
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
    

    console.log(results[0]);
})

module.exports=router;