const express=require('express');
const { getReviews } = require('../Database/shop');
const router=express.Router();


router.get('/',async(req,res)=>{

    const shopID = req.user.id;

  let reviews = await getReviews(shopID);
    res.render('shopreview.ejs',{reviews: reviews, ownerID:req.user.id, error:""});
})


module.exports = router;