const textContainer = document.querySelector(".text-container");
const createButton = document.querySelector(".btn");

// Function to show notes from local storage
function showNotes(){
    textContainer.innerHTML = localStorage.getItem("notes") || "";
}
showNotes();

// Function to update local storage
function updateStorage(){
    localStorage.setItem("notes", textContainer.innerHTML);
}

// Event listener for create button
createButton.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    let img = document.createElement("img");
    img.src = "./images/delete.png";
    textContainer.appendChild(inputBox).appendChild(img);
    updateStorage();  // Update storage after adding a new note
    setNoteListeners(inputBox);  // Set keyup listener for the new note
});

// Function to set event listeners on notes
function setNoteListeners(note) {
    note.addEventListener("keyup", updateStorage);
}

// Event listener for text container (to handle delete and keyup)
textContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Setting event listeners for existing notes on page load
document.querySelectorAll(".input-box").forEach(note => {
    setNoteListeners(note);
});

// Preventing default behavior of Enter key to insert a line break instead of a new paragraph
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
