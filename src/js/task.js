const handleTaskSelection = e => {
	const button = e.target;
	const isChecked = button.getAttribute('aria-checked') === 'true' ? true : false;
	button.setAttribute('aria-checked', !isChecked);
	const parentTask = button.closest('.task');
	parentTask.dataset.status = !isChecked ? 'completed' : 'active';
};

const handleTaskDeletion = e => {
	const deleteBtn = e.target;
	const parentTask = deleteBtn.closest('.task');
	parentTask.remove();
};

export { handleTaskSelection, handleTaskDeletion };
