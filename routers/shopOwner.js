const express=require('express');
const DB_user = require('../Database/product');
const {getAllProductsOf, getCategories, getMaterials, getFilteredResult,getProductbyGender} = require('../Database/product');
const router=express.Router();

router.get('/',async(req,res)=>{
  
    let id = req.user.id;

    let product_list = await DB_user.getAllProductsOf(id,'shop');
    console.log(product_list);

    res.render('shopview.ejs', { products: product_list });
})

router.get('/gender/',async(req,res)=>{

  const shopID = req.query.id;
  let gender = req.query.role;
  if(gender==='Men')
  {gender='male'};
  
  if(gender==='Women')
  {gender='female'};

  if(gender==='Child')
  {gender='child'};


  
  let allProducts = await getProductbyGender(gender,shopID,'shop');
      
      
      
    res.render('shopview.ejs', { products: allProducts });
})

router.post('/getCategories',async(req,res)=>
{
  try{
   const gender = req.body.gender;
   const result = await getCategories(gender);
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
   const result = await getMaterials(genders,categories);
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


// router.get('/filter/', (req, res) => {
//   // Retrieve and decode the data query parameter
//   const encodedData = req.query.data;
//   const decodedData = decodeURIComponent(encodedData);

//   // Parse the JSON string back into an array of objects
//   const dataArray = JSON.parse(decodedData);

//   console.log("ready to render");
//   console.log(dataArray);

//   // Send a response (e.g., JSON response)
//   res.json({ message: 'Data received successfully', data: dataArray });
// });


router.post('/filter',async(req,res)=>
{
  try{
   const genders = req.body.data.genders;
   const categories = req.body.data.categories;
   const materials = req.body.data.materials;
   const owner=req.user.id;
   
   const result = await getFilteredResult(genders,categories,materials,owner);

   
   res.status(200).json({products: result});
  }

  catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


module.exports=router;

