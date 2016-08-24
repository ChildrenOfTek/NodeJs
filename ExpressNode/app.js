//app.js
/************************ Modules **********************************/
const express = require('express');
const bodyParser = require('body-parser');
var productsRouter= require('./src/routers/productsRouter');
const path = require('path');
/************************ Variables  *******************************/

var port = process.argv[2] || 1976;

/************************ App  *************************************/
var app = express();
app.disable('x-powered-by');

app.locals.autor = 'Vincent';
app.locals.email = 'vincent.lene.dl@gmail.com';

/************************ MiddleWare  ******************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','pug');
app.set('views',path.join(__dirname,'src/views'));

app.use(function (err,req,res,next) {
    console.log(err.stack);
    res.status(404).send('Pas de données !');
    next();
});
app.use('/products',productsRouter);

var server = app.listen(port,function () {
    console.log('Server is listening on port '+port)
});