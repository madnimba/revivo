const express = require('express');
const router = express('router');
const cookieParser=require('cookie-parser');

router.get('/',(req,res)=>
{
    console.log(req.user.id);
    console.log("is logging out");
    res.cookie('jwt','',{maxAge: 1});
    res.redirect('/app/login');
})

module.exports = router;