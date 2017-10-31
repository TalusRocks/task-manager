const model = require('../models/task-models')


function getAllTasks(req, res, next){
  res.status(200).json(model.getAllTasks())
}

function getOneTask(req, res, next){
  const id = req.params.taskId
  const data = model.getOneTask(id)
  res.status(200).json(data)
}

function createTask(req, res, next){
  const body = req.body
  const data = model.createTask(body)
  res.status(201).json(data)
}

function editTask(req, res, next){
  const id = req.params.taskId
  const body = req.body
  const data = model.editTask(id, body)
  res.status(200).json(data)
}

function destroyTask(req, res, next){
  const id = req.params.taskId
  const data = model.destroyTask(id)
  res.status(200).json(data)
}

module.exports = { getAllTasks, getOneTask, createTask, editTask, destroyTask }
