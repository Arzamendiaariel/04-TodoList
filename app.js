require('colors');
const {
  inquirerMenu,
  pause,
  readInput,
  deleteToDoList,
  confirm,
  showChecklist,
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const ToDo = require('./models/ToDo');
const ToDos = require('./models/ToDos');

console.clear();
const main = async () => {
  let opt = '';
  const toDos = new ToDos();
  const toDosDB = readDB();

  if (toDosDB) {
    //stablish todos
    toDos.loadToDosFromArray(toDosDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await readInput('Description:');
        toDos.createToDo(desc);
        break;
      case '2':
        toDos.fullToDoList();
        break;
      case '3': //completed
        toDos.completedPendingToDolist(true);
        break;
      case '4': //pending
        toDos.completedPendingToDolist(false);
        break;
      case '5':
        const ids = await showChecklist(toDos.arrayList);
        toDos.toggleCompleted(ids);
        console.log(ids);
        break;
      case '6':
        const id = await deleteToDoList(toDos.arrayList);
        if (id !== '0') {
          const ok = await confirm('Are you sure you want to delete the ToDo?');

          if (ok) {
            toDos.deleteToDo(id);
            console.log('You erased a ToDo');
          }
        }
        break;
    }
    saveDB(toDos.arrayList);

    await pause();
  } while (opt !== '0');
};

main();
