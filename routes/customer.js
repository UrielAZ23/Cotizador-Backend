'use strict'

var express = require('express')
var CustomerController = require('../controllers/customer');

var router = express.Router();

router.get('/testCustomer',CustomerController.test);

router.post('/saveCustomer',CustomerController.save);
router.get('/getCustomer/:id',CustomerController.getCustomer);
router.get('/getCustomers/:last?',CustomerController.getCustomers);
router.put('/updateCustomer/:id',CustomerController.update);
router.delete('/deleteCustomer/:id',CustomerController.delete);

router.post('/searchCustomer/',CustomerController.search);

module.exports=router;