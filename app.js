const express=require('express');
const app=express();
const body_parser=require('body-parser');
const morgan=require('morgan');


//constant routers
const loginRouter=require('./routers/login');
const User_regRouter=require('./routers/User_register');
const User_shopRouter=require('./routers/shop_register');



//setting the view engine
app.set('view engine','set');
app.use(express.static('public'))


//middleware
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(morgan('tiny'));
app.use('/app/login',loginRouter);
app.use('/app/User_register',User_regRouter);
app.use('/app/shopRegister',User_shopRouter);






module.exports = app;
