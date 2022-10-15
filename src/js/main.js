import { handleThemeToggle, loadTheme } from './theme';
const themeToggle = document.querySelector('.theme-toggle');
const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('.todo-form');
const todoFormInput = todoForm.querySelector('.todo-form__input');
const todoFormSubmit = todoForm.querySelector('button[type=submit]');

// task creation
const createTaskElement = ({ id, content }) => {
	const newTask = document.createElement('li');
	newTask.classList.add('task');
	const checkboxButton = createCheckboxButton(id);
	const taskLabel = createTaskLabel(id, content);
	const deleteButton = createDeleteTaskButton(id);
	newTask.appendChild(checkboxButton);
	newTask.appendChild(taskLabel);
	newTask.appendChild(deleteButton);
	return newTask;
};

const createCheckboxButton = taskId => {
	const checkboxButton = document.createElement('button');
	checkboxButton.classList.add('check-button');
	checkboxButton.setAttribute('role', 'checkbox');
	checkboxButton.setAttribute('aria-labelledby', taskId);
	checkboxButton.setAttribute('aria-checked', false);
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
	deleteButton.classList.add('task__delete-button');
	deleteButton.setAttribute('aria-describedby', taskId);
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

// form handling
const handleFormSubmission = e => {
	e.preventDefault();
	const inputText = todoFormInput.value;
	if (!isBlank(inputText)) {
		todoForm.classList.remove('error');
		const newTask = createTaskElement({ id: generateId(), content: inputText });
		todoList.appendChild(newTask);
		todoFormInput.value = '';
	} else {
		todoForm.classList.add('error');
	}
};

/* TODO: generating id using uuid */
const generateId = () => {
	return Math.random();
};

const isBlank = value => value === '';

themeToggle.addEventListener('click', handleThemeToggle);
todoFormSubmit.addEventListener('click', handleFormSubmission);
todoFormInput.addEventListener('focusin', e => todoForm.classList.remove('error'));

loadTheme();
