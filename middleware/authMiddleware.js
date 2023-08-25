const jwt = require('jsonwebtoken');
const session = require('express-session');



const verifyAuth = (req,res,next)=>
{
    req.user = {};
    const token = req.cookies.jwt;

    if(token)
    {
        jwt.verify(token , 'torkibhai' , (err,decodedToken)=> {
            if(err)
            {
                res.redirect('/app/login');
            }
            else
            {
                req.user.id = (decodedToken.id);
                next();
            }
        })
    }
    else
    {
        res.redirect('/app/login');
    }
}

module.exports = { verifyAuth };