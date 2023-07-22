/* eslint-disable import/prefer-default-export */
export class Checkbox {
  updateTaskStatus = (list, completed) => {
    list.forEach((task) => {
      task.completed = completed;
      this.saveTasks(task);
    });
  }

  clearCompletedTasks = (list) => {
    list = list.filter((task) => !task.completed);
    this.updateTaskIndexes(list);
    this.saveTasks(list);
  }

  updateTaskIndexes = (list) => {
    list.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  saveTasks = (list) => {
    localStorage.setItem('list', JSON.stringify(list));
  }
}
