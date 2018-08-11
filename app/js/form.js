// Labels states
	// Add/remove class to ".input-fx" to change behavior of its own label
		// If input is empty, <label> stays over input
		// If input has text in it, <label> moves above input
		$(".input-fx").focusout(function(){
			$(".input-fx").blur(function(){
				if( !this.value ) {
					$(this).removeClass("input-fx-filled");
				} else{
					$(this).addClass("input-fx-filled");
				}
			});
		});


// Submit validation
	// Detect if there are required inputs empty
	// Add/remove class to "inputs" which are required and are empty
		$('#mbrt-form-submit').click(function(){
			var formFilled = true;
			var requiredInputs = $('.required-input');

			for (var i = 0; i < requiredInputs.length; i++) {
				if(!requiredInputs[i].value){
					// Prevent submit form
					formFilled = false;
					console.log("You still need to fill some fields");

					// Point what fills are missing
					$(requiredInputs[i]).addClass("input-fx-filled");
				}
			};

			if(formFilled == true){
				// Submit form
				console.log("Submitting form");
				this.parentNode.submit();
			}
		});