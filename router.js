var express = require('express');
var router = express.Router();
const oracledb = require('oracledb');


async function read(mail,role){
    const Rconnection = await oracledb.getConnection({
        user          : 'Revivo',
        password      : 'Revivo',  // contains the hr schema password
        connectString : 'localhost/orclpdb',
    });

    if(role==='user'){
    const result2 = await Rconnection.execute(`SELECT COUNT(*) FROM Basic_user where E_mail='${mail}' `);
    const count = (result2.rows[0][0]);
    const result = await Rconnection.execute(`SELECT * FROM Basic_user where E_mail='${mail}' `)

    await Rconnection.close();   // Always close connections
    return {count,result};}

    else{
        const result2 = await Rconnection.execute(`SELECT COUNT(*) FROM Shop where E_mail='${mail}' `);
        const count = (result2.rows[0][0]);
        const result = await Rconnection.execute(`SELECT * FROM Shop where E_mail='${mail}' `)
    
        await Rconnection.close();   // Always close connections
        return {count,result};
    }
}


async function entry(fname,lname,email,address,pass,phone){
    var count=-1;
    const Rconnection = await oracledb.getConnection({
        user          : 'Revivo',
        password      : 'Revivo',  // contains the hr schema password
        connectString : 'localhost/orclpdb',
    });

    try{
    await Rconnection.execute(`INSERT INTO Basic_user(First_name,Last_name,E_mail,Address,Password,Phone) VALUES('${fname}',
     '${lname}','${email}','${address}','${pass}','${phone}')`);
    await Rconnection.commit();
}catch(errors)
{
    count=0;
    return count;
}
    
    count=1;
    await Rconnection.close();   // Always close connections
    return count;
}


async function shopEntry(name,email,pass,phone){
    var count=-1;
    const Rconnection = await oracledb.getConnection({
        user          : 'Revivo',
        password      : 'Revivo',  // contains the hr schema password
        connectString : 'localhost/orclpdb',
    });

    try{
    await Rconnection.execute(`INSERT INTO Shop(Name,E_mail,Password,Phone) VALUES('${name}',
     '${email}','${pass}','${phone}')`);
    await Rconnection.commit();
}catch(errors)
{
    count=0;
    return count;
}
    
    count=1;
    await Rconnection.close();   // Always close connections
    return count;
}


async function addShopProduct(name,category,gender,price,material,quantity,size){
    var count=-1;
    const Rconnection = await oracledb.getConnection({
        user          : 'Revivo',
        password      : 'Revivo',  // contains the hr schema password
        connectString : 'localhost/orclpdb',
    });

    try{
    
    await Rconnection.execute(`INSERT INTO Product(name,gender_category,type_of,material,price,quantity,size_of,seller_type) VALUES('${name}',
     '${gender}','${category}','${material}','${price}','${quantity}','${size}','shop')`);
    await Rconnection.commit();
}catch(errors)
{
    count=0;
    return count;
}
    
    count=1;
    await Rconnection.close();   // Always close connections
    return count;
}

router.post('/login',(req,res)=>{
   
    
    read(req.body.email,req.body.option)
    .then(({ count, result })=>{
        if(count>0)
        {
            console.log(count);
            //res.send("User Found")
            const profile = result.rows[0];
        
            if(req.body.option==='user')
            {

                res.render('user-profile',{
                    fname:`${profile[1]}`,
                    lname:`${profile[2]}`,
                    email:`${profile[3]}`,
                    address:`${profile[4]}`,
                    phone:`${profile[5]}`
    
                });
            }
            else{
                res.render('shop-profile',{name:`${profile[1]}`});
            }
        
           
        }
        else{
            res.render('login',{message:"User not found! Please enter correct credentials!"});
        }
    })
})

router.get('/reg-form',(req,res)=>{
    res.render('reg',{error:""});
})

router.get('/shopReg-form',(req,res)=>{
    res.render('shop-reg',{error:""});
})



router.post('/register',(req,res)=>{

    entry(req.body.fname,req.body.lname,req.body.email,req.body.address,req.body.password,req.body.phone)
    .then(count=> {
        if(count===1)
        {
            console.log("User Created");
            res.render('login',{message:"User Created Successfully!"});
        }
        else
        {
            res.render('reg',{error:"User Already exists! Try with a different E-mail!"});
        }
    })

})

router.post('/shopRegister',(req,res)=>{

    shopEntry(req.body.name,req.body.email,req.body.password,req.body.phone)
    .then(count=> {
        if(count===1)
        {
            console.log("Shop Created");
            res.render('login',{message:"Shop Created Successfully!"});
        }
        else
        {
            res.render('shop-reg',{error:"Shop Already exists! Try with a different E-mail!"});
        }
    })

})

router.get('/addProduct',(req,res)=>{
    res.render('addProduct',{message:""});
})

router.post('/addnewProduct',(req,res)=>{

    addShopProduct(req.body.name,req.body.category,req.body.gender,req.body.price,req.body.material,req.body.quantity,req.body.size)
    .then(count=> {
        if(count===1)
        {
            console.log("User Created");
            res.render('addProduct',{message:"Product Added Successfully!"});
        }
        else
        {
            res.render('addProduct',{message:"Give valid inputs!"});
        }
    })

})


module.exports = router;