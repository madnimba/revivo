const express = require('express');
const {verifyAuth} = require('../middleware/authMiddleware');

const router = express.Router({mergeParams : true});

const loginRouter=require('./login');
const User_regRouter=require('./User_register');
const User_shopRouter=require('./shop_register');
const Basic_userRouter=require('./Basic_user');
const Basic_shopRouter=require('./Basic_shop');
const open_placeRouter=require('./open_place');
const seller_Router=require('./seller');
const shopUser_Router=require('./shopUser');
const productUser_Router=require('./productUser');
const searchShop_Router=require('./search_product_shopeller');
const logout_Router=require('./logout')
const addShopProduct_Router=require('./addShopProduct');
const showAllProduct_Router=require('./shopOwner');
const Update_Shop_Product_Router=require('./UpdateShopProduct');
const Delete_Shop_Product_Router=require('./deleteProduct');
const Add_Seller_Product_Router=require('./addSellerProduct');
const showAllProduct_Seller_Router=require('./showAllProductSeller');
const shopProfile_Router=require('./shopProfile');
const addToCart_Router=require('./addToCart');
const removeFromCart_Router=require('./removeFromCart');
const showCart_Router=require('./mycart');
const confirmOrder_Router= require('./confirmOrder');
const ShopOrders_Router=require('./ShopOrders');
const Shipping_Router=require('./Shipping');
const filter_Router=require('./filter')
const filterShops_Router=require('./filterShops')
const SellerOrders_Router=require('./SellerOrders')
const SellerProfile_Router=require('./SellerProfile')
const ShopProfileUpdate_Router=require('./ShopProfileUpdate')



// use verifyAuth middleware in the routers that can be only accessable after login.
// if you only use verifyAuth, in each router you can access the id by req.user.id

router.use('/login',loginRouter);
router.use('/User_register', User_regRouter);
router.use('/shopRegister', User_shopRouter);
router.use('/user',verifyAuth, Basic_userRouter);
router.use('/shop',verifyAuth, Basic_shopRouter);
router.use('/openplace',open_placeRouter);
router.use('/seller',verifyAuth,seller_Router);
router.use('/shopUser',shopUser_Router);
router.use('/product',verifyAuth,productUser_Router);
router.use('/search_result',verifyAuth,searchShop_Router);
router.use('/logout',verifyAuth,logout_Router);
router.use('/addProductinShop',verifyAuth,addShopProduct_Router);
router.use('/showAllProducts',verifyAuth,showAllProduct_Router);
router.use('/UpdateProduct',verifyAuth,Update_Shop_Product_Router);
router.use('/DeleteProduct',verifyAuth,Delete_Shop_Product_Router);
router.use('/addProductinSeller',verifyAuth,Add_Seller_Product_Router);
router.use('/showAllProductsSeller',verifyAuth,showAllProduct_Seller_Router);
router.use('/ShopProfile',verifyAuth,shopProfile_Router);
router.use('/addToCart',addToCart_Router);
router.use('/removeFromCart',removeFromCart_Router);
router.use('/cart',verifyAuth,showCart_Router);
router.use('/confirmOrder',confirmOrder_Router);
router.use('/ShopOrders',verifyAuth,ShopOrders_Router);
router.use('/shipping',verifyAuth,Shipping_Router);
router.use('/filter',filter_Router);
router.use('/filter_shops',verifyAuth,filterShops_Router);
router.use('/SellerOrders',verifyAuth,SellerOrders_Router);
router.use('/SellerProfile',verifyAuth,SellerProfile_Router);
router.use('/ShopProfileUpdate',verifyAuth,ShopProfileUpdate_Router);





module.exports=router;