import { filterBtns, todoList } from './elements';
import { removeTask } from './task-list';

const handleFilterButton = e => {
	const filter = e.target.dataset.filter;
	removeActiveFromButtons();
	e.target.classList.add('active');
	filterList(filter);
};

const handleClearCompletedButton = e => {
	clearCompletedTasks();
};

const removeActiveFromButtons = () => {
	filterBtns.forEach(btn => btn.classList.remove('active'));
};

const filterList = (filter = 'all') => {
	if (filter === 'all') {
		showAllTasks();
		return;
	}

	const allTasks = todoList.querySelectorAll('.task');
	for (const task of allTasks) {
		if (task.dataset.status === filter) task.classList.remove('hidden');
		else task.classList.add('hidden');
	}
};

const showAllTasks = () => {
	const allTasks = todoList.querySelectorAll('.task');
	for (const task of allTasks) task.classList.remove('hidden');
};

const clearCompletedTasks = () => {
	const allTasks = todoList.querySelectorAll('.task');
	for (const task of allTasks) {
		if (task.dataset.status === 'completed') {
			removeTask(task.dataset.id);
			task.remove();
		}
	}
};

export { filterList, handleFilterButton, handleClearCompletedButton };
