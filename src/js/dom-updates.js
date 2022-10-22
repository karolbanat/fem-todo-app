import { createTaskElement } from './element-creators';
import { filterBtns, themeToggle, todoCounter, todoList } from './elements';
import { FILTER_STATES, getCurrentFilter } from './filter-state';
import { getActiveTasksCount } from './tasks';

const setTheme = theme => {
	document.body.setAttribute('data-theme', theme);
	themeToggle.dataset.theme = theme;
	return theme;
};

const addTaskToList = task => {
	const taskElement = createTaskElement(task);
	hideShowTask(taskElement);
	todoList.appendChild(taskElement);
	taskElement.classList.add('task-add-animation');
	taskElement.addEventListener(
		'animationend',
		() => {
			taskElement.classList.remove('task-add-animation');
		},
		{ once: true }
	);
	return taskElement;
};

const removeTaskElement = taskElement => {
	taskElement.classList.add('task-remove-animation');
	taskElement.addEventListener(
		'animationend',
		() => {
			taskElement.classList.remove('task-remove-animation');
			taskElement.remove();
		},
		{ once: true }
	);
};

const indicateActiveFilter = _ => {
	removeActiveClassFromButtons();
	const filter = getCurrentFilter();
	const activeFilterBtns = document.querySelectorAll(`.filter-button[data-filter=${filter}`);
	activeFilterBtns.forEach(btn => btn.classList.add('active'));
};

const removeActiveClassFromButtons = () => filterBtns.forEach(btn => btn.classList.remove('active'));

const filterList = () => {
	const filter = getCurrentFilter();

	const allTasks = todoList.querySelectorAll('.task');
	for (const task of allTasks) hideShowTask(task);

	return filter;
};

const hideShowTask = task => {
	const filter = getCurrentFilter();
	if (filter === FILTER_STATES.default || task.dataset.status === filter) task.classList.remove('hidden');
	else task.classList.add('hidden');
	return filter;
};

const getTaskPosition = taskId => {
	const taskElement = todoList.querySelector(`.task[data-id='${taskId}']`);
	const taskY = taskElement.offsetTop;
	const taskYEnd = taskElement.offsetHeight + taskY;
	return { start: taskY, end: taskYEnd };
};

const taskReorder = (relativeTaskId, taskToInsertId, direction) => {
	const relativeTaskElement = todoList.querySelector(`.task[data-id='${relativeTaskId}']`);
	const taskToInsertElement = todoList.querySelector(`.task[data-id='${taskToInsertId}']`);
	relativeTaskElement.insertAdjacentElement(direction === -1 ? 'beforebegin' : 'afterend', taskToInsertElement);
	return direction;
};

const updateTodoCounter = () => {
	const activeTasksCount = getActiveTasksCount();
	const itemsForm = activeTasksCount === 1 ? 'item' : 'items';
	todoCounter.innerText = `${activeTasksCount} ${itemsForm} left`;
	return activeTasksCount;
};

export {
	setTheme,
	addTaskToList,
	removeTaskElement,
	indicateActiveFilter,
	filterList,
	hideShowTask,
	updateTodoCounter,
	getTaskPosition,
	taskReorder,
};
