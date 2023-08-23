const express = require('express');

const router = express.Router({mergeParams : true});

const loginRouter=require('./login');
const User_regRouter=require('./User_register');
const User_shopRouter=require('./shop_register');
const Basic_userRouter=require('./Basic_user');

router.use('/login',loginRouter);
router.use('/User_register', User_regRouter);
router.use('/shop_register', User_shopRouter);
router.use('/login/user',Basic_userRouter);




module.exports=router;