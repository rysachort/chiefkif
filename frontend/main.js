// переменные
const buttonAddNewTask = document.getElementById('sub-ad');
const inputNewTask = document.getElementById('inp-td');
const taskList = document.querySelector('.todo__list');
const buttonSelectAllTasks = document.getElementById('sel_all');
const buttonAllTasks = document.getElementById('btn_all_tsk');
const buttonActiveTasks = document.getElementById('btn_active_tsk');
const buttonComplitedTasks = document.getElementById('btn_completed_tsk');

// список задач после кнопок фильтрации
// document.querySelector('.todo__columns').after(allevents_div);
const FILTER_ALL = "all";
const FILTER_ACTIVE = "active";
const FILTER_COMPLITED = "complited";
const ENTER = "Enter";
const DATA_ID = "data-id";
const CHECKBOX = "checkbox";
const BUTTON = "BUTTON";
const CLASS_ACTIVE = "active";

let filterType = FILTER_ALL;

// массив
let arrayTasks = [];

// вывод задач на страницу
const render = () => {
    if (arrayTasks.length > 0) { // если добавляется первая задача то добавляем стили для кнопок фильтрации
        setStyleForCurrentTab();
    } else {

    }

    let AllTasks = '';
    arrayTasks.forEach((task) => {
        const tag = `<li class="todo__item todo-ip" data-id="${task.id}">
            <input class="todo__checkbox" type="checkbox">
            <span>${task.text}</span>
            <button class="todo__task-delete todo-ip" type="button">X</button>
        </li>`;
        AllTasks += tag;
    });
    taskList.innerHTML = AllTasks;
};

const setStyleForCurrentTab = () => {    //стили для кнопок фильтрации. если активна кнопка то она подсвечивается а остальные нет
    switch (filterType) {
        case FILTER_ALL:
            buttonAllTasks.classList.add(CLASS_ACTIVE);
            buttonActiveTasks.classList.remove(CLASS_ACTIVE);
            buttonComplitedTasks.classList.remove(CLASS_ACTIVE);
            break;
        case FILTER_ACTIVE:
            buttonAllTasks.classList.remove(CLASS_ACTIVE);
            buttonActiveTasks.classList.add(CLASS_ACTIVE);
            buttonComplitedTasks.classList.remove(CLASS_ACTIVE);
            break;
        case FILTER_COMPLITED:
            buttonAllTasks.classList.remove(CLASS_ACTIVE);
            buttonActiveTasks.classList.remove(CLASS_ACTIVE);   
            buttonComplitedTasks.classList.add(CLASS_ACTIVE);
            break;
    }
};


// нажатие на кнопку добавления
const ClickAddTask = () => {
    event.preventDefault();
        const allevents_div_add = inputNewTask.value;
        inputNewTask.value = "";
        AddTaskObject(allevents_div_add);
};

// возврат к настройкам по умолчанию
const resetToDefaultPreferens = () => {
    filterType = FILTER_ALL;
    buttonAllTasks.checked = false;
    render();
};

// добавить задачу в массив
const AddTaskObject = (addtask_input) => {
    if(addtask_input !== ""){
    let idNewTask = arrayTasks.length ? arrayTasks.at(-1).id + 1 : 0;
    arrayTasks.push({
        id: idNewTask,
        text: addtask_input,
        isComplited: false
    })};
    resetToDefaultPreferens();
};

// обработка клавиши ентер
const onKeyUpInput = (event) => {
    const keycode = event.code;
    if (keycode === ENTER) {
        const allevents_div_add = inputNewTask.value;
        inputNewTask.value = "";
        AddTaskObject(allevents_div_add);
    }
};

const onClickListTask = (event) => {
    const {target: tag} = event;
    const parentElement = tag.parentElement;
    let idParentElement = parentElement.getAttribute(DATA_ID);
    if(tag.type === CHECKBOX){
        onClickCheckboxTask(idParentElement);
    }
    if(tag.tagName === BUTTON){
        onClickDeleteTask(idParentElement);
    }
};

const onClickCheckboxTask = (idTagLi) => {
    const task = arrayTasks.find((task) => task.id === Number(idTagLi));
    task.isComplited = !task.isComplited;
    console.log(task);
    render();
};

const onClickDeleteTask = (idTagLi) => {
    arrayTasks = arrayTasks.filter((task) => task.id !== Number(idTagLi));
    render();
}

// нажатие кнопки добавить
buttonAddNewTask.addEventListener('click', ClickAddTask);

// нажатие ентер в поле ввода
inputNewTask.addEventListener('keyup', onKeyUpInput);

// нажатие на чекбокс или кнопку удалить
taskList.addEventListener('click', onClickListTask);