jQuery(document).ready(function($) {

    //BACKTOTOP SMOOTH SCROLL
	$('a.smooth').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
				scrollTop: target.offset().top
			}, 800);
			return false;
			}
		}
	});

	// FORM VALIDATION
	$('.submit').bind("click", function(e) {
		var $submitButton = $(e.target);
		var $parentForm = $submitButton.closest('form');

		if ($parentForm.valid() && $submitButton.prop('type') == 'button') {
			$submitButton.prop('type','submit');
			$submitButton.click();
			$submitButton.prop('type','button');
		}
	});

});
