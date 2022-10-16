import { todoList } from './elements';
import { createTaskElement } from './elements-creation';
import { v4 as uuidv4 } from 'uuid';
import { updateTodoCounter } from './list-actions';

let tasks = [];

const addTask = (content, status = 'active') => {
	const task = {
		id: uuidv4(),
		content,
		status,
	};
	tasks.push(task);
	saveTasksToLocalStorage();
	updateTodoCounter();
	return task;
};

const removeTask = taskId => {
	const removedTask = tasks.find(task => task.id === taskId) || {};
	tasks = tasks.filter(task => task.id !== taskId);
	saveTasksToLocalStorage();
	updateTodoCounter();
	return removedTask;
};

const changeStatus = (taskId, status) => {
	const taskToChange = tasks.find(task => task.id === taskId) || {};
	if (taskToChange) {
		taskToChange.status = status;
		saveTasksToLocalStorage();
	}
	updateTodoCounter();
	return taskToChange;
};

const getActiveTasksCount = () => {
	return tasks.filter(task => task.status === 'active').length;
};

const loadTasks = () => {
	loadTasksFromStorage();
	/* adding task elements to DOM */
	for (let task of tasks) {
		const newTask = createTaskElement(task);
		todoList.appendChild(newTask);
	}
	updateTodoCounter();
};

const loadTasksFromStorage = () => {
	const storageTasks = JSON.parse(localStorage.getItem('tasks'));
	if (storageTasks && storageTasks.length > 0) {
		for (let task of storageTasks) {
			tasks.push({ ...task });
		}
	}
};

const saveTasksToLocalStorage = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

export { loadTasks, addTask, removeTask, changeStatus, getActiveTasksCount };
