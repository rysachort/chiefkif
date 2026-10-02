// Переменные
const addtask_button = document.getElementById('sub-ad');
const addtask_input = document.getElementById('inp-td');
const buttonSelectAll = document.getElementById('ch');

// Создаём контейнер для задач
const allevents_div = document.createElement('div');
allevents_div.classList.add('todo__list');

// Добавляем список задач после кнопок All / Active / Complete
document.querySelector('.todo__columns').after(allevents_div);

const FILTER_ALL = "all";
const ENTER = "Enter";

let filterType = FILTER_ALL;

// Создать массив
let arrayTasks = [];

// Вывести задачи на страницу
const render = () => {
    let AllTasks = '';

    arrayTasks.forEach((task) => {
        const tag = `<div class="todo__item todo-ip" data-id="${task.id}">
            <input class="todo__checkbox" type="checkbox">
            <span>${task.text}</span>
            <button class="todo__task-delete" type="button">X</button>
        </div>`;

        AllTasks += tag;
    });

    allevents_div.innerHTML = AllTasks;
};

// Нажатие на кнопку Add
const ClickAddTask = () => {
    event.preventDefault();
    const allevents_div_add = addtask_input.value;

    addtask_input.value = "";

    AddTaskObject(allevents_div_add);
};

// Вернуть настройки по умолчанию
const resetToDefaultPreferens = () => {
    filterType = FILTER_ALL;
    buttonSelectAll.checked = false;
    render();
};

// Добавить задачу в массив
const AddTaskObject = (addtask_input) => {
    let idNewTask = arrayTasks.length ? arrayTasks.at(-1).id + 1 : 0;

    arrayTasks.push({
        id: idNewTask,
        text: addtask_input,
        isComplited: false
    });

    resetToDefaultPreferens();
};

// Обработка клавиши Enter
const onKeyUpInput = (event) => {
    const keycode = event.code;

    if (keycode === ENTER) {
        const allevents_div_add = addtask_input.value;

        addtask_input.value = "";

        AddTaskObject(allevents_div_add);
    }
};

// Нажатие на кнопку Add
addtask_button.addEventListener('click', ClickAddTask);

// Нажатие Enter в поле ввода
addtask_input.addEventListener('keyup', onKeyUpInput);