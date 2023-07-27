import { ToDo } from '../modules/ToDoLogic.js';

const todoList = new ToDo();
if (JSON.parse(localStorage.getItem('list'))) {
  todoList.showLocal();
}
todoList.executeInputFunctioning();
todoList.resetTasks();

document.addEventListener('click', () => {
  todoList.changeState();
  todoList.clearAllButton();
  todoList.eliminateTask();
});
