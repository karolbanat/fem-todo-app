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
	return taskElement;
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

const updateTodoCounter = () => {
	const activeTasksCount = getActiveTasksCount();
	const itemsForm = activeTasksCount === 1 ? 'item' : 'items';
	todoCounter.innerText = `${activeTasksCount} ${itemsForm} left`;
	return activeTasksCount;
};

export { setTheme, addTaskToList, indicateActiveFilter, filterList, hideShowTask, updateTodoCounter };
