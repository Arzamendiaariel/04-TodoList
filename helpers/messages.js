require('colors');

const showMenu = () => {
  return new Promise((resolve, reject) => {
    console.clear();
    console.log('================================'.blue);
    console.log('        Select an Option'.red);
    console.log('================================\n'.blue);
    console.log(`${'1.'.green} Create a ToDo `);
    console.log(`${'2.'.green} ToDo List `);
    console.log(`${'3.'.green} Completed ToDo List `);
    console.log(`${'4.'.green} Pending ToDo List`);
    console.log(`${'5.'.green} Complete ToDo(s)`);
    console.log(`${'6.'.green} Erase ToDo`);
    console.log(`${'0.'.green} Exit \n`);
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question('Select an Option: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(`\nPress ${'ENTER'.rainbow} to continue\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
