const express = require('express');

const router = express.Router({mergeParams : true});

const loginRouter=require('./login');
const User_regRouter=require('./User_register');
const User_shopRouter=require('./shop_register');
const Basic_userRouter=require('./Basic_user');
const open_placeRouter=require('./open_place');
const seller_Router=require('./seller');
const shopUser_Router=require('./shopUser');
const productUser_Router=require('./productUser');
const searchShop_Router=require('./search_shop');


router.use('/login',loginRouter);
router.use('/User_register', User_regRouter);
router.use('/shop_register', User_shopRouter);
router.use('/user',Basic_userRouter);
router.use('/openplace',open_placeRouter);
router.use('/seller',seller_Router);
router.use('/shopUser',shopUser_Router);
router.use('/product',productUser_Router);
router.use('/search_result_shop',searchShop_Router);





module.exports=router;