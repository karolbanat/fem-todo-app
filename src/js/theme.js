import { setTheme } from './dom-updates';

const loadTheme = () => {
	const theme = localStorage.getItem('theme');
	return theme ? setTheme(theme) : loadPreferedTheme();
};

const loadPreferedTheme = () => {
	const preferedTheme =
		window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	return changeColorTheme(preferedTheme);
};

const changeColorTheme = theme => {
	localStorage.setItem('theme', theme);
	return setTheme(theme);
};

export { loadTheme, changeColorTheme };
