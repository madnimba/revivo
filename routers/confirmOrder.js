const express=require('express');
const {createNewOrder,addToOrder,removeFromCart,createPayment,existsInOrder, updateAmount} = require('../Database/cartOrder')
const {Decrease_Product} = require('../Database/shop');
const { getBuyerID } = require('../Database/product');
const router=express.Router();

router.post('/',async(req,res)=>{
    var products= req.body.checkedProducts;
    var cid = req.body.cid;
    var totalPrice = req.body.totalPrice;
    let userid = req.user.id;
    let buyerID = await getBuyerID(userid);
    let newProducts = [];
    let ifexists = [];

    for(const product of products)
    {
        ifexists = await existsInOrder(buyerID,product.ID);
        console.log("hello");
        console.log(ifexists.length);
        if(ifexists.length==0)
        {
            newProducts.push(product);
            console.log("new thing");
        }

        else{
            console.log("old thing");
        const orderId = ifexists[0].ORDER_ID;
        const productID = ifexists[0].PRODUCT_ID;
        const oldAmount = ifexists[0].AMOUNT;

        const newAmount = oldAmount+product.amount;

        await updateAmount(orderId,productID,newAmount);
        await Decrease_Product(product.quantity-product.amount,product.ID)
        await removeFromCart(product.ID,cid);
        }
        
    }


    if(newProducts.length>0)
{
    const id =await createNewOrder(cid);

    await createPayment(id,'COD',totalPrice);




    for(const product of newProducts)
    {


        await addToOrder(product.ID,id,product.amount);
        await Decrease_Product(product.quantity-product.amount,product.ID)
        await removeFromCart(product.ID,cid);
        
    }}
    
    res.status(200).json({ message: 'Products cancelled successfully' });

})




module.exports= router;