const express=require('express');
const DB_user=require('../Database/register') ;
const {getAllProductsOf, getCategories} = require('../Database/product')
const router=express.Router();

router.get('/:shopID',async(req,res)=>{

  const shopID = req.params.shopID;

  let allProducts = await getAllProductsOf(shopID, 'shop');
      
      
      
    res.render('shopUser.ejs', { products: allProducts });
})

router.post('/getCategories',async(req,res)=>
{
  try{
   const gender = req.body.gender;
   const result = await getCategories(gender);
   let allCategories = [];

   for(let i=0;i<result.length;i++)
   {
    console.log(result[i].TYPE_OF);
    allCategories.push(result[i].TYPE_OF);
   }
   console.log(allCategories)
   res.status(200).json({ categories: allCategories });
  }
  catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/getMaterials',async(req,res)=>
{
  try{
   const gender = req.body.gender;
   const result = await getCategories(gender);
   let allCategories = [];

   for(let i=0;i<result.length;i++)
   {
    console.log(result[i].TYPE_OF);
    allCategories.push(result[i].TYPE_OF);
   }
   console.log(allCategories)
   res.status(200).json({ categories: allCategories });
  }
  
  catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


module.exports=router;