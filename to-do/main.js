import { getTasks } from "./modules/api.js";
import { displayTaskForm, displayTaskList } from "./modules/components.js";

const ROOT = $("#root");

async function displayUI() {
  const data = await getTasks();
  ROOT.append(displayTaskForm, displayTaskList(data));
}

displayUI();
