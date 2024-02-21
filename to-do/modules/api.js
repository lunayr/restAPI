const BASE_URI =
  "https://webb23-1babd-default-rtdb.europe-west1.firebasedatabase.app/todo-list";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

//Hämta alla produkter
async function getTasks() {
  const url = BASE_URI + ".json";

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function postTask(taskText) {
  let body = { task: taskText, done: false };
  const url = BASE_URI + ".json";
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

async function patchTask(taskid, taskData) {
  const url = BASE_URI + "/" + taskid + ".json";
  const options = {
    method: "PATCH",
    body: JSON.stringify(taskData),
  };

  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

async function deleteTask(taskid) {
  const url = BASE_URI + "/" + taskid + ".json";
  const options = {
    method: "DELETE",
  };
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

export { getTasks, postTask, patchTask, deleteTask };
