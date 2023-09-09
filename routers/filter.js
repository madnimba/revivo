const express=require('express');
const {getAllProductsOf, getCategories, getMaterials, getFilteredResult} = require('../Database/product')
const router=express.Router();

router.get('/', async (req, res) => {
    // Retrieve and decode the data query parameter
    const encodedData = req.query.data;
    const decodedData = decodeURIComponent(encodedData);
  
    // Parse the JSON string back into an array of objects
    const dataArray = JSON.parse(decodedData);
  
    console.log("ready to render");
    res.render('shopUser.ejs', { products: dataArray });
  

  });
  

  module.exports=router;