import { deleteTask, patchTask, postTask } from "./api.js";

const escapeHtml = (unsafe) => {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

const displayTask = (id, { done, task }) => {
  const taskComponent = $(`<div class="task"></div>`);
  const checkBox = $(
    `<input type="checkbox" id="task-${id}" name="task-${id}" ${
      done && "checked"
    } />`
  );
  const label = $(`<label for="task-${id}">${escapeHtml(task)}</label>`);

  checkBox.on("click", () => {
    patchTask(id, { done: checkBox.is(":checked"), task });
  });

  const deleteButton = $("<button>Delete</button>");

  deleteButton.on("click", async () => {
    let res = await deleteTask(id);
    if (!res) {
      taskComponent.remove();
    } else {
      console.log("Something went wrong");
    }
  });

  return taskComponent.append(checkBox, label, deleteButton);
};

const displayTaskList = (data) => {
  const taskContainer = $("<div id='tasks' class='tasks'></div>");
  Object.keys(data)
    .reverse()
    .forEach((id) => {
      let taskData = data[id]; //{"done":false,"task":"call mom"}
      taskContainer.append(displayTask(id, taskData));
    });
  return taskContainer;
};

const displayTaskForm = () => {
  const formContainer = $("<form></form>");
  const formSubmitButton = $("<button type='submit'>Create</button>");
  const formInputField = $(
    "<input value='' placeholder='Enter task details'/>"
  );

  formContainer.on("submit", async (e) => {
    const tasksContainer = $("#tasks");
    e.preventDefault();
    let text = formInputField.val();
    if (text === "") return;
    formInputField.val("");
    const newId = await postTask(text);
    console.log(newId);
    tasksContainer.prepend(
      displayTask(newId.name, { task: text, done: false })
    );
  });

  return formContainer.append(formInputField, formSubmitButton);
};

export { displayTask, displayTaskList, displayTaskForm };
