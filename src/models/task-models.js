const fs = require('fs')
const tasks = JSON.parse(fs.readFileSync('./db/tasks.json', 'utf-8'))
const uuid = require('uuid-v4')

function getAllTasks(){
  return tasks
}

function getOneTask(id){
  const thisTask = tasks.find(el => el.id === id)

  let response
  if (!thisTask) {
    response = {errors: {message: "could not find that task"}}
  } else {
    response = thisTask
  }
  return response
}

function createTask(body){
  let response
  if (!body.task) {
    response = {errors: {message: "please enter a task"}}
  } else {
    const id = uuid()
    const task = body
    const newTask = { id, ...task }
    tasks.push(newTask)
    // tasks.push(task)
    const result = JSON.stringify(tasks)
    fs.writeFileSync('./db/tasks.json', result, 'utf-8')
    response = newTask
  }
  return response
}

function editTask(id, body){
  const thisTask = tasks.find(el => el.id === id)

  let response
  if (!thisTask) {
    response = {errors: {message: "could not find that task"}}
  } else if (!body.task) {
    response = {errors: {message: "please enter a task"}}
  } else {
    thisTask.task = body.task
    const result = JSON.stringify(tasks)
    fs.writeFileSync('./db/tasks.json', result, 'utf-8')
    response = thisTask
  }
  return response
}

function destroyTask(id){
  const thisTask = tasks.find(el => el.id === id)

  let response
  if (!thisTask) {
    response = {errors: {message: "could not find that task"}}
  } else {
    const index = tasks.indexOf(thisTask)
    const deletedTask = tasks.splice(index, 1)
    const result = JSON.stringify(tasks)
    fs.writeFileSync('./db/tasks.json', result, 'utf-8')
    response = deletedTask
  }
  return response
}


module.exports = { getAllTasks, getOneTask, createTask, editTask, destroyTask }
