'use strict'

var validator =require('validator');

var fs =require('fs');
var path= require('path');

const article = require('../models/article');
var Article = require('../models/article');

var controller={
    //programa tester
    test:(req,res)=>{
        return res.status(200).send({
            message:'vamos bien'
        });
    },
    // programas basicos CRUD(create, Read, Update, Delete)

    save:(req,res)=>{
        //recojer parametros
        var params = req.body;

        //validar datos

        try {   
            var validate_title =!validator.isEmpty(params.title);
            var validate_content =!validator.isEmpty(params.content);
            
        } catch (error) {

            return res.status(200).send({
                status:'error',
                message:'Faltan datos por enviar',
                error
        
            });
            
        }

        if(validate_content && validate_title){
            //crear el objeto a guardar
            var article = new Article();

            //asignar valores
            article.title=params.title
            article.content=params.content
            article.pricing=params.pricing
            article.stock=params.stock
            article.image=params.image

            //guardar los valores

            article.save().then( result=>{
                if(!result){
                    return res.status(404).send({
                        status:'error',
                        message:'Los datos no se han guardado'
                    })
                }
                return res.status(200).send({
                    status:'success',
                    message:'los datos se han guardado con exito!',
                    result
                })
            })
        }
    },
    
    getArticles:(req,res)=>{


        var last = req.params.last;
        var query=Article.find({}); 
        if( last || last!= undefined){
            query.limit(5);
        }

        //find
        
        query.sort('-_id').then((articles)=>{
            
            if(articles==null){
                return res.status(200).send({
                    status:'error',
                    message:'Los datos no son validos'
                });

            }else{

                return res.status(200).send({
                    estatus:'success',
                    message:'todo va bien',
                    articles
                });
            }


        })

    },

    getArticle:(req,res)=>{
            //recoger el id del url

            var articleId= req.params.id;

            // comprobar que existe 
            if(!articleId || articleId==null){
                return res.estatus(404).send({
                    status:'Error',
                      messenger:'Seleccione un articulo'
                })
            }
        
            //buscar el articulo
            Article.findById(articleId).then(article=>{
                if(!article){
                    return res.status(500).send({
                        status:'Error',
                          messenger:'Ha pasado algo!'
                    })
                }
                
                //devolver el articulo
                
                
                return res.status(200).send({
                    status:'Okis',
                    messenger:'Vas bien!!',
                    article
                })
            });
    },


    update:(req,res)=>{


        //recoger el id del articulo  por la url
        var articleId = req.params.id;

        // recoger los datos que llegan por put
        var params= req.body;
        
        //validar los datos
        try {
                var validate_title =!validator.isEmpty(params.title);
                var validate_content= !validator.isEmpty(params.content);

        } catch (err) {
            
            return res.status(404).send({
                status:'Error',
                messenger:'Algo salio mal',
                
            })
        }

        if(validate_title && validate_content){
            // hacer un find and update
            Article.findOneAndUpdate({_id:articleId}, params,{new:true}).then(articleUpdate=>{
                
                if(!articleUpdate){
                    return res.status(500).send({
                        status:'Error',
                        messenger:'Error al actualizar',
                        
                    })
                    
                }
                
                //devolver respuesta
                return res.status(200).send({
                    status:'success',
                    messenger:'Vas bien!!',
                    articleUpdate
                    
                })
            });


        }else{
            //devolver respuesta
            return res.status(404).send({
                status:'Error',
                messenger:'Algo salio mal',
                
            })   
        }
    },
    
    
    delete:(req,res)=>{
        
        //recoger el id de la url
        var articleId = req.params.id;
        
        
        // find and deleted
        Article.findByIdAndDelete({_id:articleId}).then(articleRemove=>{
            if(!articleRemove){
                return res.status(200).send({
                    status:'Error',
                    messenger:'Algo salio mal',
                    articleRemove        
                })   
            }
            
            return res.status(200).send({
                status:'Success',
                messenger:'Elemento Borrado',
                articleRemove        
            })   
            
        });
        
        
        
    },
    
    
    upload:(req,res)=>{
        //configurar el modulo de connect multiparty router/article(okis)

        //recoger el fichero de la peticion
        var file_name='imagen no subida...';

        if(!req.files){
            return res.status(404).send({
                status:'Error',
                message:file_name
            });
        }


        //consegir el nombrey la extencion del archivo
        var file_path = req.files.file0.path;
        var file_split= file_path.split('\\');

        //nombre del archivo

        var file_name= file_split[2];

        //extencion del fichero

        var extencion_split =file_name.split('.')

        var file_ext = extencion_split[1];
        //comprobar extencion, solo imagenes, si es valida borrar fichero

        if(file_ext!='png' && file_ext!='jpg' && file_ext!='jpeg' && file_ext!='gif'){
            //borrar el archivo subido

            fs.unlink(file_path,(err)=>{

                return res.status(404).send({
                    status:'Error',
                    message:'La extencion de la imagen no es valida'
                });
            });


        }
        else{
            //todo es valido, sacando id de la url
            var articleId= req.params.id;
               
            if(articleId){

                //buscar el  articulo, asignar nombre a la imagen y actualizarlo
                   Article.findOneAndUpdate({_id: articleId},{image:file_name},{new:true}).then(articleUpdate =>{
    
                    if(!articleUpdate){
                        return res.status(200).send({
                           status:'Error',
                           message:'Ups, algo ocurrio al guardar'
                                    
                        });  
                    }
                    return res.status(200).send({
                       status:'success',
                       message:'Imagen guardada con exito!',
                       articleUpdate
                                
                    });
    
    
                   });
            }else{
                return res.status(200).send({
                    status:'success',
                    message:'Imagen guardada con exito!',
                    image: file_name
                             
                 });

            }
    


        }
        

  

    },

    getImage:(req,res)=>{
        var file = req.params.image;
         var path_file = './upload/articles/'+file;

         fs.exists(path_file,(exists)=>{
            if(exists){

                return res.sendFile(path.resolve(path_file));
                
            }else{
                return res.status(404).send({
                    status:'Error',
                    message:'No existe esa ruta'
                });
                
            }
         });
    },

    search:(req,res)=>{

        //sacar el string a buscar
        var searchString = req.params.search;


        //find or

        Article.find({ "$or":[
            {
                "title":{"$regex":searchString,"$options":"i"}
            },
            {
                "content":{"$regex":searchString,"$options":"i"}
            }
        ]

        }).sort([['date','descending']])
        .then((articles)=>{
     
            if(articles==''){
                return res.status(200).send({
                    status:'Success',
                    message:'No hay articulos que mostrar',
                    articles
                });

            }
            return res.status(200).send({
                status:'Success',
                message:'Cuadro de prueba',
                articles
            });

        });


    }
    

} // aqui termina el programa
module.exports = controller;