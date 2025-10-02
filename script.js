// Persisting To-Do List with Local Storage
// All code runs after DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Tasks array - source of truth in memory (kept in sync with localStorage)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Helper: save the current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Helper: create a task <li> element (DOM only)
    function createTaskElement(taskText) {
        const li = document.createElement('li');

        // Use a span for the text so we can reliably get the task text (avoids mixing in button text)
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        // Create remove button and add required class
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // required by the automated checker

        // Remove behavior: remove from DOM and from tasks array, then update localStorage
        removeButton.onclick = function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove one matching instance from tasks array (first occurrence)
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        li.appendChild(removeButton);
        return li;
    }

    /**
     * addTask
     * Adds a new task to the DOM and (optionally) to localStorage.
     * @param {string} taskText - Text of the task. If omitted, reads from the input field.
     * @param {boolean} [save=true] - If true, also save to localStorage (used false when loading).
     */
    function addTask(taskText = null, save = true) {
        // If no taskText passed, get it from input and trim it
        if (taskText === null) {
            taskText = taskInput.value.trim();
        } else {
            taskText = String(taskText).trim();
        }

        // Validate non-empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create DOM element and append
        const li = createTaskElement(taskText);
        taskList.appendChild(li);

        // Update in-memory array and localStorage if requested
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear input and focus for convenience
        taskInput.value = "";
        taskInput.focus();
    }

    // Load tasks from localStorage and populate the DOM
    function loadTasks() {
        // tasks array already initialised from localStorage at the top
        tasks.forEach(task => addTask(task, false)); // pass false so addTask doesn't save again
    }

    // Attach event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize UI from stored tasks
    loadTasks();
});
