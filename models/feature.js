'use strict'

var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var FeatureSchema = Schema({

    customer:String,
    account:Number,
    status:Boolean
    



})

module.exports=mongoose.model('Feature',FeatureSchema);