import { todoList } from './elements';
import { createTaskElement } from './elements-creation';
import { v4 as uuidv4 } from 'uuid';

let tasks = [];

const addTask = (content, status = 'active') => {
	const task = {
		id: uuidv4(),
		content,
		status,
	};
	tasks.push(task);
	saveTasksToLocalStorage();
	return task;
};

const removeTask = taskId => {
	const removedTask = tasks.filter(task => task.id === taskId)[0] || undefined;
	tasks = tasks.filter(task => task.id !== taskId);
	saveTasksToLocalStorage();
	return removedTask;
};

const changeStatus = (taskId, status) => {
	const taskToChange = tasks.filter(task => task.id === taskId)[0] || undefined;
	if (taskToChange) {
		taskToChange.status = status;
		saveTasksToLocalStorage();
	}
	return taskToChange;
};

const loadTasks = () => {
	loadTasksFromStorage();
	for (let task of tasks) {
		const newTask = createTaskElement(task);
		todoList.appendChild(newTask);
	}
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

export { loadTasks, addTask, removeTask, changeStatus };