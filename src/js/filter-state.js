const FILTER_STATES = {
	default: 'all',
	active: 'active',
	completed: 'completed',
};
let currentFilter = FILTER_STATES.default;

const setCurrentFilter = (filter = FILTER_STATES.default) => (currentFilter = filter);

const getCurrentFilter = () => currentFilter;

export { setCurrentFilter, getCurrentFilter, FILTER_STATES };
