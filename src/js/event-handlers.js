import { changeColorTheme } from './theme';
import { isBlank } from './helpers';
import {
	addTaskToList,
	filterList,
	getTaskPosition,
	hideShowTask,
	indicateActiveFilter,
	taskReorder,
	updateTodoCounter,
} from './dom-updates';
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
	const { id: relativeTaskId, constraints } = findTaskOnPosition(mouseY);
	if (draggedTaskId === relativeTaskId) return;

	/* check if the mouse is in the upper or lower part of found task;
  -1 is for upper part and 1 is for lower part */
	const insertDirection = mouseY < (constraints.start + constraints.end) / 2 ? -1 : 1;
	taskReorder(relativeTaskId, draggedTaskId, insertDirection);
	if (insertDirection === -1) insertTaskBefore(relativeTaskId, draggedTaskId);
	else insertTaskAfter(relativeTaskId, draggedTaskId);
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
