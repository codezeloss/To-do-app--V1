"use strict";

const input = document.querySelector(".input");
const submit = document.querySelector(".add");

const tasksContainer = document.querySelector(".tasks");

const taskTitle = document.querySelector(".task-title");
const taskDate = document.querySelector(".date");
const checkBtn = document.getElementById("check");
const deleteBtn = document.getElementById("delete");

// Array
let arrayOfTasks = [];

// Check if there are tasks in the local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

// Delete Task
tasksContainer.addEventListener("click", function (e) {
  // Delete Task
  if (e.target.classList.contains("delete-icon")) {
    // Remove task from Local Storage
    deleteTaskWith(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    // Remove task from the Page
    e.target.parentElement.parentElement.remove();
  }

  // Mark Task as complete
  if (e.target.classList.contains("check-icon")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));

    e.target.parentElement.parentElement.firstElementChild.firstElementChild.classList.toggle(
      "done"
    );

    e.target.parentElement.parentElement.classList.toggle("task-done");
  }
});

const addTaskToArray = function (taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  // Push task to Array
  arrayOfTasks.push(task);

  // Add to my page
  addElementsToPageFrom(arrayOfTasks);

  // Add task to LocalStorage
  addTasksToLocalStorage(arrayOfTasks);
};

const addElementsToPageFrom = function (arr) {
  // Empty tasks Div
  tasksContainer.innerHTML = "";

  arr.forEach((task) => {
    const html = `
      <div data-id="${task.id}" class="task ${
      task.completed ? "task-done" : ""
    }">
        <div class="task-info">
          <p class="task-title ${task.completed ? "done" : ""}">${
      task.title
    }</p>
          <span class="date">${task.id}</span>
        </div>
        <div class="task-icons">
          <img
            id="delete"
            class="delete-icon"
            src="img/delete-icon.png"
            alt="delete icon"
          />
          <img
            id="check"
            class="check-icon"
            src="img/check-icon.png"
            alt="check icon"
          />
        </div>
      </div>
  `;

    // Add task to the task Div
    tasksContainer.innerHTML += html;
  });
};

const addTasksToLocalStorage = function (arr) {
  window.localStorage.setItem("tasks", JSON.stringify(arr));
};

const getDataFromLocalStorage = function () {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
};

// Trigger Get Data from local Storage Function
getDataFromLocalStorage();

const deleteTaskWith = function (taskId) {
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }

  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arrayOfTasks);
};

const toggleStatusTaskWith = function (taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
    addTasksToLocalStorage(arrayOfTasks);
  }
};
