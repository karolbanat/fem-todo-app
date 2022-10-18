import { v4 as uuidv4 } from 'uuid';
import { addTaskToList, getTaskPosition, updateTodoCounter } from './dom-updates';
import { todoList } from './elements';

const TASK_STATES = {
	active: 'active',
	completed: 'completed',
};
let tasks = [];

const addTask = (content, status = TASK_STATES.active) => {
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
	const removedTask = tasks.find(task => task.id === taskId) || {};
	tasks = tasks.filter(task => task.id !== taskId);
	saveTasksToLocalStorage();
	return removedTask;
};

const changeStatus = (taskId, status) => {
	const taskToChange = tasks.find(task => task.id === taskId) || {};
	if (taskToChange) {
		taskToChange.status = status;
		saveTasksToLocalStorage();
	}
	return taskToChange;
};

const getActiveTasksCount = () => tasks.filter(task => task.status === TASK_STATES.active).length;

const findTaskOnPosition = posY => {
	for (const task of tasks) {
		const { start, end } = getTaskPosition(task.id);
		/* return task id with the top and bottom y coordinate */
		if (start < posY && posY <= end) return { id: task.id, constraints: { start, end } };
	}
	return null;
};

const insertTaskBefore = (relativeTaskId, insertTaskId) => {
	const taskToMove = removeTask(insertTaskId);
	const idx = getTaskIndex(relativeTaskId);
	tasks.splice(Math.max(0, idx), 0, taskToMove);
	saveTasksToLocalStorage();
	return idx;
};

const insertTaskAfter = (relativeTaskId, insertTaskId) => {
	const taskToMove = removeTask(insertTaskId);
	const idx = getTaskIndex(relativeTaskId);
	tasks.splice(Math.min(tasks.length, idx + 1), 0, taskToMove);
	saveTasksToLocalStorage();
	return idx + 1;
};

const getTaskIndex = taskId => tasks.findIndex(task => task.id === taskId);

const loadTasks = () => {
	loadTasksFromStorage();
	/* adding task elements to DOM */
	for (let task of tasks) addTaskToList(task);
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

export {
	TASK_STATES,
	loadTasks,
	addTask,
	removeTask,
	changeStatus,
	getActiveTasksCount,
	findTaskOnPosition,
	insertTaskBefore,
	insertTaskAfter,
};
