const themeToggle = document.querySelector('.theme-toggle');

const loadTheme = () => {
	const theme = localStorage.getItem('theme');
	if (theme) {
		document.body.setAttribute('data-theme', theme);
		themeToggle.dataset.theme = theme;
	} else {
		loadPreferedTheme();
	}
	return theme;
};

const loadPreferedTheme = () => {
	const preferedTheme =
		window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	changeColorTheme(preferedTheme);
	return preferedTheme;
};

const handleThemeToggle = e => {
	const currentTheme = themeToggle.dataset.theme;
	const newTheme = currentTheme === 'light' ? 'dark' : 'light';
	changeColorTheme(newTheme);
	return newTheme;
};

const changeColorTheme = theme => {
	themeToggle.dataset.theme = theme;
	document.body.setAttribute('data-theme', theme);
	localStorage.setItem('theme', theme);
	return theme;
};

themeToggle.addEventListener('click', handleThemeToggle);

loadTheme();
