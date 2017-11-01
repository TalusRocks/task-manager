function makeTask(taskText, taskId) {
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
