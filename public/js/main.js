$(document).ready(function() {
	$('li.menu').click(function() {$('.main-nav').slideToggle();});
	});
	$(function () {
	$("#slider").responsiveSlides({
		auto: false,
		pager: false,
		nav: true,
		speed: 500
	});
	$(".intro-info a.button").click(function(e) {
		$(".description").fadeToggle(400);
		e.preventDefault();
	});
	$("span.menu").click(function() {
		$("header").toggleClass("show");
	});
	$(".intro-info .close").click(function(e) {
		$(".description").fadeToggle(400);
		e.preventDefault();
	});
	$(".get-invite").click(function(e) {
		$(".invite").slideToggle(400);
		e.preventDefault();
	});
	$("header .close").click(function(e) {
		$(".invite").slideToggle(400);
		e.preventDefault();
	});
	$(function(){
		$('#Field3').click(function() {
		if($(this).is(':checked')){
		$(".question").slideToggle(400);}
		else{$(".question").slideToggle(400);}
		});
	});
	$(function(){
		$('#Field4').click(function() {
		if($(this).is(':checked')){
		$(".demo").slideToggle(400);}
		else{$(".demo").slideToggle(400);}
		});
	});
	$(function(){
		$('#Field2').click(function() {
		if($(this).is(':checked')){
		$(".meeting").slideToggle(400);}
		else{$(".meeting").slideToggle(400);}
		});
	});
	
	$('[placeholder]').focus(function() {
  var input = $(this);
  if (input.val() == input.attr('placeholder')) {
    input.val('');
    input.removeClass('placeholder');
  }
}).blur(function() {
  var input = $(this);
  if (input.val() == '' || input.val() == input.attr('placeholder')) {
    input.addClass('placeholder');
    input.val(input.attr('placeholder'));
  }
}).blur().parents('form').submit(function() {
  $(this).find('[placeholder]').each(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
    }
  })
});
	
	
	var offset = $('#main').offset();
	$(window).scroll(function () {
	var scrollTop = $(window).scrollTop();
	if(offset.top<scrollTop) {$('header').addClass('fixed');}
	else {$('header').removeClass('fixed');}
  });
  
  $('.features ul li.left, .process .story-details').bind('inview', function (event, visible) {
  if (visible === true) {
    $(this).addClass('in-left');
  } else {
    $(this).addClass('show');
  }
});

$('.features ul li.right, .process .images').bind('inview', function (event, visible) {
  if (visible === true) {
    $(this).addClass('in-right');
  } else {
    $(this).addClass('show');
  }
});

$('.process p.call-out').bind('inview', function (event, visible) {
  if (visible === true) {
    $(this).addClass('in-down');
  } else {
    $(this).addClass('show');
  }
});
  
});
$(window).resize(function(){
   var width = $(window).width();
   if(width >= 300 && width <= 767){
       $(".main-nav").css("display","none");
   }
   else{
       $(".main-nav").css("display","block");
   }
})
.resize();//trigger the resize event on page load.;
$(function(){
  var ua = navigator.userAgent,
    isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
  $(function(){
    if (isMobileWebkit) {
      $('.intro-area').stellar({
        scrollProperty: 'transform',
        horizontalScrolling: false
      });
    } else {
      $.stellar({
        horizontalScrolling: false
      });
    }
  });
})();