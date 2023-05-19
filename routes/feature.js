'use strict'

var express = require('express')
var CustomerController = require('../controllers/feature')

var router = express.Router();

router.get('/testFeature',CustomerController.test);

router.post('/saveFeature',CustomerController.saveFeature);
router.get('/getFeatures/:last?',CustomerController.getFeatures);
router.get('/getFeature/:id',CustomerController.getFeature);
router.put('/updateFeature/:id',CustomerController.updateFeature);
router.delete('/deleteFeature/:id',CustomerController.deleteFeature);


module.exports=router;