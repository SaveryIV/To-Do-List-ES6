import { ToDo } from '../modules/ToDoLogic.js';

const toDo = new ToDo();

toDo.executeInputFunctioning();
toDo.resetTasks();

document.addEventListener('DOMContentLoaded', () => {
  toDo.showLocal();
});
