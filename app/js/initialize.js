document.addEventListener('DOMContentLoaded', () => {
	// do your setup here
		// Write credits at console
		require('./humans.js');

		// Get fade in transitions after page load
		require('./loaded-page');

		// Get noise background effect
		require('./canvas');

		// Get form interactions js
		require('./form');

		// Get footer interactions js
		require('./footer');
});
