const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task-controllers')

router.get('/', taskController.getAllTasks)
router.get('/:taskId', taskController.getOneTask)
router.post('/', taskController.createTask)
router.put('/:taskId', taskController.editTask)
router.delete('/:taskId', taskController.destroyTask)

module.exports = router
