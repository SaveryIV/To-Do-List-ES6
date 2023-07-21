/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import '../src/style.css';
import dots from '../src/images/dots-icon.png';
import reset from '../src/images/reset-icon.png';

const $listTasks = document.querySelector('.list-tasks');
const $titleContainer = document.querySelector('.title-container');

const img = document.createElement('img');
$titleContainer.appendChild(img);
img.src = reset;
img.classList.add('reset');
/* const $reset = document.querySelector('.reset'); */
const tasks = [
  {
    description: 'An example description in string',
    completed: false,
    index: 0,
  },
  {
    description: 'An example description in string',
    completed: false,
    index: 1,
  },
];

export class ToDo {
  constructor() {
    this.list = tasks;
  }

  loadTasks = () => {
    tasks.forEach((task) => {
      $listTasks.innerHTML += `
            <li class="task"><div><input type="checkbox" name="" id="">
            <span>${task.description}</span>
            </div> <img class="task-img" src="${dots}" alt="options">
            </li>
            `;
    });
  }
}
