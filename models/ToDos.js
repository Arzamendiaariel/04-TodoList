const ToDo = require('./ToDo');

class ToDos {
  _list = {};

  get arrayList() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const todo = this._list[key];
      list.push(todo);
    });
    return list;
  }

  constructor() {
    this._list = {};
  }
  loadToDosFromArray(toDos = []) {
    toDos.forEach((toDo) => {
      this._list[toDo.id] = toDo;
    });
  }

  createToDo(desc = '') {
    const toDo = new ToDo(desc);
    this._list[toDo.id] = toDo;
  }

  deleteToDo(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  fullToDoList() {
    console.log();
    this.arrayList.forEach((todo, index) => {
      const idx = `${index + 1}`.green;
      const { desc, completedIn } = todo;
      const state = completedIn ? 'Completed'.green : 'Pending'.red;

      console.log(`${idx}. ${desc} :: ${state}`);
    });
  }
  completedPendingToDolist(completed = true) {
    console.log();
    let count = 0;
    this.arrayList.forEach((todo) => {
      const { desc, completedIn } = todo;
      const state = completedIn ? 'Completed'.green : 'Pending'.red;
      if (completed) {
        if (completedIn) {
          count += 1;
          console.log(
            `${(count + '.').green} ${desc} :: ${completedIn.yellow}` //CompletedIn es String??
          );
        }
      } else {
        if (!completedIn) {
          count += 1;
          console.log(`${(count + '.').green} ${desc} :: ${state}`);
        }
      }
    });
  }
  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const toDo = this._list[id];
      if (!toDo.completedIn) {
        toDo.completedIn = new Date().toISOString();
      }
    });
    this.arrayList.forEach((toDo) => {
      if (!ids.includes(toDo.id)) {
        this._list[toDo.id].completedIn = null;
      }
    });
  }
}

module.exports = ToDos;
