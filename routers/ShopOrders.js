const express=require('express');
const DB_user=require('../Database/register') ;
const router=express.Router();
const DB_shop=require('../Database/shop');



router.get('/',async(req,res)=>{
    let orders=[];
    let order_details = [];
    let flag=0;

    orders=await DB_shop.getAllOrders();

    for(let i=0;i<orders.length;i++){
    let orderId=orders[i].ORDER_ID;
    let product=[];
     product=await DB_shop.getOrderProductsByShop(req.user.id,orderId);
    const buyer=await DB_shop.getBuyerbyOrder(orderId);
    const payment=await DB_shop.getPaymentByOrder(orderId);
    if(product.length>0){
    const orderDetail = {
        product,
        buyer,
        payment,
      };

      order_details.push(orderDetail);
      
    }
    }
    console.log("here in order");
    console.log(order_details);
    if(order_details.length>0){
    res.render('ShopOrders.ejs',{order_details:order_details,flag:flag,warning:""});
    }
    if(order_details.length==0){
      res.render('ShopOrders.ejs',{order_details:order_details,warning:"No orders to show"});
    }
})

router.get('/confirm/:orderId',async(req,res)=>{
    const orderId=req.params.orderId;
    console.log(orderId);
    /*let product=[];
     product=await DB_shop.getOrderProductsByShop(req.user.id,orderId);
     for(let i=0;i<product.length;i++){
       let amount=product[i].QUANTITY-product[i].AMOUNT;
       let product_id=product[i].PRODUCT_ID;
       await DB_shop.Decrease_Product(amount,product_id);
     }*/
     await DB_shop.Set_OrderStatus(orderId,'shipping');

     res.redirect('/app/shipping');
})

module.exports=router;