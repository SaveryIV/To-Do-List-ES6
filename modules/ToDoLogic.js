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
    this.counter = 1;
  }

  handleKeyPress = (event) => {
    const keyPressed = event.key;
    if (keyPressed === 'Enter') {
      const task = new Task($input.value);
      if (this.list.length <= 0) {
        this.list.push(task);
      } else {
        this.counter += this.counter + 1;
        task.index = this.counter;
        this.list.push(task);
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
    this.updateIndex();
    const $taskList = document.querySelectorAll('.list-tasks li');
    $taskList.forEach((li) => {
      const $taskImg = li.querySelector('.task-img');
      $taskImg.addEventListener('click', () => {
        const currentImage = $taskImg.src;
        if (currentImage === dots) {
          $taskImg.src = trash;
        } else {
          const indexToRemove = parseInt($taskImg.dataset.index, 10);
          this.list = this.list.filter((task) => task.index !== indexToRemove);
          li.remove();
          const remainingTasks = document.querySelectorAll('.list-tasks li .task-img');
          remainingTasks.forEach((img, index) => {
            img.dataset.index = index + 1;
          });
          this.saveLocalStorage(this.list);
        }
      });
    });
  }

  updateIndex = () => {
    this.list.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  saveLocalStorage = (list) => {
    localStorage.setItem('list', JSON.stringify(list));
  }

  showLocal = () => {
    const listSaved = JSON.parse(localStorage.getItem('list'));
    if (listSaved) {
      this.list = listSaved;
      const listHTML = this.list.map((task) => `
      <li class="task"><div><input type="checkbox" name="" id="">
            <span>${task.description}</span>
            </div> <img class="task-img" src="${dots}" alt="options">
            </li>
      `).join('');
      $listTasks.innerHTML = listHTML;
    }
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