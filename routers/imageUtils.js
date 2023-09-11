const {getProductbyGender} = require('../Database/product');
const express = require('express');


async function getImageForRole(role,shopid) {
    
    let result = [];
    if (role ==='Men')
    {
      result = await getProductbyGender('male',shopid,'shop');
      

      if(result.length>0)
      {return (result[0]);}
    }
    else if (role === 'Women') {
      result = await getProductbyGender('female',shopid,'shop');
      if(result.length>0)
      {return (result[0]);}
  
    } else if (role === 'Child') {
      result = await getProductbyGender('child',shopid,'shop');
      if(result.length>0)
      {return (result[0]);}
    }
    
    return {}// Replace with a default URL
  }


  module.exports={getImageForRole}