import { changeColorTheme } from './theme';
import { isBlank } from './helpers';
import { addTaskToList, filterList, indicateActive, updateTodoCounter } from './dom-updates';
import { addTask, changeStatus, removeTask, TASK_STATES } from './tasks';
import { themeToggle, todoForm, todoFormInput, todoList } from './elements';

/* theme handling */
const handleThemeToggle = e => {
	const currentTheme = themeToggle.dataset.theme;
	const newTheme = currentTheme === 'light' ? 'dark' : 'light';
	changeColorTheme(newTheme);
	return newTheme;
};

/* form handling */
const handleFormSubmission = e => {
	e.preventDefault();
	const inputText = todoFormInput.value;
	if (!isBlank(inputText)) {
		todoForm.classList.remove('error');
		/* add task end element */
		const newTask = addTask(inputText);
		addTaskToList(newTask);
		updateTodoCounter();
		/* clear input */
		todoFormInput.value = '';
	} else {
		todoForm.classList.add('error');
	}
};

/* task handling */
const handleTaskSelection = e => {
	const button = e.target;
	const isChecked = button.getAttribute('aria-checked') === 'true' ? true : false;
	const taskNewStatus = !isChecked ? TASK_STATES.completed : TASK_STATES.active;
	button.setAttribute('aria-checked', !isChecked);
	const parentTask = button.closest('.task');
	const taskId = parentTask.dataset.id;
	parentTask.dataset.status = taskNewStatus;
	changeStatus(taskId, taskNewStatus);
	updateTodoCounter();
};

const handleTaskDeletion = e => {
	const deleteBtn = e.target;
	const parentTask = deleteBtn.closest('.task');
	const taskId = parentTask.dataset.id;
	removeTask(taskId);
	parentTask.remove();
	updateTodoCounter();
};

/* action buttons handling */
const handleFilterButton = e => {
	const filter = e.target.dataset.filter;
	indicateActive(e.target);
	filterList(filter);
};

const handleClearCompletedButton = e => {
	const allTasks = todoList.querySelectorAll('.task');
	for (const task of allTasks) {
		if (task.dataset.status === TASK_STATES.completed) {
			removeTask(task.dataset.id);
			task.remove();
		}
	}
	updateTodoCounter();
};

export {
	handleThemeToggle,
	handleFormSubmission,
	handleTaskSelection,
	handleTaskDeletion,
	handleFilterButton,
	handleClearCompletedButton,
};
