import { changeColorTheme } from './theme';
import { isBlank } from './helpers';
import { addTaskToList, filterList, hideShowTask, indicateActiveFilter, updateTodoCounter } from './dom-updates';
import {
	addTask,
	changeStatus,
	findTaskOnPosition,
	insertTaskAfter,
	insertTaskBefore,
	removeTask,
	TASK_STATES,
} from './tasks';
import { themeToggle, todoForm, todoFormInput, todoList } from './elements';
import { setCurrentFilter } from './filter-state';

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
	hideShowTask(parentTask);
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
	setCurrentFilter(filter);
	indicateActiveFilter();
	filterList();
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

const handleTaskDragStart = e => {
	e.dataTransfer.setData('text/plain', e.target.dataset.id);
};

const handleDragOver = e => {
	e.preventDefault();
	e.dataTransfer.dropEffect = 'move';
};

const handleTaskDrop = e => {
	e.preventDefault();
	const mouseY = e.clientY;
	const draggedTaskId = e.dataTransfer.getData('text/plain');
	const overTask = findTaskOnPosition(mouseY);
	if (draggedTaskId === overTask.dataset.id) return;

	const insertPosition = mouseY < overTask.offsetTop + overTask.offsetHeight / 2 ? 'beforebegin' : 'afterend';
	overTask.insertAdjacentElement(insertPosition, todoList.querySelector(`.task[data-id='${draggedTaskId}']`));
	if (insertPosition === 'beforebegin') insertTaskBefore(overTask.dataset.id, draggedTaskId);
	else insertTaskAfter(overTask.dataset.id, draggedTaskId);
};

export {
	handleThemeToggle,
	handleFormSubmission,
	handleTaskSelection,
	handleTaskDeletion,
	handleFilterButton,
	handleClearCompletedButton,
	handleTaskDragStart,
	handleDragOver,
	handleTaskDrop,
};
