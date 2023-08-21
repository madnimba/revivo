const express = require('express');
const oracledb = require('oracledb');
const path = require('path');
const bodyparser = require('body-parser');

const router=require("./router");


const app = express();
require('dotenv/config');

const api = process.env.API_URL;

app.set('view engine','ejs');
app.use('/static',express.static(path.join(__dirname,'public')))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use('/route',router);


app.get('/',(req,res)=>
{
    
    res.render('login',{message:" "});
})


app.listen(3000,()=>
{
    console.log('server is running');
})