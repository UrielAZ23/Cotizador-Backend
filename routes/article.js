'use strict'
var express=require('express');

var ArticleController = require('../controllers/article');

var router=express.Router();

var multipart= require('connect-multiparty');
var md_upload = multipart({uploadDir:'./upload/articles'});

//ruta prueba

router.get('/test',ArticleController.test);

//rutas basicas

router.post('/save',ArticleController.save);
router.get('/getArticles/:last?', ArticleController.getArticles);
router.get('/getArticle/:id', ArticleController.getArticle);
router.put('/update/:id', ArticleController.update);
router.delete('/delete/:id', ArticleController.delete);
router.post('/upload-image/:id?',md_upload, ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);


module.exports=router;