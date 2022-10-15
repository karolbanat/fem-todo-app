import { handleThemeToggle, loadTheme } from './theme';
import { themeToggle, todoForm, todoFormInput, todoFormSubmit, todoList } from './elements';
import { v4 as uuidv4 } from 'uuid';

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
