const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tasks = [];

function addTask(name) {
  if (!name || name.trim() === "") {
    console.log("Empty task ignored.");
    return;
  }
  tasks.push(name.trim());
  console.log("Task added.");
}

function removeTask(num) {
  const index = parseInt(num, 10) - 1;
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    console.log("Invalid number.");
    return;
  }
  tasks.splice(index, 1);
  console.log("Task removed.");
}

function displayTasks() {
  if (tasks.length === 0) {
    console.log("List is empty.");
    return;
  }
  for (let i = 0; i < tasks.length; i++) {
    console.log(`${i + 1}. ${tasks[i]}`);
  }
}

function clearTasks() {
  tasks = [];
  console.log("All tasks cleared.");
}

function askCommand() {
  rl.question("Enter command (add, remove, view, clear, exit): ", (input) => {
    const cmd = input.trim().toLowerCase();

    if (cmd === "add") {
      rl.question("Task: ", (val) => {
        addTask(val);
        askCommand();
      });
    } else if (cmd === "remove") {
      displayTasks();
      rl.question("Number to remove: ", (val) => {
        removeTask(val);
        askCommand();
      });
    } else if (cmd === "view") {
      displayTasks();
      askCommand();
    } else if (cmd === "clear") {
      clearTasks();
      askCommand();
    } else if (cmd === "exit") {
      rl.close();
    } else {
      console.log("Unknown command.");
      askCommand();
    }
  });
}

askCommand();