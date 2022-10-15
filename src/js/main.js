import { handleThemeToggle, loadTheme } from './theme';
import { themeToggle, todoForm, todoFormInput, todoFormSubmit, todoList } from './elements';
import { createTaskElement } from './elements-creation';
import { addTask, loadTasks } from './task-list';

// form handling
const handleFormSubmission = e => {
	e.preventDefault();
	const inputText = todoFormInput.value;
	if (!isBlank(inputText)) {
		todoForm.classList.remove('error');
		/* create task end element */
		const newTask = addTask(inputText);
		const taskElement = createTaskElement(newTask);
		todoList.appendChild(taskElement);
		/* clear input */
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
loadTasks();
