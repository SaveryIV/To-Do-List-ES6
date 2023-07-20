import '../src/style.css';
import dots from '../src/images/dots-icon.png';
import reset from '../src/images/reset-icon.png'

const $body = document.getElementById('body');
const $toDoContainer = document.querySelector('.container-toDo');
const $input = document.querySelector('.input');
const $listTasks = document.querySelector('.list-tasks');
const $titleContainer = document.querySelector('.title-container');

const img = document.createElement('img');
$titleContainer.appendChild(img);
img.src = reset;
img.classList.add('reset');
const $reset = document.querySelector('.reset');

class Task {
    constructor(description){
        this.description = description;
        this.completed = false;
        this.index = 0;
    }
}

export class ToDo {
    constructor(){
       this.list = [];
       this.counter = 0;
    }

    
    handleKeyPress = (event) => {
        const keyPressed = event.key;
        
        if(keyPressed === 'Enter'){
            /* this.list.forEach((element) => {    
            }) */
            const task = new Task($input.value);
            if(this.list.length <= 0){
                this.list.push(task);
            }else {
                console.log(task.index += this.counter + 1);
                this.list.push(task);
                this.counter = this.counter + 1;
            } 
            console.log(this.list);
            $listTasks.innerHTML += `
            <li class="task"><div><input type="checkbox" name="" id=""><span>${task.description}</span></div> <img class="task-img" src="${dots}" alt="options">
            </li>
            `;
        }
    }

    executeInputFunctioning = () => {
        $input.addEventListener('keydown', (e) => {
            if($input.value !== ""){
                this.handleKeyPress(e);
            }
            if(e.key === "Enter") {
                $input.value = "";
            }
        });
    }

    resetTasks = () => {
        $reset.addEventListener('click', () => {
          const $task = document.querySelectorAll('.task');
          $task.forEach(task => task.remove());
          this.list = [];
        });
    }

    clearAllButton = () => {
        const $clearButton = document.getElementById('clear-button');
        $clearButton.addEventListener('click', () => {
            const $task = document.querySelectorAll('.task');
            $task.forEach(task => task.remove());
            this.list = [];
        });
    }
}
