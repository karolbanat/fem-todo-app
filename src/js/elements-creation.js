import { handleTaskSelection, handleTaskDeletion } from './task';

// task creation
const createTaskElement = ({ id, content, status = 'active' }) => {
	const newTask = document.createElement('li');
	/* attribute settings */
	newTask.classList.add('task');
	newTask.setAttribute('data-status', status);
	newTask.setAttribute('data-id', id);
	/* create task elements... */
	const checkboxButton = createCheckboxButton(id, status);
	const taskLabel = createTaskLabel(id, content);
	const deleteButton = createDeleteTaskButton(id);
	/* and append them to task */
	newTask.appendChild(checkboxButton);
	newTask.appendChild(taskLabel);
	newTask.appendChild(deleteButton);
	return newTask;
};

const createCheckboxButton = (taskId, status) => {
	const checkboxButton = document.createElement('button');
	/* check status to see if button should be tagged as checked */
	const isChecked = status === 'completed' ? true : false;
	/* attribute settings */
	checkboxButton.classList.add('check-button');
	checkboxButton.setAttribute('role', 'checkbox');
	checkboxButton.setAttribute('aria-labelledby', taskId);
	checkboxButton.setAttribute('aria-checked', isChecked);
	/* event listener */
	checkboxButton.addEventListener('click', handleTaskSelection);
	/* check icon */
	const checkIcon = document.createElement('img');
	checkIcon.src = './dist/images/icon-check.svg';
	checkIcon.alt = '';
	checkboxButton.appendChild(checkIcon);
	return checkboxButton;
};

const createTaskLabel = (taskId, taskText) => {
	const label = document.createElement('p');
	label.classList.add('task__label');
	label.id = taskId;
	label.innerText = taskText;
	return label;
};

const createDeleteTaskButton = taskId => {
	/* delete button */
	const deleteButton = document.createElement('button');
	/* attrubute settings */
	deleteButton.classList.add('task__delete-button');
	deleteButton.setAttribute('aria-describedby', taskId);
	/* event listener */
	deleteButton.addEventListener('click', handleTaskDeletion);
	/* hidden delete text */
	const deleteText = document.createElement('span');
	deleteText.classList.add('visually-hidden');
	deleteText.innerText = 'Delete';
	/* cross icon */
	const deleteImage = document.createElement('img');
	deleteImage.src = './dist/images/icon-cross.svg';
	deleteImage.alt = '';
	/* appending text and image to button */
	deleteButton.appendChild(deleteText);
	deleteButton.appendChild(deleteImage);
	return deleteButton;
};

export { createTaskElement, createCheckboxButton, createTaskLabel, createDeleteTaskButton };
