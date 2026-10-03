// переменные
const addtask_button = document.getElementById('sub-ad');
const addtask_input = document.getElementById('inp-td');
const buttonSelectAll = document.getElementById('ch');

// контейнер для задач
const allevents_div = document.createElement('div');
allevents_div.classList.add('todo__list');

// список задач после кнопок фильтрации
document.querySelector('.todo__columns').after(allevents_div);
const FILTER_ALL = "all";
const ENTER = "Enter";
let filterType = FILTER_ALL;

// массив
let arrayTasks = [];

// вывод задач на страницу
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
// нажатие на кнопку добавления
const ClickAddTask = () => {
    event.preventDefault();
    if(addtask_input.value != ""){
        const allevents_div_add = addtask_input.value;
        addtask_input.value = "";
        AddTaskObject(allevents_div_add);}
};

// возврат к настройкам по умолчанию
const resetToDefaultPreferens = () => {
    filterType = FILTER_ALL;
    buttonSelectAll.checked = false;
    render();
};

// добавить задачу в массив
const AddTaskObject = (addtask_input) => {
    let idNewTask = arrayTasks.length ? arrayTasks.at(-1).id + 1 : 0;
    arrayTasks.push({
        id: idNewTask,
        text: addtask_input,
        isComplited: false
    });
    resetToDefaultPreferens();
};

// обработка клавиши ентер
const onKeyUpInput = (event) => {
    const keycode = event.code;
    if (keycode === ENTER) {
        const allevents_div_add = addtask_input.value;
        addtask_input.value = "";
        AddTaskObject(allevents_div_add);
    }
};

// нажатие кнопки добавить
addtask_button.addEventListener('click', ClickAddTask);

// нажатие ентер в поле ввода
addtask_input.addEventListener('keyup', onKeyUpInput);