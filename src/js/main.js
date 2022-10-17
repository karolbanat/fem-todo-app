import { clearCompletedBtn, filterBtns, themeToggle, todoForm, todoFormInput, todoFormSubmit } from './elements';
import { loadTheme } from './theme';
import { loadTasks } from './tasks';
import {
	handleThemeToggle,
	handleFormSubmission,
	handleFilterButton,
	handleClearCompletedButton,
} from './event-handlers';

themeToggle.addEventListener('click', handleThemeToggle);
todoFormSubmit.addEventListener('click', handleFormSubmission);
todoFormInput.addEventListener('focusin', e => todoForm.classList.remove('error'));
filterBtns.forEach(btn => btn.addEventListener('click', handleFilterButton));
clearCompletedBtn.addEventListener('click', handleClearCompletedButton);

loadTheme();
loadTasks();
