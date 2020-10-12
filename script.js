console.log("Welcome to your JavaScript Memory Maker!");

// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const showMe = document.getElementById("showMe");

//finding the select
const firstSelector = document.querySelector("#themes");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener("DOMContentLoaded", getMemories);
    // Add Memories event
    form.addEventListener("submit", addMemory);
    // Remove Memories event
    taskList.addEventListener("click", removeMemory);
    // Clear Memories event
    clearBtn.addEventListener("click", clearMemory);
    // Filter Memories event
    filter.addEventListener("keyup", filterMemory);
}

// Get Memories from LS
function getMemories() {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement("li");
        // Add class
        li.className = "collection-item";
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement("a");
        // Add class
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

//Timer Checker
function check() {
    if (localStorage.getItem("tasks") === null) {
        showMe.style.display = "none";
    } else {
        showMe.style.display = "block";
    }
}

const timeCheck = setInterval(check, 1000);


// Add Task
function addMemory(e) {
    const selectMem01 = firstSelector.value;
    console.log(`This is the mem ${selectMem01}`);

    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value, selectMem01);

    // Clear input
    taskInput.value = "";

    e.preventDefault();
}

// Store Memories
function storeTaskInLocalStorage(task, selectMem01) {

    let tasks;
    let memoriesSelectNum;
    if (localStorage.getItem("tasks") === null || localStorage.getItem("memoriesSelectNum") === null) {
        tasks = [];
        memoriesSelectNum = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        memoriesSelectNum = JSON.parse(localStorage.getItem("memoriesSelectNum"));
    }
    tasks.push(task);
    memoriesSelectNum.push(selectMem01);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("memoriesSelectNum", JSON.stringify(selectMem01));
}

// Remove Memories
function removeMemory(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are You Sure?")) {
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove Memories from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Memories
function clearMemory() {
    taskList.innerHTML = "";

    // Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Memories
function filterMemory(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}
