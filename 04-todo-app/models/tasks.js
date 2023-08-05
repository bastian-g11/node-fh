const Task = require('./task');

class Tasks {
  list = {};

  constructor() {
    this.list = {};
  }

  get listArr() {
    const list = [];
    Object.keys(this.list).forEach((key) => {
      const task = this.list[key];
      list.push(task);
    });

    return list;
  }

  createTask(description = '') {
    const task = new Task(description);
    this.list[task.id] = task;
  }

  createTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this.list[task.id] = task;
    });
  }

  listTasks() {
    console.log();
    this.listArr.forEach((task, i) => {
      const index = `${i + 1}`.green;
      const { description, completed } = task;

      const state = completed ? 'Completed'.green : 'Pending'.yellow;

      console.log(`${index} ${description} :: ${state}`);
    });
  }

  listCompletedTasks(showCompleted = true) {
    console.log();
    let counter = 0;
    this.listArr.forEach((task) => {
      const { description, completed } = task;
      const state = completed ? 'Completed'.green : 'Pending'.yellow;
      if (showCompleted) {
        if (completed) {
          counter += 1;
          console.log(
            `${(counter + '.').green} ${description} :: ${completed.green}`
          );
        }
      } else {
        if (!completed) {
          counter += 1;
          console.log(`${(counter + '.').green} ${description} :: ${state}`);
        }
      }
    });
  }

  deleteTask(id = '') {
    if (this.list[id]) {
      delete this.list[id];
    }
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this.list[id];
      if (!task.completed) {
        task.completed = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this.list[task.id].completed = null;
      }
    });
  }
}

module.exports = Tasks;
