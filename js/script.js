
// array element has:
//     taskContent:
//     taskDate:
//     taskTime: 
//     id: 
let arr = [];


function makeNoteElementToLi(noteElement, i) {
    // CREATE A NOTE LIST
    let li = document.createElement("li");
    li.className = "note-style";
    li.id = "note" + i;

    // text
    // create a new div element
    let newDivText = document.createElement("div");
    // and give it the content of the text
    const newText = document.createTextNode(noteElement.taskContent);
    // add the text node to the newly created div element
    newDivText.appendChild(newText);
    newDivText.className = "task-note";
    li.appendChild(newDivText);

    // date
    let newDivDate = document.createElement("div");
    const newDate = document.createTextNode(noteElement.taskDate);
    newDivDate.appendChild(newDate);
    newDivDate.className = "task-date-time";
    li.appendChild(newDivDate);

    // time
    let newDivTime = document.createElement("div");
    const newTime = document.createTextNode(noteElement.taskTime);
    newDivTime.appendChild(newTime);
    newDivTime.className = "task-date-time";
    li.appendChild(newDivTime);


    // delete
    let newDivDeleteButton = document.createElement("div");
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    newDivDeleteButton.appendChild(button);

    let delIcon = document.createElement("i");
    delIcon.className = "fas fa-trash delete";
    button.appendChild(delIcon);

    newDivDeleteButton.className = "container-delete-icon";
    li.appendChild(newDivDeleteButton);

    return li;
}



function getItems() {
    // Get element of ul
    let ul = document.querySelector("ul");
    const notes = localStorage.getItem("notes");

    if (notes != null) {
        arr = JSON.parse(notes);

        // Go over the array of notes and print them
        for (let i = 0; i < arr.length; i++) {
            let li = makeNoteElementToLi(arr[i], i);
            ul.appendChild(li);
        }
    }
}


function printError(containerStatus, type) {
    containerStatus.innerText = "Please enter " + type;
    containerStatus.style.padding = "2px 0";
    containerStatus.style.backgroundColor = "red";
}


// Read form, save note to array - print to screen and save array to local storage
function submitTask() {

    event.preventDefault();
    // Get element
    let ul = document.querySelector("ul");

    // Get input elements
    const taskContent = document.getElementById('task-content');
    const taskDate = document.getElementById('task-date');
    const taskTime = document.getElementById('task-time');
    let containerStatus = document.getElementById('container-status');

    // Date validation
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let minDate = year + "-" + month + "-" + day;

    // Form validation
    if (taskContent.value === "") {
        printError(containerStatus, "task");
    } else if (taskTime.value === "") {
        printError(containerStatus, "time");
    } else if (taskDate.value === "") {
        printError(containerStatus, "date");
    // } else if (taskDate.value < minDate) {
    //     printError(containerStatus, "correct date");
        
    } else {
        let dateValue = taskDate.value.split('-').reverse().join('/');

        containerStatus.innerText = "The task was successfully added";
        containerStatus.style.padding = "2px 0";
        containerStatus.style.backgroundColor = "green";

        // Save data from form to the object
        // שמור את המידע במערך, כל דבר במערך הוא אובייקט שמכיל את התוכן, תאריך וכו'
        id_num = arr.length;
        arr.push({
            taskContent: taskContent.value,
            taskDate: dateValue,
            taskTime: taskTime.value,
            id: "note" + id_num,
        });

        // שמור את כל המערך של האובייקטים בתוך אחסון מקומי בצורת קובץ ג'ייסון
        localStorage.setItem('notes', JSON.stringify(arr));

        // Add note to list
        let li = makeNoteElementToLi(arr[id_num], id_num);
        ul.appendChild(li);

        // Clear form
        taskContent.value = "";
        taskDate.value = "";
        taskTime.value = "";
        taskContent.focus();
    }
};

// Delete button event
document.querySelector("ul").addEventListener("click", function (e) {
    // Check if the clicked element has the class 'delete'
    if (e.target.classList.contains("delete")) {
        // Get element of notes ul list
        let ul = document.querySelector("ul");
        let containerStatus = document.getElementById('container-status');
        // Get element of the button
        let li = e.path[3];
        index = e.path[3].id - 1;

        ul.removeChild(li);
        arr.splice(index, 1);

        // Reset all ids
        let note = document.querySelectorAll("li");
        for (let i = 0; i < arr.length; i++) {
            arr[i].id = "note" + i;
            note[i].id = "note" + i;
        }

        // Update local storage
        localStorage.setItem('notes', JSON.stringify(arr));

        // Clear local storage if it is empty
        if (localStorage.notes === "[]") {
            localStorage.removeItem("notes");
        }

        containerStatus.innerText = "The task was successfully removed";
        containerStatus.style.padding = "2px 0";
        containerStatus.style.backgroundColor = "green";
    }

});



//////////////////////////////////////////////////////////
// Start here
getItems();