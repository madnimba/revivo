const jwt = require('jsonwebtoken');



const verifyAuth = (req,res,next)=>
{
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
                console.log(decodedToken);
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