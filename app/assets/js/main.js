	// VARS LOAD CURRENT SECTION
	var currentSectionId;

	window.onload = function(){
		Slider.loaded();
	};

	$(document).ready(function(){
		Slider.init();
		Slider.loading();

		// Set and Initialize all carousels
			var Franpos = new Carousel('#section-1', '#franpos-', '#franposBar-');
			Franpos.init();

			var Ryan = new Carousel('#section-2', '#ryan-', '#ryanBar-');
			Ryan.init();

			var Milie = new Carousel('#section-3', '#milie-', '#milieBar-');
			Milie.init();

			var Wellcome = new Carousel('#section-4', '#wellcome-', '#wellcomeBar-');
			Wellcome.init();

			var Lucky = new Carousel('#section-5', '#lucky-', '#luckyBar-');
			Lucky.init();

			var DasLab = new Carousel('#section-6', '#daslab-', '#daslabBar-');
			DasLab.init();

			var Voxel = new Carousel('#section-7', '#voxel-', '#voxelBar-');
			Voxel.init();
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
					case 1:
						Franpos.next();
						break;

					case 2:
						Ryan.next();
						break;

					case 3:
						Milie.next();
						break;

					case 4:
						Wellcome.next();
						break;

					case 5:
						Lucky.next();
						break;

					case 6:
						DasLab.next();
						break;

					case 7:
						Voxel.next();
						break;
				}
			}

			function carouselPrevProject(event){
				event.preventDefault();
				switch (Slider.sectionActive){
					case 1:
						Franpos.prev();
						break;

					case 2:
						Ryan.prev();
						break;

					case 3:
						Milie.prev();
						break;

					case 4:
						Wellcome.prev();
						break;

					case 5:
						Lucky.prev();
						break;

					case 6:
						DasLab.prev();
						break;

					case 7:
						Voxel.prev();
						break;
				}
			}

			function carouselGoToProject(index){
				
				switch (Slider.sectionActive){
					case 1:
						Franpos.goTo(index);
						break;

					case 2:
						Ryan.goTo(index);
						break;

					case 3:
						Milie.goTo(index);
						break;

					case 4:
						Wellcome.goTo(index);
						break;

					case 5:
						Lucky.goTo(index);
						break;

					case 6:
						DasLab.goTo(index);
						break;

					case 7:
						Voxel.goTo(index);
						break;
				}
			}
	});
	

