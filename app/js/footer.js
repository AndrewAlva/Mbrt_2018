// Footer "Back to top" function
var scrollTopTrigger = $('#scrollTopTrigger');

if(typeof scrollTopTrigger !== 'undefined'){
	scrollTopTrigger.on('click', function(event) {
		// Prevent default anchor click behavior
		event.preventDefault();

		// Using jQuery's animate() method to add smooth page scroll
		// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
		$('.pageWrapper').animate({
			scrollTop: 0
		}, 2000, "easeInOutQuint");
    });
}