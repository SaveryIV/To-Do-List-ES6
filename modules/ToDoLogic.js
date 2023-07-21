/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import '../src/style.css';
import dots from '../src/images/dots-icon.png';
import reset from '../src/images/reset-icon.png';
import trash from '../src/images/trash-can.png';

const $input = document.querySelector('.input');
const $listTasks = document.querySelector('.list-tasks');
const $titleContainer = document.querySelector('.title-container');

const img = document.createElement('img');
$titleContainer.appendChild(img);
img.src = reset;
img.classList.add('reset');
const $reset = document.querySelector('.reset');

class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
    this.index = 1;
  }
}

export class ToDo {
  constructor() {
    this.list = [];
    this.counter = 2;
  }

  handleKeyPress = (event) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      const task = new Task($input.value);
      if (this.list.length <= 0) {
        this.list.push(task);
      } else {
        task.index = this.counter;
        this.list.push(task);
        /* console.log(this.list); */
        this.counter += 1;
      }
      $listTasks.innerHTML += `
            <li class="task"><div><input type="checkbox" name="" id="">
            <span>${task.description}</span>
            </div> <img class="task-img" src="${dots}" alt="options">
            </li>
            `;
    }

    this.eliminateTask();
  }

  eliminateTask = () => {
    const $taskImg = document.querySelectorAll('.task-img');
    $taskImg.forEach((img) => {
      img.addEventListener('click', () => {
        const currentImage = img.src;
        if (currentImage === dots) {
          img.src = trash;
        } else {
          /* const index = Array.from($taskImg).indexOf(img) + 1;
          this.list.forEach((task, taskIndex) => {
            // actualizar valor de task.index
            if (task.index === index) {
              this.list.splice(taskIndex, 1);
              img.parentElement.remove();
              console.log(this.list);
            }
          }); */
          const indexToRemove = Array.from($taskImg).indexOf(img) + 1;
          this.list = this.list.filter((task) => task.index !== indexToRemove);
          this.list.forEach((task, newIndex) => {
            task.index = newIndex + 1;
          });
          img.parentElement.remove();
          console.log(this.list);
        }
      });
    });
  }

  updateIndex = () => {
    /*  */
  }

  executeInputFunctioning = () => {
    $input.addEventListener('keydown', (e) => {
      if ($input.value !== '') {
        this.handleKeyPress(e);
      }
      if (e.key === 'Enter') {
        $input.value = '';
      }
    });
  }

  resetTasks = () => {
    $reset.addEventListener('click', () => {
      const $task = document.querySelectorAll('.task');
      $task.forEach((task) => task.remove());
      this.list = [];
    });
  }

  clearAllButton = () => {
    const $clearButton = document.getElementById('clear-button');
    $clearButton.addEventListener('click', () => {
      const $task = document.querySelectorAll('.task');
      $task.forEach((task) => task.remove());
      this.list = [];
    });
  }
}