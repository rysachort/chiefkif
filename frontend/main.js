// переменные
const buttonAddNewTask = document.getElementById('sub-ad');
const inputNewTask = document.getElementById('inp-td');
const taskList = document.querySelector('.todo__list');
const buttonSelectAllTasks = document.getElementById('sel_all');
const buttonAllTasks = document.getElementById('btn_all_tsk');
const buttonActiveTasks = document.getElementById('btn_active_tsk');
const buttonComplitedTasks = document.getElementById('btn_completed_tsk');
const paginationNav = document.querySelector('.todo__pagination');

// список задач после кнопок фильтрации
// document.querySelector('.todo__columns').after(allevents_div);
const FILTER_ALL = "all";
const FILTER_ACTIVE = "active";
const FILTER_COMPLITED = "complited";
const ENTER = "Enter";
const DATA_ID = "data-id";
const CHECKBOX = "checkbox";
const BUTTON = "BUTTON";
const NAV = "NAV";
const CLASS_ACTIVE = "active";
const buttonDeleteCompleted = document.getElementById('del_complete');
const countInOnePage = 5;

let filterType = FILTER_ALL;

let currentPage = 1;


// массив
let arrayTasks = [];

// вывод задач на страницу
const render = () => {

    updateControls();
    if (arrayTasks.length > 0) { // если добавляется первая задача то добавляем стили для кнопок фильтрации
        setDisabledForTabs(false); // кнопки кликабельни
        setStyleForCurrentTab(); // подсветка текущего фильтра
    } else {
        setDisabledForTabs(true);
        removeStyleFromTabs();
    }
    countTasks();
    let AllTasks = '';
    let calcPagination = 0;
    startPage().forEach((task) => {
        const tag = `<li class="todo__item todo-ip" data-id="${task.id}">
            <input class="todo__checkbox" type="checkbox" ${task.isComplited ? 'checked' : ''}>
            <span>${task.text}</span>
            <button class="todo__task-delete todo-ip" type="button">X</button>
        </li>`;
        AllTasks += tag;
        calcPagination += 1;
        // console.log(calcPagination);
    });
    taskList.innerHTML = AllTasks;
    howManyPages();
};

// состояние чекбокса select all и кнопки delete comp
const updateControls = () => {
    const hasTasks = arrayTasks.length > 0;
    const hasCompleted = arrayTasks.some((task) => task.isComplited);
    const isAllCompleted = hasTasks && arrayTasks.every((task) => task.isComplited);

    buttonSelectAllTasks.disabled = !hasTasks;
    buttonSelectAllTasks.checked = isAllCompleted;
    buttonDeleteCompleted.disabled = !hasCompleted;
};

// какие задачи показывать в зависимости от выбранного фильтра
const getFilteredTasks = () => {
    switch (filterType) {
        case FILTER_ACTIVE:
            return arrayTasks.filter((task) => !task.isComplited);
        case FILTER_COMPLITED:
            return arrayTasks.filter((task) => task.isComplited);
        default:
            return arrayTasks;
    }
};

const countTasks = () => {
    buttonAllTasks.textContent = `All(${arrayTasks.length})`;
    buttonActiveTasks.textContent = `Active(${arrayTasks.filter((task) => !task.isComplited).length})`;
    buttonComplitedTasks.textContent = `Complete(${arrayTasks.filter((task) => task.isComplited).length})`;
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

// блокируем или разблокируем кнопки фильтров
const setDisabledForTabs = (isDisabled) => {
    buttonAllTasks.disabled = isDisabled;
    buttonActiveTasks.disabled = isDisabled;
    buttonComplitedTasks.disabled = isDisabled;
};

// снимаем подсветку со всех кнопок
const removeStyleFromTabs = () => {
    buttonAllTasks.classList.remove(CLASS_ACTIVE);
    buttonActiveTasks.classList.remove(CLASS_ACTIVE);
    buttonComplitedTasks.classList.remove(CLASS_ACTIVE);
};


// нажатие на кнопку добавления
const ClickAddTask = (event) => {
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


const howManyPages = () => {
    let countPages = Math.ceil(getFilteredTasks().length / countInOnePage);
    // console.log(countTasksInPage);
    let divOneElement = "";
    for(let i = 0; i < countPages; i++){
        divOneElement += `<button class="todo__page todo-ip">${i + 1}</button>`;
    }
    paginationNav.innerHTML = divOneElement;

};

const startPage = () => {
    const startPageNum = (currentPage - 1) * 5;
    const endPageNum = startPageNum + countInOnePage;
    return getFilteredTasks().slice(startPageNum, endPageNum);
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
};

const onClickFilter = (type) => {
    filterType = type;
    render();
};

//  ставим всем задачам то же состояние, что у чекбокса
const onChangeSelectAll = () => {
    const isChecked = buttonSelectAllTasks.checked;
    arrayTasks.forEach((task) => {
        task.isComplited = isChecked;
    });
    render();
};

//  оставляем только невыполненные
const onClickDeleteCompleted = () => {
    arrayTasks = arrayTasks.filter((task) => !task.isComplited);
    render();
};

const onClickChangePage = (event) => {
    const {target: tag} = event;
    if(tag.tagName === BUTTON){
        console.log("kofgkd");
    }
};

// нажатие кнопки добавить
buttonAddNewTask.addEventListener('click', ClickAddTask);

// нажатие ентер в поле ввода
inputNewTask.addEventListener('keyup', onKeyUpInput);

// нажатие на чекбокс или кнопку удалить
taskList.addEventListener('click', onClickListTask);

buttonAllTasks.addEventListener('click', () => onClickFilter(FILTER_ALL));
buttonActiveTasks.addEventListener('click', () => onClickFilter(FILTER_ACTIVE));
buttonComplitedTasks.addEventListener('click', () => onClickFilter(FILTER_COMPLITED));

buttonSelectAllTasks.addEventListener('change', onChangeSelectAll);
buttonDeleteCompleted.addEventListener('click', onClickDeleteCompleted);

paginationNav.addEventListener('click', onClickChangePage);