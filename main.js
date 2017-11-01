const baseURL = 'https://task-notes.herokuapp.com/tasks'

function reload() {
  document.querySelector('.to-do-row').innerHTML = ''
  loadTasks()
}

//////////UPDATE TASKS
function saveEdit(taskText, taskId) {
  let forms = document.querySelectorAll('form')
  for (let l = 0; l < forms.length; l++) {
    forms[l].addEventListener('click', (e) => {
      if (e.target.matches("button.save-button")) {
        e.preventDefault()
        taskText = document.querySelector(`#text-${taskId}`).value
        axios.put(`${baseURL}/${taskId}`, {id: taskId, task: taskText})
        .then(result => {
          reload()
        })
      }
      if (e.target.matches("button.cancel-button")) {
        e.preventDefault()
        reload()
      }
    })
  }
}

//////////GET TASKS
function loadTasks() {
  axios.get(baseURL)
    .then(result => {
      let tasks = result.data
      let toDoRow = document.querySelector(".to-do-row")
      for (var i = 0; i < tasks.length; i++) {
        toDoRow.innerHTML += makeTask(tasks[i].task, tasks[i].id)
      }

      for (var j = 0; j < tasks.length; j++) {
        let doneButtons = document.querySelectorAll('.to-do-done')
        doneButtons[j].addEventListener('click', (e) => {
          event.preventDefault()
          let taskId = e.srcElement.getAttribute('data-id')
          deleteTask(taskId)
        })

        ////////CLICK TO EDIT
        let taskText = document.querySelectorAll('.task-text')
        taskText[j].addEventListener('click', (e) => {
          event.preventDefault()
          taskText = e.srcElement.textContent
          let taskId = e.srcElement.getAttribute('data-id')
          e.srcElement.parentElement.innerHTML =
          editView(taskText, taskId)

          saveEdit(taskText, taskId)
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
}
loadTasks()

//////////CREATE TASK
let addTaskButton = document.querySelector('.add-task-button')
addTaskButton.addEventListener('click', (event) => {
  event.preventDefault()
  let task = document.querySelector('.new-task-input').value
  axios.post(baseURL, {task} )
    .then(result => {
      let inputField = document.querySelector('.new-task-input')
      inputField.value = ""
      reload()

      let taskErrorP = document.querySelector('.task-error')
      taskErrorP.textContent = result.data.errors.message
    })
    .catch(error => {
      console.log(error);
    })
})

//////////DELETE TASK
function deleteTask(taskId) {
  axios.delete(`${baseURL}/${taskId}`)
    .then(result => {
      console.log("task deleted");
      reload()
    })
    .catch(error => {
      console.log(error);
    })
}
