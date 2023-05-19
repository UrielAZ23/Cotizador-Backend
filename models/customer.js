'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CustomerSchema = Schema({

    name:String,
    password:String,
    date:{type:Date, default:Date.now}

});

module.exports=mongoose.model('Costumer', CustomerSchema);
