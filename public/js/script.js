var submitButton = document.getElementById("submit-button");
var notesGrid = document.getElementById("grid-main-div");

document.addEventListener("DOMContentLoaded", () => {

    fetchData();

});

function fetchData() {
    getAllNotesFromFile().then((data) => {
        for (let i = 0; i < data.length; i++) {
            createNote(data[i]);
        }

    })
}

submitButton.addEventListener("click", function(event) {

    var taskInput = document.getElementById("todo-input");

    if (taskInput.value == "") {
        alert("Please enter your task")
        return;
    }


    if (!isNewNoteUnique(taskInput.value)) {
        alert("Please enter unique task")
        return;
    }


    createNote(taskInput.value);
    addNoteToFile(taskInput.value);
});


var noteColors = [
    ["note-yellow", "pin-pink"],
    ["note-blue", "pin-green"],
    ["note-pink", "pin-blue"],
    ["note-purple", "pin-purple"],
    ["note-green", "pin-yellow"]
];




function createNote(note) {
    noteText = note.task;
    var randomColors = Math.floor(Math.random() * noteColors.length);

    // new elements
    var noteDiv = document.createElement("div");
    var noteP = document.createElement("p");
    var notePinDiv = document.createElement("div");
    var editInput = document.createElement("input");
    var actionDiv = document.createElement("div");
    var doneButton = document.createElement("button");
    var doneIcon = document.createElement("i");
    var editButton = document.createElement("button");
    var editIcon = document.createElement("i");
    var deleteButton = document.createElement("button");
    var deleteIcon = document.createElement("i");



    notesGrid.appendChild(noteDiv);
    noteDiv.appendChild(noteP);
    noteDiv.appendChild(notePinDiv);
    noteDiv.appendChild(editInput);
    noteDiv.appendChild(actionDiv);
    actionDiv.appendChild(doneButton);
    doneButton.appendChild(doneIcon);
    actionDiv.appendChild(editButton);
    editButton.appendChild(editIcon);
    actionDiv.appendChild(deleteButton);
    deleteButton.appendChild(deleteIcon);


    //  new css classes
    noteDiv.classList.add("note");
    noteDiv.id = note.id;
    noteDiv.classList.add(noteColors[randomColors][0]);
    notePinDiv.classList.add("note-pin");
    notePinDiv.classList.add(noteColors[randomColors][1]);
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.name = "edit-input-name";
    actionDiv.classList.add("todo-actions");
    doneButton.classList.add("done");
    doneIcon.classList.add("fa-solid");
    doneIcon.classList.add("fa-check");
    editButton.classList.add("edit");
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-pen-to-square");
    deleteButton.classList.add("delete");
    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash-can");
    editInput.style.display = 'none'
    noteP.setAttribute("name", "note-p");


    deleteButton.addEventListener("click", function() {
        deleteNote(deleteButton);
    });

    doneButton.addEventListener("click", function() {
        readNote(doneButton);
    });

    editButton.addEventListener("click", function() {
        editTask(editButton);
    });

    noteP.textContent = noteText
    noteText = ""
    return noteDiv;
}

function deleteNote(deleteButton) {
    deleteNoteFromFile(deleteButton.parentElement.parentElement.id)
    var note = deleteButton.parentElement.parentElement;
    notesGrid.removeChild(note);
    location.reload();

}

function readNote(doneButton) {
    if (doneButton.classList.contains("done")) {
        doneButton.parentElement.parentElement.children[0].classList.add("line-through");
        doneButton.children[0].classList.replace("fa-check", "fa-xmark")
        doneButton.classList.replace("done", "cancel")

    } else {
        doneButton.parentElement.parentElement.children[0].classList.remove("line-through");
        doneButton.children[0].classList.replace("fa-xmark", "fa-check")
        doneButton.classList.replace("cancel", "done")
    }
}

function editTask(editButton) {
    if (editButton.parentElement.parentElement.children[0].style.display == 'none') {
        if (!isNewNoteUnique(editButton.parentElement.parentElement.children[2].value)) {
            alert("Please enter unique task");
            return;
        }
    }

    if (editButton.parentElement.parentElement.children[0].style.display == 'none') {

        if (editButton.parentElement.parentElement.children[2].value == "") {
            alert("Please enter your task")
            return;
        }


        editButton.parentElement.parentElement.children[2].style.display = 'none';
        editButton.parentElement.parentElement.children[0].style.display = 'block';
        editButton.parentElement.children[0].style.display = 'block'; // done button
        const newNote =editButton.parentElement.parentElement.children[2].value;
        const noteId =editButton.parentElement.parentElement.id
        updateNoteToFile(noteId , newNote);
        editButton.parentElement.parentElement.children[2].value;


        editButton.parentElement.parentElement.children[2].value = "";
        editButton.children[0].classList.replace("fa-check", "fa-pen-to-square");
    } else {
        editButton.parentElement.children[0].style.display = 'none'; // done button
        editButton.parentElement.parentElement.children[2].style.display = 'block';
        editButton.parentElement.parentElement.children[0].style.display = 'none';
        editButton.children[0].classList.replace("fa-pen-to-square", "fa-check");
    }
}


function isNewNoteUnique(newNote) {
    var existingNotes = document.getElementsByName("note-p")
    for (let note of existingNotes) {
        if (newNote.trim() == note.innerText.trim()) {
            return false;
        }
    }
    return true;
}

async function addNoteToFile(note) {
    try {
        const response = await fetch("http://localhost:3001/note", {
            method: "POST",
            body: JSON.stringify({
                task: note
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            location.reload();
        }
    } catch (error) {
        console.error("Error adding data:", error);
    }
}


async function updateNoteToFile(id, note) {
    try {
        const response = await fetch("http://localhost:3001/note", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                task: note
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            location.reload();
        }
    } catch (error) {
        console.error("Error adding data:", error);
    }
}


async function getAllNotesFromFile() {
    try {
        const response = await fetch("http://localhost:3001/note/getAll");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }

}


async function deleteNoteFromFile(id) {
    try {
        const response = await fetch(`http://localhost:3001/note/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            location.reload();
        }
    } catch (error) {
        console.error("Error deleting note:", error);
    }
}
