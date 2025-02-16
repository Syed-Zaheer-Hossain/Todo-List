let add = document.getElementById("add");
let taskContainer = document.getElementById("task-container");
let clearAll = document.getElementById("clrall");
let todoArray = JSON.parse(localStorage.getItem('todo')) || []; // Ensure it's an array

function update() {
    let st = "";
    todoArray.forEach((element, index) => {
        st += `
        <div class="task">
            <div class="texts">
                <input type="text" class="task-show" value="${element}" readonly>
            </div>
            <div class="btns">
                <button class="btn edit" onclick="edited(${index})">Edit</button>
                <button class="btn delete" onclick="deleted(${index})">Delete</button>
            </div>
        </div>
        `;
    });
    taskContainer.innerHTML = st;
}
update();

add.addEventListener("click", () => {
    let tod = document.getElementById("input-box").value.trim();
    if (tod === "") return; // Prevent empty tasks

    todoArray.push(tod); // Store as a string, not an array
    localStorage.setItem('todo', JSON.stringify(todoArray));

    update(); // Refresh UI
    document.getElementById("input-box").value = "";
});

function deleted(ind) {
    todoArray.splice(ind, 1); // Remove item from array
    localStorage.setItem('todo', JSON.stringify(todoArray));
    update(); // Refresh UI
}

function edited(ind) {
    let inputField = document.getElementsByClassName("task-show")[ind];
    let editButton = document.getElementsByClassName("edit")[ind];

    if (editButton.innerHTML === "Done") {
        inputField.setAttribute("readonly", true);
        editButton.innerHTML = "Edit";
        todoArray[ind] = inputField.value; // Update in array
        localStorage.setItem('todo', JSON.stringify(todoArray));
    } else {
        inputField.removeAttribute("readonly");
        editButton.innerHTML = "Done";
    }
}

clearAll.addEventListener('click', () => {
    todoArray = [];
    localStorage.setItem('todo', JSON.stringify(todoArray));
    update(); // Refresh UI
});
