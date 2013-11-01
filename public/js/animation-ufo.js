$(document).ready(function() {
	var motio = new Motio($('.process .ufo').find('.animation')[0], {
		fps: 24,
		frames: 48,
		vertical: true
	});
	$('.process .ufo').on('mouseenter', function (event) {
		motio[event.type === 'mouseenter' ? 'toEnd' : 'toEnd']();
	});
});