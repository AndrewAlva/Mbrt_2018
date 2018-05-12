	// VARS LOAD CURRENT SECTION
	var currentSectionId;

	window.onload = function(){
		Slider.loaded();
	};

	$(document).ready(function(){
		Slider.init();
		Slider.loading();

		// Set and Initialize all carousels
			var Franpos = new Carousel('#section-2', '#franpos-', '#franposBar-');
			Franpos.init();

			var Ryan = new Carousel('#section-3', '#ryan-', '#ryanBar-');
			Ryan.init();

			var Milie = new Carousel('#section-4', '#milie-', '#milieBar-');
			Milie.init();

			var Uniforms = new Carousel('#section-8', '#uniforms-', '#uniformsBar-');
			Uniforms.init();

			var POS = new Carousel('#section-9', '#POS-', '#POSBar-');
			POS.init();

			var Interiorism = new Carousel('#section-10', '#interiorism-', '#interiorismBar-');
			Interiorism.init();

			var Masters = new Carousel('#section-11', '#advertising-', '#advertisingBar-', true, '#advertisingBrandData-', '#advertisingBriefData-', '#advertisingClientData-');
			Masters.init();

			var Lucky = new Carousel('#section-13', '#webLucky-', '#webLuckyBar-');
			Lucky.init();

			var Camila = new Carousel('#section-14', '#camilaWeb-', '#camilaWebBar-');
			Camila.init();
		// END Set and Initialize all carousels

		// SWIPE DETECTION
			(function(d){var ce=function(e,n){var a=document.createEvent("CustomEvent"); a.initCustomEvent(n,true,true,e.target); e.target.dispatchEvent(a); a=null; return false }, nm=true, sp={x:0,y:0}, ep={x:0,y:0}, touch={touchstart:function(e){sp={x:e.touches[0].pageX,y:e.touches[0].pageY} }, touchmove:function(e){nm=false; ep={x:e.touches[0].pageX,y:e.touches[0].pageY} }, touchend:function(e){if(nm){ce(e,'fc') }else{var x=ep.x-sp.x,xr=Math.abs(x), y=ep.y-sp.y,yr=Math.abs(y); if(Math.max(xr,yr)>20){ce(e,(xr>yr?(x<0?'swl':'swr'):(y<0?'swu':'swd'))) } }; nm=true }, touchcancel:function(e){nm=false } }; for(var a in touch){d.addEventListener(a,touch[a],false); } })(document);
			// Swipe Left
			document.body.addEventListener('swl',function(){carouselNextProject(event);},false);
			// Swipe Right
			document.body.addEventListener('swr',function(){carouselPrevProject(event);},false);
			// Swipe Up
			document.body.addEventListener('swu',function(){Slider.next();},false);
			// Swipe Down
			document.body.addEventListener('swd',function(){Slider.prev();},false);

		//// CAROUSELS INTERACTION
			// INTERACTION BY ARROWS CLICK
			// Next Project Interaction | Arrows Nav Click
			$('#mbrtWrapper').on('click', '.rightArrow a', function(event) {
				carouselNextProject(event);
			});

			// Previous Project Interaction | Arrows Nav Click
			$('#mbrtWrapper').on('click', '.leftArrow a', function(event) {
				carouselPrevProject(event);
			});

			// INTERACTION BY BOTTOM NAV BARS
			$('#mbrtWrapper').on('click', '.singleBar', function(event) {
				event.preventDefault();
				var projectId = $(this).data('loadprojectid');

				carouselGoToProject(projectId);
			});
			
			// INTERACTION BY KEYBOARD ARROWS
			$(document).on('keydown', function(event) {
				// RIGHT ARROW INTERACTION (KEYCODE = 39)
				if (event.keyCode == 39){
					carouselNextProject(event);
				}

				// LEFT ARROW INTERACTION (KEYCODE = 37)
				if (event.keyCode == 37){
					carouselPrevProject(event);
				}
			});

			function carouselNextProject(event){
				event.preventDefault();
				switch (Slider.sectionActive){
					case 2:
						Franpos.next();
						break;

					case 3:
						Ryan.next();
						break;

					case 4:
						Milie.next();
						break;

					case 8:
						Uniforms.next();
						break;

					case 9:
						POS.next();
						break;

					case 10:
						Interiorism.next();
						break;

					case 11:
						Masters.next();
						break;

					case 13:
						Lucky.next();
						break;

					case 14:
						Camila.next();
						break;
				}
			}

			function carouselPrevProject(event){
				event.preventDefault();
				switch (Slider.sectionActive){
					case 2:
						Franpos.prev();
						break;

					case 3:
						Ryan.prev();
						break;

					case 4:
						Milie.prev();
						break;

					case 8:
						Uniforms.prev();
						break;

					case 9:
						POS.prev();
						break;

					case 10:
						Interiorism.prev();
						break;

					case 11:
						Masters.prev();
						break;

					case 13:
						Lucky.prev();
						break;

					case 14:
						Camila.prev();
						break;
				}
			}

			function carouselGoToProject(index){
				
				switch (Slider.sectionActive){
					case 2:
						Franpos.goTo(index);
						break;

					case 3:
						Ryan.goTo(index);
						break;

					case 4:
						Milie.goTo(index);
						break;

					case 8:
						Uniforms.goTo(index);
						break;

					case 9:
						POS.goTo(index);
						break;

					case 10:
						Interiorism.goTo(index);
						break;

					case 11:
						Masters.goTo(index);
						break;

					case 13:
						Lucky.goTo(index);
						break;

					case 14:
						Camila.goTo(index);
						break;
				}
			}

			

	});
	

