var express = require('express');
var router = express.Router();
const oracledb = require('oracledb');


async function read(mail){
    const Rconnection = await oracledb.getConnection({
        user          : 'Revivo',
        password      : 'Revivo',  // contains the hr schema password
        connectString : 'localhost/orclpdb',
    });

    
    const result = await Rconnection.execute(`SELECT COUNT(*) FROM Basic_user where E_mail='${mail}' `);
    const count = (result.rows[0][0]);

    await Rconnection.close();   // Always close connections
    return count;
}

router.post('/login',(req,res)=>{
    var c=-1;
    
    read(req.body.email)
    .then(count=>{
        if(count>0)
        {
            console.log(count);
            res.send("User Found")
            //res.redirect('/dashboard');
        }
        else{
            res.send("User not found")
        }
    })
})

router.get('/reg',(req,res)=>{
    res.render('reg');
})


module.exports = router;