
// Carousel object constructor
function Carousel(sectId, projPrefix, projBarPrefix, carouselOrientation, projBrandPrefix, projBriefPrefix, projClientPrefix){
	// Flag to prevent overlapping transitions between sections
	this.canScroll = true;

	// Declare if the carousel is horizontal or vertical
	this.vertical = carouselOrientation;

	// Section ID where the carousel is
	this.sectionID = sectId;

	// Projects prefix to select them with jQuery $
	this.projectsPrefix = projPrefix;

	// Projects nav bars prefix to select them with jQuery $
	this.projectsBarPrefix = projBarPrefix;

	// Projects brand data prefix to select them with jQuery $
	this.projectsBrandPrefix = projBrandPrefix;
	// Projects brief data prefix to select them with jQuery $
	this.projectsBriefPrefix = projBriefPrefix;
	// Projects client data prefix to select them with jQuery $
	this.projectsClientPrefix = projClientPrefix;

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
	};

	// Go prev project, only if there is a prev project to go
	this.prev = function(){
		var index = this.activeProject - 1;
		if (index >= 0) {
			this.goTo(index);
		} else {
			console.log("There aren't more projects backward to show");
		};
	};

	// Go next project, only if there is a next project to go
	this.next = function(){
		var index = this.activeProject + 1;
		if (index < this.projects.length) {
			this.goTo(index);
		} else {
			if (this.canScroll == true) {
				console.log("There aren't more projects forward to show, let's go to next section");
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

			// Hide the project data if this is a vertical carousel
			if (this.vertical == true) {
				this.deactiveProjectData();
			};

			// Move the current project outside the wrapper
			$(this.projectsPrefix + this.activeProject).addClass(currentProjectMove);

			// Set the new project in position to enter
			$(this.projectsPrefix + index).addClass(newProjectMove);
			$(this.projectsPrefix + index).addClass('active');

			// Make a tiny pause (100ms) until the new project is in position
			setTimeout((function(){
				// Move the new project into the wrapper
				$(this.projectsPrefix + index).removeClass(newProjectMove);

				// Show the project data after the previous data disappear if this is a vertical carousel
				if (this.vertical == true) {
					setTimeout((function(){
						this.activeNewProjectData(index);
						
					}).bind(this), this.dataDuration);
				};

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

		// Move the current project bar outside the wrapper
		$(this.projectsBarPrefix + this.activeProject).addClass(currentBarMove);

		// Set the new project bar in position to enter
		$(this.projectsBarPrefix + index).addClass(newBarMove);
		$(this.projectsBarPrefix + index).addClass('active');

		// Make a tiny pause (100ms) to set the new project bar in position
		setTimeout((function(){
			$(this.projectsBarPrefix + index).removeClass(newBarMove);

			// Wait until the new project bar is in position, then disappear the old active bar
			setTimeout((function(){
				$(this.projectsBarPrefix + this.activeProject).removeClass('active');
				$(this.projectsBarPrefix + this.activeProject).removeClass(currentBarMove);
			}).bind(this), this.duration);
		}).bind(this), 100);
	};

	// The next two functions are ONLY for vertical orientation carousels
	// There are 3 data to move: Brand Data, Brief Data and Client Data
	// So, first let's deactive the current showing data
	this.deactiveProjectData = function(){
		$(this.projectsBrandPrefix + this.activeProject).removeClass('active');
		$(this.projectsClientPrefix + this.activeProject).removeClass('active');

		// Right now there is only one type of brief, so we will only disappear and appear the same object
		$(this.projectsBriefPrefix + '0').removeClass('active');
	};

	// Then we show the new data
	this.activeNewProjectData = function(index){
		$(this.projectsBrandPrefix + index).addClass('active');
		$(this.projectsClientPrefix + index).addClass('active');

		// Right now there is only one type of brief, so we will only disappear and appear the same object
		$(this.projectsBriefPrefix + '0').addClass('active'); 
	};
}

