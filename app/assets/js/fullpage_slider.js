	var Slider = {
		// Variable user is using an iOS or a Windows device
		is_Mac: undefined,

		// Flag to prevent overlapping transitions between sections
		canScroll: true,

		// Flag to stop loading function
		isLoading: true,

		// Loading instructions array
		instructions: ["Scroll / Keyboard UP & DOWN to change of section.", "Use keyboard LEFT & RIGHT keys to switch projects."],

		// Loading instructions timing between switching
		instructionsTiming: 4000,

		// Loading portfolio quotes, in this case are the studio quotes
		mbrtQuotes: ["We are crafting the last details, almost there.", "Good things come to those who know when to wait.", "Thanks for visiting, we were expecting you."],

		// Set the array with all the screens to manipulate
		screens: [],

		// Set the names of all the screens
		screenNames: ['modrn-businss', 'wellcome', 'milie-marie', 'das-lab', 'lucky-ideas', 'voxel' ],

		// Set the screen covers id's
		screenCovers: [],

		// Set the slider main navigators objects
		mainNavs: [],

		// Declare current active section variable
		sectionActive: 0,

		// Duration of transition timing animations
		duration: 900,

		// Pause to color screen titles
		pauseColorTitle: 500,

		// Determine the scroll sensibility according to the operative system used
		sensibility: 0,

		// Loading screen function
		loading: function(){
			// Smooth intro of loading elements
			var smoothElements = $('#mbrtLoader').find('.smoothIntro');
			smoothElements.each(function(index, el) {
				setTimeout(function(){
					$(el).removeClass('smoothIntro');
				}, (index * 100));
			});

			// Write loading dots
			dotting(0);

			// SWITCH quotes text
			shuffle(Slider.mbrtQuotes);
			$('#loadingQuote').append(Slider.mbrtQuotes[0]);
			switchQuotes(1);

			// SWITCH navigation instructions
			switchInstructions(0);

			// HELPER FUNCTIONS
			// Writting Loading dots "...."
			function dotting(index){
				var dots = '....';
				var interval = 500;
				// Check if slider is still loading
				if (Slider.isLoading) {
					// WRITTING Loading dots "..."
					// Check if there are more dots to add
					if (index < dots.length) {
						// Write the next letter
						$('#loadingDots').append(dots[index++]);
						// Set the interval to write the next letter
						setTimeout(function(){
							dotting(index);
						}, interval);

						// When function is about to add the last dot => empty dots, then => start again 
						if (index == (dots.length)) {
							setTimeout(function(){
								$('#loadingDots').empty();
								
								setTimeout(function(){dotting(0);}, interval);
							}, interval );
						};
					};
				};
			}

			// Switching quotes
			function switchQuotes(index){
				if (Slider.isLoading) {
					setTimeout(function(){
						$('#loadingQuote').removeClass('active');

						setTimeout(function(){
							if (index < Slider.mbrtQuotes.length) {
								$('#loadingQuote').empty();
								$('#loadingQuote').append(Slider.mbrtQuotes[index++]);
								$('#loadingQuote').addClass('active');
								if (index == (Slider.mbrtQuotes.length)) {
									switchQuotes(0);
								} else {
									switchQuotes(index);
								};
							};
							
						}, 600);
					}, Slider.instructionsTiming);
				};
			}

			// Switching navigation instructions
			function switchInstructions(){
				if (Slider.isLoading) {
					setTimeout(function(){
						$('#loadingDescription').removeClass('active');
						$('#mbrtLoader').find('.sliderControl').removeClass('active');
						setTimeout(function(){
							$('#loadingDescription').empty();
							$('#loadingDescription').append(Slider.instructions[1]);
							$('#loadingDescription').addClass('active');
							$('#mbrtLoader').find('.carouselControl').addClass('active');

							setTimeout(function(){
								$('#loadingDescription').removeClass('active');
								$('#mbrtLoader').find('.carouselControl').removeClass('active');

								setTimeout(function(){
									$('#loadingDescription').empty();
									$('#loadingDescription').append(Slider.instructions[0]);
									$('#loadingDescription').addClass('active');
									$('#mbrtLoader').find('.sliderControl').addClass('active');

									switchInstructions();
								}, 600);

							}, Slider.instructionsTiming);

						}, 600);

					}, Slider.instructionsTiming);
				};
			}

			// Shuffle Fisher Yates algorithm
			function shuffle(array){
				var currentIndex = array.length, temporaryValue, randomIndex;

				// While there remain elements to shuffle...
				while (0 !== currentIndex) {

					// Pick a remaining element...
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;

					// And swap it with the current element.
					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}

				return array;
			}
		},

		// Hide the loading screen
		loaded: function(){
			// Active flag to prevent loading function
			Slider.isLoading = false;

			// Fade out loader
			$('#mbrtLoader').addClass('crystalLoader');
			
			// Remove loader after fadeout is complete
			setTimeout(function(){$('#mbrtLoader').remove();},1600);
		},

		// Initiate function
		init: function(){
			// Init the array of section screens to slide
			Slider.screens = $('.mainSection');
			// Init the array of main navigators
			Slider.mainNavs = $('.animatableMainNav');

			// Set the current active section
			// Get and clean URL Search
			urlSearch = window.location.search;
			urlSearch = urlSearch.replace('?', '');

			// Check if the search matches with the name of a section, if it does, get its ID and set the 'init states' with it, else set the 'init states' accord to the index section
			if (Slider.screenNames.indexOf(urlSearch) >= 0) {
				Slider.setStates(Slider.screenNames.indexOf(urlSearch));
			} else {
				Slider.setStates(0);
			};

			// Display the current active section
			$('#section-' + Slider.sectionActive).addClass('activeSlide');

			// Show the main navs
			Slider.showMainNavs();

			// Determine the OS of the device and adjust sensibility according to it
			Slider.is_Mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
			if (Slider.is_Mac) {
				Slider.sensibility = 10;
			};
		},

		// Go prev section, only if there is a prev section to go
		prev: function(){
			var index = Slider.sectionActive - 1;
			if (index < 0) {
				// console.log('You have reached the top of the slider.');
				Slider.goTo(Slider.screens.length - 1);
			} else {
				Slider.goTo(index);
			};
		},

		// Go next section, only if there is a next section to go
		next: function(){
			var index = Slider.sectionActive + 1;
			if (index >= Slider.screens.length) {
				// console.log('You have reached the bottom of the slider.');
				Slider.goTo(0);
			} else {
				Slider.goTo(index);
			};
		},

		// Navigation function
		goTo: function(index){
			// Change of section only after any transition ends
			if (Slider.canScroll && Slider.sectionActive != index) {
				// Turn on the flag to prevent overlapping section transitions
				Slider.canScroll = false;

				// Declare variables to define the direction of the animations
				var currentSectionMove;
				var newSectionMove;
				// Detect if user is going to the Next or prev section, 
				// sectionActive < index means Next
				if ( (Slider.sectionActive < index || (Slider.sectionActive == Slider.screens.length - 1 && index == 0) ) && !(Slider.sectionActive == 0 && index == Slider.screens.length - 1) ){
					currentSectionMove = 'up';
					newSectionMove = 'down';
				} else if (Slider.sectionActive > index || (Slider.sectionActive == 0 && index == Slider.screens.length - 1)){
					currentSectionMove = 'down';
					newSectionMove = 'up';
				};

				// Move the current section outside the space
				$('#section-' + Slider.sectionActive).addClass(currentSectionMove);
				// Set the new section in position to enter
				$('#section-' + index).addClass(newSectionMove);
				$('#section-' + index).addClass('activeSlide');

				// Update active right nav bar
				Slider.setMainNavs(index);

				// Decolor title of actual section
				Slider.decolorTitle('.animatedTitle-' + Slider.sectionActive);

				// Make a tiny pause(100ms) until the new section is in position
				setTimeout(function(){
					// Move the new section to show it
					$('#section-' + index).removeClass(newSectionMove);
					// Wait untill the new section is in position, 
					// then disappear the old current section, 
					// update the sectionActive var and 
					// turn on the 'canScroll' flag again
					setTimeout(function(){
						$('#section-' + Slider.sectionActive).removeClass('activeSlide');
						$('#section-' + Slider.sectionActive).removeClass(currentSectionMove);
						
						// Color the new section title
						Slider.colorTitle('.animatedTitle-' + index);

						Slider.setStates(index);
						Slider.canScroll = true;

						
						// Detect if it is a cover section, if it is go to next section
						if (Slider.screenCovers.indexOf(Slider.sectionActive) != -1 ) {
							// Make a tiny pause to color the title
							setTimeout(function(){
								// Check again if user hasn't changed of section
								// If he hasn't, scroll next section
								if (Slider.screenCovers.indexOf(Slider.sectionActive) != -1 ) Slider.next();
							},(Slider.duration * 2.5));
						};
						

					}, (Slider.duration));

				},100);

			};
		},

		// Update ['sectionActive var', 'URL search value'] 
		// according to goTo() function
		setStates: function(index){
			Slider.sectionActive = index;

			// Update the search URL
			window.history.pushState("string", "section", "?".concat(Slider.screenNames[Slider.sectionActive]));
		},

		// Showing one by one the main slider navigators
		showMainNavs: function(){
			// Set an interval between showing each nav element, 
			// first display then increase the opacity
			Slider.mainNavs.each(function(index, el) {
				setTimeout(function(){
					$(el).removeClass('hiddenMainNav');
					setTimeout(function(){
						$(el).removeClass('crystalMainNav');
					}, 10);
					
				}, index * 100);
			});

			// Active the current section nav bar
			Slider.setMainNavs(Slider.sectionActive);
		},

		// Hide one by one the main slider navigators
		hideMainNavs: function(){
			// Set an interval between hidding each nav element, 
			// first decrease opacity then hide
			Slider.mainNavs.each(function(index, el) {
				setTimeout(function(){
					$(el).addClass('crystalMainNav');
					setTimeout(function(){
						$(el).addClass('hiddenMainNav');
					}, 700);

				}, index * 100);
			});

			// Also deactivate all nav bars
			$('.navBar').removeClass('activeNavBar');
		},

		// Style the right nav bar according to the section displayed
		setMainNavs: function(index){
			// Update the 'right nav bar' active bar
			$('.navBar').not('#navBar-' + index).removeClass('activeNavBar');
			$('#navBar-' + index).addClass('activeNavBar');
		},

		// HERE BEGIN THE TEXT ANIMATIONS
		// Empty title to write animation and 
		// clean classes of the all texts to animate
		cleanAnimations: function(targetsWrapper, targetTitle){
			// Reset title
			$(targetTitle).removeClass('activeTitle');
			$(targetTitle).empty();
			// Reset text lines
			$(targetsWrapper).find('.animatedLine').removeClass('active');
			// Reset subtitles
			$(targetsWrapper).find('.animatedSubtitle').removeClass('activeTitle');
		},

		// Writting titles animation, letter by letter
		writeTitle: function(target, title, index, interval, colorCallback){
			// Check if there are more letters to write
			if (index < title.length) {
				// Write the next letter
				$(target).append(title[index++]);
				// Set the interval to write the next letter
				setTimeout(function(){
					Slider.writeTitle(target, title, index, interval, colorCallback);
				}, interval);

				// When function had written the last letter active the title 
				// and trigger the colorCallback() function
				if (index == (title.length - 1)) {
					setTimeout(function(){
						Slider.colorTitle(target, colorCallback);

					}, (interval + Slider.pauseColorTitle));
				};
			};
		},

		// Give color (from gray to black) to every title
		colorTitle: function(target){
			$(target).addClass('activeTitle');
			
		},

		// Take color (from black to gray) to every title
		decolorTitle: function(target){
			$(target).removeClass('activeTitle');
			
		},

		// Display all the text lines in order, 
		// from top to bottom with a little interval (100ms)
		showTextLines: function(targetsWrapper, callback){
			var sectionTextLines = $(targetsWrapper).find('.animatedLine');
			sectionTextLines.each(function(index, el) {
				setTimeout(function(){
					$(el).addClass('active');

					if (index == (sectionTextLines.length - 1)) {
						callback();
					};
				}, (index * 100));
			});
		},

		colorSubtitles: function(targetsWrapper, callback){
			var sectionSubtitles = $(targetsWrapper).find('.animatedSubtitle');
			sectionSubtitles.each(function(index, el) {
				setTimeout(function(){
					$(el).addClass('activeTitle');

					if (index == (sectionSubtitles.length - 1)) {
						callback();
					};
				}, (index * 100)); 
			});	
		},

		// SPECIFIC SECTION CHAINED ANIMATIONS

		// Cover sections [Branding, Brand communication and Web Design & Development]
		coverAnimation: function(){},

		// Carousel sections
		carouselAnimation: function(){}


	}

