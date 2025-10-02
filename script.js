// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Step 1: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 2: Define the addTask function
    function addTask() {
        // Get the task text and trim whitespace
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button for this task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // When remove button is clicked, delete the task
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Add the new task to the list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Step 3: Attach Event Listeners
    // Click the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Press "Enter" inside the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Note: We don’t invoke addTask on DOMContentLoaded directly
    // because tasks should only be added when the user types them.
});
