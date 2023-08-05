require('colors');
const {
  inquirerMenu,
  pause,
  readInput,
  listDeleteTasks,
  confirm,
  showCheckList,
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./models/saveFile');
const Tasks = require('./models/tasks');

const main = async () => {
  console.clear();
  let opt = '';
  const tasks = new Tasks();

  const tasksDB = readDB();
  console.log('🚀 ~ file: app.js:12 ~ main ~ tasksDB:', tasksDB);
  if (tasksDB) {
    tasks.createTasksFromArray(tasksDB);
  }
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await readInput('Description: ');
        tasks.createTask(desc);

        break;

      case '2':
        tasks.listTasks();
        break;

      case '3':
        tasks.listCompletedTasks();
        break;

      case '4':
        tasks.listCompletedTasks(false);
        break;

      case '5':
        const ids = await showCheckList(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;

      case '6':
        const id = await listDeleteTasks(tasks.listArr);
        if (id !== '0') {
          const confirmDelete = await confirm('Are you sure?');
          if (confirmDelete) {
            tasks.deleteTask(id);
            console.log('Task deleted');
          }
        }
        break;
    }
    saveDB(JSON.stringify(tasks.listArr));
    await pause();
  } while (opt !== '0');
};

main();
