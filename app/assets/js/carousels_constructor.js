
// Carousel object constructor
function Carousel(sectId, projPrefix){
	// Flag to prevent overlapping transitions between sections
	this.canScroll = true;

	// Section ID where the carousel is
	this.sectionID = sectId;

	// Projects prefix to select them with jQuery $
	this.projectsPrefix = projPrefix;

	// Set the array with all the screens to manipulate
	this.projects = [];

	// Declare current active section variable
	this.activeProject = 0;

	// Duration of transition animations
	this.duration = 1300;

	// Duration of data transition animations
	this.dataDuration = 600;

	// Initiate function
	this.init = function(){
		// Init the array of projects images to slide
		this.projects = $(this.sectionID).find('.projectPhoto');

		// Count and display the total of slides in this project
		this.countSlides();
	};

	// Go prev project, only if there is a prev project to go
	this.prev = function(){
		var index = this.activeProject - 1;
		if (index >= 0) {
			this.goTo(index);
		} else {
			// console.log("There aren't more projects backward to show, let's go to previous section");
			Slider.prev();
		};
	};

	// Go next project, only if there is a next project to go
	this.next = function(){
		var index = this.activeProject + 1;
		if (index < this.projects.length) {
			this.goTo(index);
		} else {
			if (this.canScroll == true) {
				// console.log("There aren't more projects forward to show, let's go to next section");
				Slider.next();
			};
		};
	};

	// Navigation function, "index" is the desired project to go
	this.goTo = function(index){
		// Change of project only after any transition ends
		if (this.canScroll == true && this.activeProject != index) {
			// Turn off the flag to prevent overlapping section transitions
			this.canScroll = false;

			// Declare variables to define the direction of transition animations
			var currentProjectMove;
			var newProjectMove;

			// Detect if user is going to the Next or Prev project, first if check forward move
			if (this.activeProject < index) {
				currentProjectMove = 'left';
				newProjectMove = 'right';
			} else if (this.activeProject > index) {
				currentProjectMove = 'right';
				newProjectMove = 'left';
			};

			// Style the nav bars of the project
			this.setNavs(index);

			// Move the current project outside the wrapper
			$(this.projectsPrefix + this.activeProject).addClass(currentProjectMove);

			// Set the new project in position to enter
			$(this.projectsPrefix + index).addClass(newProjectMove);
			$(this.projectsPrefix + index).addClass('active');

			// Make a tiny pause (100ms) until the new project is in position
			setTimeout((function(){
				// Hide the slider counter until the new slide is in position
				$(this.sectionID).find('.currentSlide').addClass('crystalMainNav');

				// Move the new project into the wrapper
				$(this.projectsPrefix + index).removeClass(newProjectMove);

				// Wait until the new project is in position, then disappear the old active project, update the activeProject var and turn on the 'canScroll' flag again
				setTimeout((function(){
					$(this.projectsPrefix + this.activeProject).removeClass('active');
					$(this.projectsPrefix + this.activeProject).removeClass(currentProjectMove);

					this.setStates(index);
					this.canScroll = true;

				}).bind(this), this.duration);
			}).bind(this), 100);
		};
	};

	// Update 'active project var' according to goTo(this_slide) function result
	this.setStates = function(index){
		this.activeProject = index;

		// Update the current slide counter of the project
		this.updateCurrentSlide();
	};

	// Animate the pagination nav bars according to the new showing project. Functionality very similar as goTo() method
	this.setNavs = function(index){
		// Declare variables to define the direction of nav bars animation
		var currentBarMove;
		var newBarMove;

		// Detect if user is going to Next or Prev project, first if check forward movement
		if (this.activeProject < index) {
			currentBarMove = 'right';
			newBarMove = 'left';

		} else if (this.activeProject > index) {
			currentBarMove = 'left';
			newBarMove = 'right';
		};
	};

	// Define the number of slides of each project
	this.countSlides = function(){
		var totalSlides = this.projects.length;
		$(this.sectionID).find('.totalSlides').text(twoDigitsFormat(totalSlides));
	};

	// Show user in which slide he is
	this.updateCurrentSlide = function(){
		$(this.sectionID).find('.currentSlide').text(twoDigitsFormat(this.activeProject + 1));

		// Show the DOM element to user
		$(this.sectionID).find('.currentSlide').removeClass('crystalMainNav');
	};
}

// Format numbers to always display 2 digits, using '0' if necessary
function twoDigitsFormat(numberToFormat){
	if(numberToFormat < 10) {
		numberToFormat = "0" + numberToFormat;
	}

	return numberToFormat;
}