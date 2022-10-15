import { handleThemeToggle, loadTheme } from './theme';
import { themeToggle, todoForm, todoFormInput, todoFormSubmit, todoList } from './elements';
import { createTaskElement } from './elements-creation';
import { v4 as uuidv4 } from 'uuid';

// form handling
const handleFormSubmission = e => {
	e.preventDefault();
	const inputText = todoFormInput.value;
	if (!isBlank(inputText)) {
		todoForm.classList.remove('error');
		const newTask = createTaskElement({ id: uuidv4(), content: inputText });
		console.log(newTask);
		todoList.appendChild(newTask);
		todoFormInput.value = '';
	} else {
		todoForm.classList.add('error');
	}
};

const isBlank = value => value === '';

themeToggle.addEventListener('click', handleThemeToggle);
todoFormSubmit.addEventListener('click', handleFormSubmission);
todoFormInput.addEventListener('focusin', e => todoForm.classList.remove('error'));

loadTheme();
