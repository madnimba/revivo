const express=require('express');
const DB_user=require('../Database/register') ;
const {getAllProductsOf} = require('../Database/product');
const router=express.Router();

router.get('/',async(req,res)=>{
  
    let id = req.user.id;

    let product_list = await getAllProductsOf(id,'shop');
    console.log(product_list);
    
    const products = [
        {
          name: "Accessory 1",
          description: "With supporting text below as a natural lead-in to additional content.",
          price: 25.16,
          image: '../images/dress1.png',
          addToCartLink: "https://example.com/cart/1"
        },
        {
          name: "Coffee Bank 1",
          description: "With supporting text below as a natural lead-in to additional content.",
          price: 16,
          image: '../images/dress1.png',
          addToCartLink: "https://example.com/cart/2"
        },
        {
          name: "Latte Accessory 1",
          description: "With supporting text below as a natural lead-in to additional content.",
          price: 20,
          image: '../images/dress1.png',
          addToCartLink: "https://example.com/cart/3"
        },
        {
          name: "Accessory 2",
          description: "With supporting text below as a natural lead-in to additional content.",
          price: 25.16,
          image: '../images/dress1.png',
          addToCartLink: "https://example.com/cart/4"
        },
        {
          name: "Coffee Bank 2",
          description: "With supporting text below as a natural lead-in to additional content.",
          price: 16,
          image: '../images/dress1.png',
          addToCartLink: "https://example.com/cart/5"
        },
        {
          name: "Latte Accessory 2",
          description: "With supporting text below as a natural lead-in to additional content.",
          price: 20,
          image: '../images/dress1.png',
          addToCartLink: "https://example.com/cart/6"
        },
        {
          name: "Accessory 3",
          description: "With supporting text below as a natural lead-in to additional content.",
          price: 25.16,
          image: '../images/dress1.png',
          addToCartLink: "https://example.com/cart/7"
        },
        {
          name: "Coffee Bank 3",
          description: "With supporting text below as a natural lead-in to additional content.",
          price: 16,
          image: '../images/dress1.png',
          addToCartLink: "https://example.com/cart/8"
        },
        {
          name: "Latte Accessory 3",
          description: "With supporting text below as a natural lead-in to additional content.",
          price: 20,
          image: '../dress1.png',
          addToCartLink: "https://example.com/cart/9"
        },
        {
          name: "Accessory 4",
          description: "With supporting text below as a natural lead-in to additional content.",
          price: 25.16,
          image: '../images/dress1.png',
          addToCartLink: "https://example.com/cart/10"
        }
      ];
      
      
      
    res.render('shopview.ejs', { products: product_list });
})


module.exports=router;