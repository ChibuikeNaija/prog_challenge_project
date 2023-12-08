document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const taskDetailsModal = document.getElementById('task-details-modal');
    const modalTaskTitle = document.getElementById('modal-task-title');
    const modalTaskDescription = document.getElementById('modal-task-description');
    const modalTaskPriority = document.getElementById('modal-task-priority');
    const modalTaskDueDate = document.getElementById('modal-task-due-date');
    const closeModalButton = document.querySelector('.close');

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTask();
        updateTaskClickListener();
    });

    taskList.addEventListener('click', function (event) {
        const taskItem = event.target.closest('.task');
        if (taskItem) {
            displayTaskDetails(taskItem);
        }
    });

    closeModalButton.addEventListener('click', function () {
        taskDetailsModal.style.display = 'none';
    });

    function addTask() {
        const taskInput = document.getElementById('task-input');
        const prioritySelect = document.getElementById('priority-select');
        const dueDateInput = document.getElementById('due-date');

        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
        const dueDate = dueDateInput.value;
        const taskDescription = 'This is a task description. Add more details as needed.';

        if (taskText !== '') {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task');
            taskItem.classList.add(`priority-${priority}`);

            const taskTextElement = document.createElement('span');
            taskTextElement.textContent = taskText;

            const taskPriorityElement = document.createElement('div');
            taskPriorityElement.classList.add('priority');
            taskPriorityElement.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);

            const taskDueDateElement = document.createElement('div');
            taskDueDateElement.classList.add('due-date');
            taskDueDateElement.textContent = dueDate;

            const taskDescriptionElement = document.createElement('p');
            taskDescriptionElement.textContent = taskDescription;

            const taskButton = document.createElement('button');
            taskButton.textContent = 'Complete';
            taskButton.addEventListener('click', function () {
                toggleTaskCompletion(taskItem);
            });

            taskItem.appendChild(taskTextElement);
            taskItem.appendChild(taskPriorityElement);
            taskItem.appendChild(taskDueDateElement);
            taskItem.appendChild(taskDescriptionElement);
            taskItem.appendChild(taskButton);
            
            // Append the new task to the task list
            taskList.appendChild(taskItem);

            // Clear input fields after adding the task
            taskInput.value = '';
            prioritySelect.value = 'high';
            dueDateInput.value = '';
        }
    }

    function updateTaskClickListener() {
        const taskItems = document.querySelectorAll('.task');
        taskItems.forEach((taskItem) => {
            taskItem.addEventListener('click', function () {
                displayTaskDetails(taskItem);
            });
        });
    }

    function displayTaskDetails(taskItem) {
        modalTaskTitle.textContent = taskItem.querySelector('span').textContent;
        modalTaskDescription.textContent = taskItem.querySelector('p').textContent;
        modalTaskPriority.textContent = `Priority: ${taskItem.classList.contains('priority-high') ? 'High' : taskItem.classList.contains('priority-medium') ? 'Medium' : 'Low'}`;
        modalTaskDueDate.textContent = `Due Date: ${taskItem.querySelector('.due-date') ? taskItem.querySelector('.due-date').textContent : 'Not specified'}`;

        taskDetailsModal.style.display = 'block';
    }

    function toggleTaskCompletion(taskItem) {
        taskItem.classList.toggle('completed');
    }
});
