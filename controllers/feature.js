'use strict'

var validator= require('validator')
var fs =require('fs')
var path = require('path')

const feature = require('../models/feature')
var Feature = require('../models/feature')

var controller={
    test:(req,res)=>{
        return res.status(200).send({
            message:'okis!!!!'
        })
    },
    
    //CRUD create, read, update, delete
    // create
    saveFeature:(req, res)=>{
        //recojer datos
        var params= req.body

        //validar datos
        
    
        
        if(params.account!=null && params.customer!=null && params.status!=null){
            //crear el objeto

            var feature = new Feature()

            //asignar valores
            feature.customer=params.customer;
            feature.account=params.account;
            feature.status=params.status
            //guardar el objeto

            feature.save().then( result=>{

                if(result){
                    return res.status(200).send({
                        status:'success',
                        message:'vas bien',
                        result
                    })
                }else{
                    return res.status(404).send({
                        status:'error',
                        message:'algo a ocurrido',
                    })
                    
                }
            })
        }
        else{
            return res.status(404).send({
                status:'error',
                message:'algo ha occurido',
            })

        }
    },
    
    getFeatures:(req,res)=>{
        var last= req.params.last
        var query = Feature.find({})
        if(last || last!=undefined){
            query.limit(5)
        }

        //find

        query.sort('_id').then((features)=>{
            //si no encuentra nada

            if(features==null){
                return res.status(200).send({
                    status:'success',
                    message:'Esta vacio la DB',
                    features

                })
            }else{
                return res.status(200).send({
                    status:'success',
                    message:'Se han encontrado archivos',
                    features
                })
            }
        })


    },

    getFeature:(req,res)=>{

        var idFeature = req.params.id

        //vacio el id?
        if(!idFeature || idFeature==null){
            return res.status(404).send({
                status:'error',
                message:'No hay id para buscar'
            })
        }

        //buscar el id

        Feature.findById(idFeature).then(response=>{
            if(!response){
                return res.status(200).send({
                    status:'success',
                    message:'No se han encontrado coincidencias'
                })
            }

            return res.status(200).send({
                status:'success',
                message:'Se han encontrado coincidencias',
                response
            })
        })
    },

    //update

    updateFeature:(req,res)=>{
            //recojer los datos del id
            var idFeature = req.params.id
            //recojer los archivos a editar
            var params = req.body

            //validar los datos
            var validator_account=params.account
            var validator_status=params.status

            try {
                var validator_customer=!validator.isEmpty(params.customer)

            } catch (error) {
                return res.status(404).send({
                    status:'error',
                    message:'Faltan datos'
                })
            }

            if( validator_account!=null && validator_customer && validator_status!=null){

                //hacer un find and Update

                Feature.findByIdAndUpdate({_id:idFeature},params,{new:true}).then(featureUpdate=>{
                    if(!featureUpdate){
                        return res.status(404).send({
                            status:'error',
                            message:'no se ha podido guardar'
                        })
                    }

                    return res.status(200).send({
                        status:'success',
                        message:'Se ha guardado con exito',
                        featureUpdate
                    })
                })
            }
    },

    //delete

    deleteFeature:(req,res)=>{
        //recojer el id
         var idFeature = req.params.id
        //find and delete

        Feature.findByIdAndDelete({_id:idFeature}).then(featureRemove=>{

            if(!featureRemove){
                return res.status(404).send({
                    status:'error',
                    message:'Algo salio mal'
                })
            }

            return res.status(200).send({
                status:'success',
                message:'Se ha borrado el archivo',
                featureRemove
            })
        })


    },

    searchFeature:(req,res)=>{
        //obtener los datos
        var params = req.body

        Feature.find({
            '$and':[
                {
                    'customer':params.customer
                },
                {
                    'status':true
                }
        ]
    }).then((response)=>{
        if(response==''){
            return res.status(200).send({
                status:'success',
                message:'No se han encontrado coincidencias',
                response
            })

        }

        return res.status(200).send({
            status:'success',
            message:'se han encontrado coinciencias',
            response
        })
    })


    },
}

module.exports= controller;
