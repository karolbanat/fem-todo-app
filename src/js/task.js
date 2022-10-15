import { changeStatus, removeTask } from './task-list';

const handleTaskSelection = e => {
	const button = e.target;
	const isChecked = button.getAttribute('aria-checked') === 'true' ? true : false;
	const taskStatus = !isChecked ? 'completed' : 'active';
	button.setAttribute('aria-checked', !isChecked);
	const parentTask = button.closest('.task');
	parentTask.dataset.status = taskStatus;
	changeStatus(parentTask.dataset.id, taskStatus);
};

const handleTaskDeletion = e => {
	const deleteBtn = e.target;
	const parentTask = deleteBtn.closest('.task');
	const taskId = parentTask.dataset.id;
	removeTask(taskId);
	parentTask.remove();
};

export { handleTaskSelection, handleTaskDeletion };
