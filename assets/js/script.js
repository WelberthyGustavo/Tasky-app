let itens = JSON.parse(localStorage.getItem("tasks")) || [];

function Add() {
    let input = document.getElementById("label");
    let text = input.value.trim();

    if (text !== "") {
        itens.push({ text: text, checked: false }); // Add new item with "unchecked"
        saveTasks();
        updateList();
        input.value = "";
    }
}

function updateList() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let completedTasks = 0;

    itens.forEach((item, index) => {
        let li = document.createElement("li");
        li.classList.add("list-group-item");

        let divInfo = document.createElement("div");
        divInfo.classList.add("form-info");

        let checkbox = document.createElement("input");
        checkbox.classList.add("form-check-input", "me-1");
        checkbox.type = "checkbox";
        checkbox.checked = item.checked; // state save
        checkbox.onchange = function () {
            itens[index].checked = checkbox.checked;
            saveTasks();
            updateList(); //
        };

        let label = document.createElement("label");
        label.classList.add("form-check-label");
        label.style.margin = "0px 10px";
        label.textContent = item.text;
        label.ondblclick = function () {
            editTask(index);
        };

        if (item.checked) {
            label.style.textDecoration = "line-through";
            label.style.color = "#01aa64";
            completedTasks++; 
        }

        divInfo.appendChild(checkbox);
        divInfo.appendChild(label);

        let divOptions = document.createElement("div");
        divOptions.classList.add("form-options");

        let trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash");
        trashIcon.onclick = function () {
            removeTask(index);
        };

        divOptions.appendChild(trashIcon);

        li.appendChild(divInfo);
        li.appendChild(divOptions);

        list.appendChild(li);
    });

    updateTaskCounter(completedTasks, itens.length);
}


function updateTaskCounter(completed, total) {
    let taskCounter = document.getElementById("taskCounter");
    taskCounter.textContent = `${completed} of ${total} Tasks `;
}


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(itens));
}


function removeTask(index) {
    itens.splice(index, 1);
    saveTasks();
    updateList();
}

function editTask(index) {
    let newText = prompt("Edit task:", itens[index].text);
    if (newText !== null && newText.trim() !== "") {
        itens[index].text = newText.trim();
        saveTasks();
        updateList();
    }
}

document.addEventListener("DOMContentLoaded", updateList);
