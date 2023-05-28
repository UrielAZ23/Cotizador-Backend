'use strict'

var validator = require('validator')
var fs = require('fs')
var path = require('path');

const resume = require('../models/resume')
var Resume = require('../models/resume');

var controller={

    test:(req,res)=>{
        return res.status(200).send({
            status:'success',
            message:'okis!!!!'
        })
    },

    // CRUD

    // Create

    saveResume:(req,res)=>{
        //recojer la informacion

        var params= req.body
        // validar datos

        try {
            var validator_idFeature = !validator.isEmpty(params.idFeature)
            var validator_idArticle = !validator.isEmpty(params.idArticle)
            var validator_amount=params.amount
            var validator_cost=params.cost
            var validator_total=params.total
        } catch (error) {
            return res.status(404).send({
                status:'error',
                message:'Faltan datos por enviar'
            })
        }

        if(validator_idFeature && validator_idArticle && validator_amount!=null && validator_cost!=null && validator_total!=null)
        {
            //crear el objeto
            var resume = new Resume();
            //asignar valores
            resume.idFeature= params.idFeature;
            resume.idArticle= params.idArticle;
            resume.amount= params.amount;
            resume.cost= params.cost;
            resume.total= params.total;

            //guardar

            resume.save().then(result=>{
                if(!result){
                    return res.status(404).send({
                        status:'error',
                        message:'No se guardo'
                    })
                }

                return res.status(200).send({
                    status:'success',
                    message:'Se ha guardado',
                    result
                })
            })


        }else{
            return res.status(404).send({
                status:'error',
                message:'Algo ocurrio'
            })
        }
    },

    // Read

    getsResume:(req,res)=>{
        var last= req.params.last
        var query = Resume.find({})
        if(last || last!=undefined){
            query.limit(5)
        }

        query.sort('_id').then((resumens)=>{
            if(resumens==''){
                return res.status(200).send({
                    status:'success',
                    message:'No se han encontrado datos'
                })
            }
            return res.status(200).send({
                status:'success',
                message:'Se han encontrado datos',
                resumens
            })
        })


    },

    getResume:(req,res)=>{
        //recojer el id

        var idResume = req.params.id

        if(!idResume || idResume==''){
            return res.status(404).send({
                status:'error',
                message:'Se necesita el Id',
                idResume
            })
        }

        Resume.findById(idResume).then(response=>{

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


    // Update

    updateResume:(req,res)=>{
        //traer datos
        var params = req.body
        var idResume = req.params.id
        
        //validar datos
        var validator_amount=params.amount
        var validator_cost=params.cost
        var validator_total=params.total
        try {
            var validator_idFeature = !validator.isEmpty(params.idFeature);
            var validator_idArticle = !validator.isEmpty(params.idArticle);
            
        } catch (error) {
            return res.status(404).send({
                status:'error',
                message:'Introduzca todos los datos'
            })
        }

        if(validator_idFeature && validator_idArticle && validator_amount!=null && validator_cost!=null && validator_total!=null){

            //hacer un find and update

            Resume.findByIdAndUpdate({_id:idResume},params,{new:true}).then(resumeUpdate=>{
                if(!resumeUpdate){
                    return res.status(404).send({
                        status:'error',
                        message:'Algo salio mal'
                    })
                }
                return res.status(200).send({
                    status:'success',
                    message:'Se ha modificado',
                    resumeUpdate
                })
            })

        }

    },

    // Delete

    deleteResume:(req,res)=>{
        //recojer id
        var idResume = req.params.id

        //Eliminar el archivo

        Resume.findByIdAndDelete({_id:idResume}).then(resume=>{
            if(!resume){
                return res.status(404).send({
                    status:'error',
                    message:'Algo ha ocurrido'
                })
            }

            return res.status(200).send({
                status:'success',
                message:'Se ha borrado',
                resume
            })
        })
    },


    search:(req,res)=>{

        var params= req.body;

        Resume.find({ "$and":[
            {
                "idFeature":params.idFeature
            },
            {
                "idArticle":params.idArticle
            }
        ]
            
        }).then((resume)=>{
            if(resume==''){
                return res.status(200).send({
                    status:'success',
                    message:'No hay resumen',
                    resume
                })
            }
            return res.status(200).send({
                status:'success',
                message:'Se ha encontrado coincidencia',
                resume
            })
        })
    },

    searchByIdFeature:(req,res)=>{
        var params = req.params

        Resume.find({
            idFeature:params.idFeature
        }).then(resume=>{
            if(resume==''){
                return res.status(200).send({
                    status:'success',
                    message:'no se encontraron coincidencias'
                })
            }
            return res.status(200).send({
                status:'success',
                message:'se encontraron coinciencias',
                resume
            })
        })
    },

}

module.exports=controller;
