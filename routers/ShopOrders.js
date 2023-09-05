const express=require('express');
const DB_user=require('../Database/register') ;
const router=express.Router();
const DB_shop=require('../Database/shop');


router.get('/',async(req,res)=>{
    let orders=[];
    const order_details = [];

    orders=await DB_shop.getAllOrders();

    for(let i=0;i<orders.length;i++){
    let orderId=orders[i].ORDER_ID;
    let product=[];
    console.log(orderId);
     product=await DB_shop.getOrderProductsByShop(req.user.id,orderId);
    console.log(product);
    const buyer=await DB_shop.getBuyerbyOrder(orderId);
    console.log(buyer);
    const payment=await DB_shop.getPaymentByOrder(orderId);
    console.log(payment);

    if(product.length>0){
    const orderDetail = {
        product,
        buyer,
        payment,
      };

      order_details.push(orderDetail);
    }
    }
    res.render('ShopOrders.ejs',{order_details:order_details});
})

module.exports=router;