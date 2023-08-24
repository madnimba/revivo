const express=require('express');
const app=express();
const body_parser=require('body-parser');
const morgan=require('morgan');


//constant routers
const indexRouter=require('./routers/indexRouters');




//setting the view engine
app.set('view engine','set');
app.use(express.static('public'))


//middleware
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(morgan('tiny'));
app.use('/app',indexRouter);







module.exports = app;
