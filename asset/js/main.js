
$(function(){
  var $page = $('#container'),
      options = {
        debug: true,
        prefetch: true,
        cacheLength: 2,
        onStart: {
          duration: 1500,
          render: function ($container) {

            $container.addClass('is-exiting');
            containerFadeOut();
         
            if ( $('.fp-enabled').length ) {
              setTimeout (function () {
                $.fn.fullpage.destroy('all');
              }, 1000);
            }
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content

            $container.html($newContent);
            
            containerFadeIn();
            $container.onPageLoad();

          }
        },
        onAfter: function($container) {
          var screenHeight = $(window).height();
          var mainscreen = '#mainscreen';
          $(mainscreen).css('height', screenHeight+'px');
          defaultMoonPos();
          defaultManPos();
          $('#play').on('click',function(){
            mainAnimation();
          });
        }      
      },
      smoothState = $page.smoothState(options).data('smoothState');


$.fn.onPageLoad = function() {
    if ($('#index').length) {
      mainAnimation();
      $('#play').on('click',function(){
        mainAnimation();
      })
    } else if ($('#about').length) {
      $('#fullpage').fullpage({
          'verticalCentered': true,
          'css3': true,
          'navigation': true,
          'navigationPosition': 'right'
      });
    } else if ($('#works').length) {
      $('#fullpage2').fullpage({
              menu: '#menu',
              'navigation': true,
              'navigationPosition': 'right',
              slidesNavigation: true,
              slidesNavPosition: 'bottom',
              onLeave: function(index, nextIndex, direction){
                arrowFadeOut();
              },
              afterLoad: function(anchorLink, index){
                arrowFadeIn();
                
              },
              afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
                arrowFadeIn();
              },
              onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
                  //arrowFadeOut();
              }
      });
    }
}
$page.onPageLoad();

$(window).on('load resize', function(){
  var screenHeight = $(window).height();
  var mainscreen = '#mainscreen';
  $(mainscreen).css('height', screenHeight+'px');
  defaultMoonPos();
  defaultManPos();
});

function loadImages() {
    var $img = $('img');
    var imgNum = $('img').length;
    var imgCount = 0;
    console.log(imgNum);
    for (var i = 0; i < imgNum; i += 1) {
      var createImg = new Image();
      $(createImg).error(function(){
          imgCount += 1;
          //console.log('error');
      }).load(function(){
          imgCount += 1;
          //console.log('img loaded');
      });
      createImg.src = $img[i].src;
    }
}

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

function containerFadeOut() {
  $page.append('<div id="loading"><img src="/asset/img/loading.gif"></div>');
   tl = new TimelineLite();
   tl.set("#main", {opacity:1,scale:1})
   .to("#main", 1, {opacity:0,scale:2,ease: Power4.easeOut, transformOrigin:"center top"});

}

function containerFadeIn() {
  loadImages();
   tl = new TimelineLite();
   tl.set("#main", {opacity:0,scale:2, transformOrigin:"center top"})
   .to("#main", 2, {opacity:1,scale:1,ease: Power4.easeOut});
}

function arrowFadeOut() {
   tl = new TimelineLite();
   tl.to(".fp-next", 0.5, {right:"-200px",ease: Power1.easeOut},"arrowFadeOut")
   .to(".fp-prev", 0.5, {left:"-200px",ease: Power1.easeOut},"arrowFadeOut")
   .to(".section.active .slide.active .text", 1, {opacity:0,right:"-200px",ease: Power4.easeOut},"arrowFadeIn")
  .to(".section.active .slide.active .img", 1, {opacity:0,left:"-200px",ease: Power4.easeOut},"arrowFadeIn");

}

function arrowFadeIn() {
   tl = new TimelineLite();
   tl.to(".fp-next", 0.5, {right:"20px",ease: Power1.easeOut},"arrowFadeIn")
   .to(".fp-prev", 0.5, {left:"20px",ease: Power1.easeOut},"arrowFadeIn")
  .to(".section.active .slide.active .text", 1, {opacity:1,right:0,ease: Power4.easeOut},"arrowFadeIn")
  .to(".section.active .slide.active .img", 1, {opacity:1,left:0,ease: Power4.easeOut},"arrowFadeIn");
}

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
  .to("#tree", 1, {scale:1,ease: Power4.easeOut},"vanmotion")
  .to("#man", 1, {scale:1,ease: Power4.easeOut},"vanmotion");
  } else {
    tl.to("#tree", 1, {scale:1,ease: Power4.easeOut},"vanmotion")
    .to("#man", 1, {scale:1,ease: Power4.easeOut},"vanmotion");
  }
  tl.staggerTo("#message p", 1, {opacity:1,y:-20}, 0.2);
  tl.to("#iconReplay", 1, {opacity:1});
  }

});
