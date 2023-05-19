'use strict'

var validator= require('validator');

var fs =require('fs');
var path=require('path');

const customer =require('../models/customer');
var Customer =require('../models/customer');

var controller={
    test:(req,res)=>{
        return res.status(200).send({
            status:'success',
            message:'este es un mensage de prueba'
        })
    },

    save:(req,res)=>{
        var params = req.body;

        try {
            var validate_name =! validator.isEmpty(params.name);
            var validate_password =! validator.isEmpty(params.password);

        } catch (error) {
            return res.status(200).send({
                status:'error',
                message:'Faltan datos por enviar',
                error
            })
        }

        if(validate_name && validate_password){
            var customer = new Customer();

            customer.name=params.name;
            customer.password=params.password;

            customer.save().then(result=>{
                if(!result){
                    return res.status(404).send({
                        status:'error',
                        message:'Los datos no se guardaron',
                        error
                    })
                }

                return res.status(200).send({
                    status:'success',
                    message:'Los datos se han guardado correctamente',
                    customer
                })
            })
        }

    },

    getCustomers:(req,res)=>{
        var query =Customer.find({});
        var last = req.params.last;

        if( last || last!=undefined){
            query.limit(5);
        }

        query.sort('_id').then((customers)=>{
            if(customers==null){
                return res.status(200).send({
                    status:'error',
                    message:'No hay datos para mostrar'
                })
            }

            return res.status(200).send({
                status:'success',
                message:'Todo va bien',
                customers
            })
        })

    },

    getCustomer:(req,res)=>{
        var customerId = req.params.id;

        if(!customerId || customerId==null){
            return res.status(404).send({
                status:'error',
                message:'El id no coincide o no existe'
            })
        }

        Customer.findById(customerId).then(customer=>{
            if(!customer){
                return res.status(500).send({
                    status:'error',
                    message:'No se ha encontrado nada'
                })
            }
            return res.status(200).send({
                status:'success',
                message:'Se han encontrado datos',
                customer
            })
        })
    },

    update:(req,res)=>{

        var customerId = req.params.id;

        var params = req.body;

        try {
            var validate_name=!validator.isEmpty(params.name);
            var validate_password=!validator.isEmpty(params.password);
            
        } catch (error) {
            return res.status(404).send({
                status:'error',
                message:'Algo salio mal'
            })
        }

        if(validate_name && validate_password){

            Customer.findByIdAndUpdate({_id:customerId},params,{new:true}).then(custmerUpdate=>{
                if(!custmerUpdate){
                    return res.status(500).send({
                        status:'error',
                        message:'Error al actualizar'
                    })
                }

                return res.status(200).send({
                    status:'success',
                    message:'Se actualizaron los cambios',
                    custmerUpdate

                })
            })
        }
        else{

            return res.status(404).send({
                status:'error',
                message:'Algo salio mal'
            })

        }

    },

    delete:(req,res)=>{
        var customerId = req.params.id;

        Customer.findByIdAndDelete({_id:customerId}).then(customerRemove=>{
            if(!customerRemove){
                return res.status(404).send({
                    status:'error',
                    message:'Algo salio mal'
                })
            }

            return res.status(200).send({
                status:'success',
                message:'El elemento se ha borrado',
                customerRemove
            })
        })
    },

    search:(req,res)=>{

        var searchName = req.body.name;
        var searchPassword = req.body.password;


        // return res.status(200).send({
        //    searchName
        // })

            Customer.findOne(
                    {
                        "name":searchName
                    ,
                    
                        "password":searchPassword
                    }
            )
            .then((customers)=>{

                if(customers==null){
                    return res.status(200).send({
                        status:'success',
                        message:'No se encontraron coincidencias',
                        customers
                    })
                }

                return res.status(200).send({
                    status:'success',
                    message:'se encontro coincidencia',
                    customers
                })
            })
        
    },

}

module.exports=controller;