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

// app.use(session({
//     secret:'secret',
//     resave: false,
//     saveUninitialized: true
// }));


app.use('/route',router);

app.get('/',(req,res)=>
{
    
    res.render('login',{message:" "});
})

app.get(api+'/product',(req,res)=>{
    const product =
    {
        id:1,
        name:'Jamdani Shari',
        material: ' Jamdani '
        
    }
    run();
    res.send(product);
})

async function run() {
    const connection = await oracledb.getConnection({
        user          : 'Revivo',
        password      : 'Revivo',  // contains the hr schema password
        connectString : 'localhost/orclpdb',
    });

    

    const result = await connection.execute('SELECT * FROM Basic_user');
    console.log("hi");
    console.log(result.rows[0]);

    await connection.close();   // Always close connections
}



app.listen(3000,()=>
{
    console.log('server is running');
})