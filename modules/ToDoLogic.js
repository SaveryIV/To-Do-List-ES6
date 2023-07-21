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
        this.saveLocalStorage();
      } else {
        this.counter += this.counter + 1;
        task.index = this.counter;
        this.list.push(task);
      }
      $listTasks.innerHTML += `
            <li class="task"><div><input type="checkbox" name="" id="">
            <input type="text" class="inp" readOnly="true" value="${task.description}">
            </div> <img class="task-img" src="${dots}" alt="options" name="${task.description}">
            </li>
            `;
    }
    this.eliminateTask();
  }

  eliminateTask = () => {
    const $taskImg = document.querySelectorAll('.task-img');
    $taskImg.forEach((img) => {
      img.addEventListener('click', () => {
        img.src = trash;
        console.log(this.list);
        img.addEventListener('click', () => {
          this.list = this.list.filter((task) => task.description !== img.name);
          this.saveLocalStorage(this.list);
          img.parentElement.remove();
          this.updateIndex();
          console.log(this.list);
        });
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
            <input type="text" class="inp" readOnly="true" value="${task.description}">
            </div> <img class="task-img" src="${dots}" name="${task.description}" alt="options">
            </li>
      `).join('');
      $listTasks.innerHTML = listHTML;
      this.eliminateTask();
    }
  }

  executeInputFunctioning = () => {
    $input.addEventListener('keydown', (e) => {
      if ($input.value !== '') {
        this.handleKeyPress(e);
        this.updateIndex();
        this.saveLocalStorage(this.list);
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
      this.saveLocalStorage(this.list);
    });
  }

  /* changeDescription = () => {
    const $task = document.querySelectorAll('.task');
    $task.forEach((task) => {
      task.addEventListener('click', () => {
        const $inp = task.querySelector('.inp');
        /* $inp.classList.remove('');
        console.log($inp);
        const description = $inp.textContent;
        $inp.ariaReadOnly = false;
        const $taskImg = document.querySelectorAll('.task-img');
        $taskImg.forEach((img) => {
          if (img.name === description) {
            img.name = $inp.textContent;
          }
        });
      });
    });
    this.saveLocalStorage();
  } */

  clearAllButton = () => {
    const $clearButton = document.getElementById('clear-button');
    $clearButton.addEventListener('click', () => {
      const $task = document.querySelectorAll('.task');
      $task.forEach((task) => task.remove());
      this.list = [];
    });
  }
}