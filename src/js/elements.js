const themeToggle = document.querySelector('.theme-toggle');
const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('.todo-form');
const todoFormInput = todoForm.querySelector('.todo-form__input');
const todoFormSubmit = todoForm.querySelector('button[type=submit]');
const filterBtns = document.querySelectorAll('.filter-button');
const clearCompletedBtn = document.querySelector('.clear-button');
const todoCounter = document.querySelector('#todo-counter');

export { themeToggle, todoList, todoForm, todoFormInput, todoFormSubmit, filterBtns, clearCompletedBtn, todoCounter };
