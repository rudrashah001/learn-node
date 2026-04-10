const status = require("statuses");

let tasks = [
  
  
  {
    id: 1,
    title: "Task 1",
    description: "This is task 1",
    time: "2024-06-01T10:00:00Z",
    assigned: "rudra",
    status: "inprogress",
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is task 2",
    status: "pending",
    time: "2024-06-01T10:00:00Z",
    assigned: "tirath",
    status: "pending",
  },
];

let nextId = 3;

module.exports = {
  tasks,
  getNextId: () => nextId++,
};
