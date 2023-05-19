'use strict'

//cargar modulos de node para crear servidor

var express= require('express');
var bodyParser = require('body-parser');
//ejecutar express (http)
var app = express();

//cargar ficheros o rutas

var article_routes =require('./routes/article')
var customer_routes =require('./routes/customer')
var feature_routes = require('./routes/feature')

//cargar Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//añadir prefijo rutas 

app.use('/',article_routes);
app.use('/',customer_routes);
app.use('/',feature_routes);




//ruta o metodo de prueba para el api REST
/*
app.post('/probando',(req,res)=>{

    var hola= req.body.saludos
    return res.status(200).send({
        curso:'Master',
        autor:'yo',
        url:'3900',
        hola
    });
});*/

//exportar modulos





module.exports=app;