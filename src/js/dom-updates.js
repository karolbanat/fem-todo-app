import { createTaskElement } from './element-creators';
import { filterBtns, themeToggle, todoCounter, todoList } from './elements';
import { getActiveTasksCount } from './tasks';

const setTheme = theme => {
	document.body.setAttribute('data-theme', theme);
	themeToggle.dataset.theme = theme;
	return theme;
};

const addTaskToList = task => {
	const taskElement = createTaskElement(task);
	todoList.appendChild(taskElement);
	return taskElement;
};

const indicateActive = button => {
	removeActiveClassFromButtons();
	button.classList.add('active');
};

const removeActiveClassFromButtons = () => filterBtns.forEach(btn => btn.classList.remove('active'));

const filterList = (filter = 'all') => {
	if (filter === 'all') {
		showAllTasks();
		return filter;
	}

	const allTasks = todoList.querySelectorAll('.task');
	for (const task of allTasks) {
		if (task.dataset.status === filter) task.classList.remove('hidden');
		else task.classList.add('hidden');
	}

	return filter;
};

const showAllTasks = () => {
	const allTasks = todoList.querySelectorAll('.task');
	for (const task of allTasks) task.classList.remove('hidden');
};

const updateTodoCounter = () => {
	const activeTasksCount = getActiveTasksCount();
	const itemsForm = activeTasksCount === 1 ? 'item' : 'items';
	todoCounter.innerText = `${activeTasksCount} ${itemsForm} left`;
	return activeTasksCount;
};

export { setTheme, addTaskToList, indicateActive, filterList, showAllTasks, updateTodoCounter };
