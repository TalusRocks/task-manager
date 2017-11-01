const baseURL = 'http://localhost:3000/tasks'

function makeTask(taskText, taskId) {
  //make html
  return `<div class="to-do-item">
    <p data-id="${taskId}" class="task-text">${taskText}</p>
    <form class="hide">
      <textarea id="text-${taskId}" name="task-text" cols="40" rows="7">${taskText}</textarea>
      <div class="cancel-save">
        <button name="cancel" type="button" class="cancel-button">Cancel</button>
        <button name="submit" type="submit" class="save-button">Save</button>
      </div>
    </form>
    <a class="to-do-done sm-mrg-bottom" data-id="${taskId}">Done</a>
  </div>`
}

function editView(taskText, taskId) {
  return `<form data-id="${taskId}">
    <textarea id="text-${taskId}" name="task-text" cols="40" rows"8">${taskText}</textarea>
    <div class="cancel-save">
      <button name="cancel" type="button" class="cancel-button" data-id="${taskId}">Cancel</button>
      <button name="submit" type="submit" class="save-button" data-id="${taskId}">Save</button>
    </div>
  </form>`
}

function saveEdit(taskText, taskId) {
  let forms = document.querySelectorAll('form')

  for (let l = 0; l < forms.length; l++) {
    forms[l].addEventListener('click', (e) => {

      if (e.target.matches("button.save-button")) {
        e.preventDefault()
        taskText = document.querySelector(`#text-${taskId}`).value
        axios.put(`http://localhost:3000/tasks/${taskId}`, {id: taskId, task: taskText})
        .then(result => {
          document.querySelector('.to-do-row').innerHTML = ''
          loadTasks()
        })

      }
    })
  }

}



//////////GET TASKS
function loadTasks() {
  axios.get('http://localhost:3000/tasks')
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
        // let editForm = document.querySelectorAll('form')
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

  axios.post('http://localhost:3000/tasks', {task} )
    .then(result => {
      // console.log(result.errors);
      //where does my error message go? how to access it?
    })
    .catch(error => {
      console.log(error);
    })
})

//////////DELETE TASK
function deleteTask(taskId) {
  axios.delete(`http://localhost:3000/tasks/${taskId}`)
    .then(result => {
      //loadTasks()
      console.log(result.data);
      console.log("AAAAAAAAAAAAA!!!");
    })
    .catch(error => {
      console.log(error);
    })
}
