import { filterBtns, todoList } from './elements';

const handleFilterButton = e => {
	const filter = e.target.dataset.filter;
	removeActiveFromButtons();
	e.target.classList.add('active');
	filterList(filter);
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

export { filterList, handleFilterButton };
