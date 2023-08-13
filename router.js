var express = require('express');
var router = express.Router();
const oracledb = require('oracledb');


async function read(mail){
    const Rconnection = await oracledb.getConnection({
        user          : 'Revivo',
        password      : 'Revivo',  // contains the hr schema password
        connectString : 'localhost/orclpdb',
    });

    
    const result2 = await Rconnection.execute(`SELECT COUNT(*) FROM Basic_user where E_mail='${mail}' `);
    const count = (result2.rows[0][0]);
    const result = await Rconnection.execute(`SELECT * FROM Basic_user where E_mail='${mail}' `)

    await Rconnection.close();   // Always close connections
    return {count,result};
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

router.post('/login',(req,res)=>{
   
    
    read(req.body.email)
    .then(({ count, result })=>{
        if(count>0)
        {
            console.log(count);
            //res.send("User Found")
            const profile = result.rows[0];
        
            res.render('user-profile',{
                fname:`${profile[1]}`,
                lname:`${profile[2]}`,
                email:`${profile[3]}`,
                address:`${profile[4]}`,
                phone:`${profile[5]}`

            });
        }
        else{
            res.render('login',{message:"User not found! Please enter correct credentials!"});
        }
    })
})

router.get('/reg-form',(req,res)=>{
    res.render('reg',{error:""});
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


module.exports = router;