const todoForm = document.querySelector('.todo__form');
const todoInput = document.querySelector('.todo__input');
const todoLists = document.querySelectorAll('.todo__list');
let tasks = [];
function renderTasks() {
    const allList = todoLists[0];
    const activeList = todoLists[1];
    const completedList = todoLists[2];

    allList.innerHTML = '';
    activeList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(function (task) {
        const taskHTML = `
            <div class="todo__item">
                <input
                    type="checkbox"
                    data-id="${task.id}"
                    ${task.completed ? 'checked' : ''}
                >
                <span>${task.text}</span>
                <button type="button">Delete</button>
            </div>
        `;

        allList.innerHTML += taskHTML;

        if (task.completed === false) {
            activeList.innerHTML += taskHTML;
        }

        if (task.completed === true) {
            completedList.innerHTML += taskHTML;
        }
    });
}

todoLists.forEach(function (todoList) {
    todoList.addEventListener('change', function (event) {
        if (event.target.type === 'checkbox') {
            const taskId = Number(event.target.dataset.id);

            const task = tasks.find(function (task) {
                return task.id === taskId;
            });

            task.completed = event.target.checked;

            renderTasks();
        }
    });
});
todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = todoInput.value;
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.unshift(task);
    renderTasks();
    todoInput.value = '';
    todoInput.focus();
});