'use strict'

var mongoose= require('mongoose');
var app = require('./app');
var port=3900;
// mongoose.connect(url, opciones).then(()=>{
// });
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/cotizadordb',{useNewUrlParser:true}).then(()=>{
    console.log("la base de datos se ha realizado bien")

    app.listen(port, ()=>{
        console.log('este proyecto va bien! creo...');
    })
})