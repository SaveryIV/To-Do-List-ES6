import '../src/style.css';
import { ToDo } from '../modules/ToDoLogic';


const toDo = new ToDo();

toDo.executeInputFunctioning();
toDo.resetTasks();
toDo.clearAllButton();