const express=require('express');
const DB_user=require('../Database/register') ;
const {getAllProductsOf, getCategories, getMaterials, getFilteredResult,getProductbyGender} = require('../Database/product')
const router=express.Router();
const {getReviews, addReview} = require('../Database/shop')

router.get('/all/:shopID',async(req,res)=>{

  const shopID = req.params.shopID;

  let allProducts = await getAllProductsOf(shopID, 'shop');
  
      
      
      
    res.render('shopUser.ejs', { products: allProducts, ownerID: shopID });
})


router.get('/reviews/:shopID',async(req,res)=>{

  const shopID = req.params.shopID;

  let reviews = await getReviews(shopID);
  
      
    res.render('review.ejs', { reviews: reviews, ownerID: shopID, error:'' });
})


router.post('/leaveReview/:shopID',async(req,res)=>{

  const comment = req.body.comment;
  const rating = req.body.rating;
  const id = req.user.id;
  const shopID = req.params.shopID;

  const result = await addReview(id,shopID,comment,rating);
  let reviews = await getReviews(shopID);
  
      

  let error = '';
  if(result==undefined)
  {
    error = " You didn't buy anything from this shop!";
}
    res.render('review.ejs', { reviews: reviews, ownerID: shopID, error:error });

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
      
      
      
    res.render('shopUser.ejs', { products: allProducts, ownerID: shopID });
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
   const ownerID = req.body.data.ownerID;

   
   
   const result = await getFilteredResult(genders,categories,materials,ownerID);

   
   res.status(200).json({products: result});
  }

  catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


module.exports=router;