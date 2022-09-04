const express = require("express");
const router = express.Router();
const  PersonController  = require("../Controllers/persons.controller");
router.get('/user/random', PersonController.RadomPerson)
router.get('/user/all', PersonController.AllPerson)
router.post('/user/save',PersonController.SavePerson)
router.patch('/user/update',PersonController.UpdatePerson)
router.patch('/user/bulk-update',PersonController.BulkUpdatePerson)
router.delete('/user/delete',PersonController.DeletePerson)
module.exports =router