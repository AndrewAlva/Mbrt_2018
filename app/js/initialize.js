document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');

  // Get noise background effect
  require('./canvas');

  // Get form interactions js
  require('./form');

  // Get footer interactions js
  require('./footer');
});
