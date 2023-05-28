'use strict'

var express = require('express')
var ResumeController = require('../controllers/resume')

var router = express.Router();

router.get('/testResume',ResumeController.test);

router.post('/saveResume',ResumeController.saveResume);
router.get('/getsResume/:last?',ResumeController.getsResume);
router.get('/getResume/:id',ResumeController.getResume);
router.put('/updateResume/:id',ResumeController.updateResume);
router.delete('/deleteResume/:id',ResumeController.deleteResume)

router.post('/searchResume',ResumeController.search);
router.get('/searchByIdFeature/:idFeature',ResumeController.searchByIdFeature);




module.exports=router;