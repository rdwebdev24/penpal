const express = require('express');
const {GetTask,createTask,deleteAll,deleteTask,updateTask} = require('../controllers/Controller.js')
const router = express.Router();

router.route('/').delete(deleteAll)
router.route('/:id').delete(deleteTask).get(GetTask).post(createTask)
router.route('/:_id/:id').delete(deleteTask).put(updateTask)

module.exports =  router