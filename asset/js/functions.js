$(function(){
  'use strict';
  var $page = $('#main'),
      options = {
        debug: true,
        prefetch: true,
        cacheLength: 2,
        onStart: {
          duration: 250, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
          }
        }
      },
      smoothState = $page.smoothState(options).data('smoothState');
});


$(window).on('load resize', function(){
	var screenHeight = $(window).height();
	var mainscreen = '#mainscreen';
	$(mainscreen).css('height', screenHeight+'px');
	defaultMoonPos();
	defaultManPos();
});

	function defaultMoonPos(){
		var moon = $('#moon');
		var moonWidth = moon.width();
		moon.css('marginLeft',-(moonWidth/2)+'px');
	}
	function defaultManPos(){
		var man = $('#man');
		var manWidth = man.width();
		man.css('marginLeft',-(manWidth/2)+'px');
	}

$(window).on('load', function(){

	mainAnimation();
	$('#play').on('click',function(){
		mainAnimation();
	})

function mainAnimation() {
	tl = new TimelineLite();
	tl.set("#moon", {scale:1,onComplete:defaultMoonPos})
	.set("#iconReplay", {opacity:0})
	.set("#message p", {opacity:0,y:0})
	.set("#man", {scale:1,onComplete:defaultManPos})
	.set("#moon", {scale:20})
	.set("#man", {scale:20,opacity:0})
	.set("#tree", {scale:5})
	.set(".van", {scale:20,opacity:0,marginBottom:0});

	tl.to("#moon",2, {scale:1});
	var VanNum;
	var vanLength = $('.van').length;
	var vanDelay = 2;
	for (vanNum=vanLength; 0<vanNum; vanNum--) {
		tl.set('#van'+vanNum, {opacity:1},'-='+vanDelay)
		.to('#van'+vanNum, 2, {scale:1,ease: Power4.easeOut},'-='+vanDelay)
	}
	tl.set("#man", {opacity:1});
	if (window.matchMedia('(min-width:767px)').matches) {
	tl.to("#van6", 0.5, {marginBottom:-30},"vanmotion")
	.to("#van5", 0.5, {marginBottom:-30},"vanmotion")
	.to("#van4", 0.5, {marginBottom:-30},"vanmotion")
	.to("#van3", 0.5, {marginBottom:-30},"vanmotion")
	.to("#van2", 0.5, {marginBottom:-30},"vanmotion")
	.to("#van2", 0.5, {marginBottom:-20},"vanmotion")
	.to("#van1", 0.5, {marginBottom:-10},"vanmotion")
	.to("#moon", 0.5, {marginBottom:50},"vanmotion")
	.to("#sea", 0.5, {marginBottom:-10},"vanmotion")
	.to("#tree", 0.5, {scale:1,ease: Power4.easeOut},"vanmotion")
	.to("#man", 0.5, {scale:1,ease: Power4.easeOut},"vanmotion");
	} else {
		tl.to("#tree", 0.5, {scale:1,ease: Power4.easeOut},"vanmotion")
		.to("#man", 0.5, {scale:1,ease: Power4.easeOut},"vanmotion");
	}
	tl.staggerTo("#message p", 1, {opacity:1,y:-20}, 0.2);
	tl.to("#iconReplay", 1, {opacity:1});

	}
});


