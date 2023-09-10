const express=require('express');
const DB_user = require('../Database/product');
const DB_user1=require('../Database/Basic_user');
const router=express.Router();

router.get('/',async(req,res)=>{
    let seller=await DB_user1.getSellerByUser(req.user.id);
    let id=seller[0].SELLER_ID;
    console.log(id);

    let product_list = await DB_user.getAllProductsOf(id,'user');
    console.log(product_list);  
      
    res.render('showAllProductsSeller.ejs', { products: product_list });
})

router.get('/gender/',async(req,res)=>{

  const userID = req.query.id;
  let gender = req.query.role;
  let seller1=await DB_user1.getSellerByUser(userID);
  let seller=seller1[0].SELLER_ID;
  if(gender==='Men')
  {gender='male'};
  
  if(gender==='Women')
  {gender='female'};

  if(gender==='Child')
  {gender='child'};


  
  let allProducts = await DB_user.getProductbyGender(gender,seller,'user');  
    res.render('showAllProductsSeller.ejs', { products: allProducts });
})

router.post('/getCategories',async(req,res)=>
{
  try{
   const gender = req.body.gender;
   const result = await DB_user.getCategories(gender);
   let allCategories = [];

   for(let i=0;i<result.length;i++)
   {
  
    allCategories.push(result[i].TYPE_OF);
   }
  
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
   const genders = req.body.genders;
   const categories = req.body.categories;
   console.log(categories);
   const result = await DB_user.getMaterials(genders,categories);
   let allMaterials = [];

   for(let i=0;i<result.length;i++)
   {
    
    allMaterials.push(result[i].MATERIAL);
   }
   
   res.status(200).json({ materials: allMaterials });
  }

  catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})





router.post('/filter',async(req,res)=>
{
  try{
   const genders = req.body.data.genders;
   const categories = req.body.data.categories;
   const materials = req.body.data.materials;
   const seller=await DB_user1.getSellerByUser(req.user.id);
   const owner=seller[0].SELLER_ID;
   console.log(owner);
   
   const result = await DB_user.getFilteredResultSeller(genders,categories,materials,owner);
  console.log("Hi");
   console.log(result);
   
   res.status(200).json({products: result});
  }

  catch (error) {
    console.error('Error fetching categories:in', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


module.exports=router;