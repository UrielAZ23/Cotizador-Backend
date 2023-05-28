'use strict'

var mongoose =require('mongoose')
var Schema = mongoose.Schema;

var ResumeSchema = Schema({
    idFeature:String,
    idArticle:String,
    amount:Number,
    cost:Number,
    total:Number
    
})

module.exports=mongoose.model('Resume',ResumeSchema);