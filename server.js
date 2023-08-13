const express = require('express');
const app = express();
require('dotenv/config');

const api = process.env.API_URL;

app.get(api+'/product',(req,res)=>{
    const product =
    {
        id:1,
        name:'Jamdani Shari',
        material: ' Jamdani '
        
    }
    res.send(product);
})

app.listen(3000,()=>
{
    console.log('server is running');
})