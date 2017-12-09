var FadeTransition = Barba.BaseTransition.extend({
start: function() {

Promise
.all([this.newContainerLoading, this.fadeOut()])
.then(this.fadeIn.bind(this));
},

fadeOut: function() {
return $(this.oldContainer).animate({ opacity: 0 }).promise();
},

fadeIn: function() {
var _this = this;
var $el = $(this.newContainer);


$(this.oldContainer).hide();
$el.css({
visibility : 'visible',
opacity : 0
});


/*var src1 = '//cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.5/jquery.fullpage.min.js';
var src2 = '/asset/js/fullpage-custom.js';

$('script').each(function(){
		var scriptsrc = $(this).attr('src');
		
		if (scriptsrc == src1 || scriptsrc == src2 ){
			
			$(this).remove();
		}
		console.log(scriptsrc);
	});*/



$el.animate({ opacity: 1 }, 0, function() {
_this.done();
});
}

});

Barba.Pjax.getTransition = function() {
return FadeTransition;
};


Barba.Pjax.start();


Barba.Dispatcher.on('newPageReady', function( currentStatus, oldStatus, container, newPageRawHTML ) {





/*
if ( Barba.HistoryManager.history.length === 1 ) {
        return;
    }
   // html head parser borrowed from jquery pjax
    var $newPageHead = $( '<head />' ).html(
        $.parseHTML(
            newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
          , document
          , true
        )
    );
    var headTags = [
        "meta[name='keywords']"
      , "meta[name='description']"
      , "meta[property^='og']"
      , "meta[name^='twitter']"
      , "meta[itemprop]"
      , "link[itemprop]"
      , "link[rel='prev']"
      , "link[rel='next']"
      , "link[rel='canonical']"
    ].join(',');
    $( 'head' ).find( headTags ).remove(); // Remove current head tags
    $newPageHead.find( headTags ).appendTo( 'head' ); // Append new tags to the head
*/
$(function(){

/*var src1 = '//cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.5/jquery.fullpage.min.js';
var src2 = '/asset/js/fullpage-custom.js';





var script = document.createElement('script');
   script.src = src1;
   document.body.appendChild(script);

var script2 = document.createElement('script');
   script2.src = src2;
   document.body.appendChild(script2);*/

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
	var screenHeight = $(window).height();
	var mainscreen = '#mainscreen';
	$(mainscreen).css('height', screenHeight+'px');
	defaultMoonPos();
	defaultManPos();

$(window).on('resize', function(){
	var screenHeight = $(window).height();
	var mainscreen = '#mainscreen';
	$(mainscreen).css('height', screenHeight+'px');
	defaultMoonPos();
	defaultManPos();
});

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


//cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.5/jquery.fullpage.min.js
$(function(){
    if($('#fullpage').length){
       

!function(e,n){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(o){return n(o,e,e.document,e.Math)}):"object"==typeof exports&&exports?module.exports=n(require("jquery"),e,e.document,e.Math):n(jQuery,e,e.document,e.Math)}("undefined"!=typeof window?window:this,function(e,n,o,t,i){"use strict";var a="fullpage-wrapper",l="."+a,r="fp-responsive",s="fp-notransition",c="fp-destroyed",d="fp-enabled",f="fp-viewing",u="active",h="."+u,p="fp-completely",v="."+p,g=".section",m="fp-section",w="."+m,S=w+h,y=w+":first",x=w+":last",b="fp-tableCell",C="."+b,T="fp-auto-height",k="fp-normal-scroll",L="fp-nav",A="#"+L,O="fp-tooltip",I="."+O,E="fp-show-active",M=".slide",B="fp-slide",R="."+B,z=R+h,H="fp-slides",P="."+H,D="fp-slidesContainer",q="."+D,F="fp-table",V="fp-slidesNav",j="."+V,Y=j+" a",N="fp-controlArrow",U="."+N,X="fp-prev",W="."+X,K=N+" "+X,_=U+W,Q="fp-next",G="."+Q,J=N+" "+Q,Z=U+G,$=e(n),ee=e(o);e.fn.fullpage=function(N){function W(n,o){n||Jn(0),oo("autoScrolling",n,o);var t=e(S);N.autoScrolling&&!N.scrollBar?(ao.css({overflow:"hidden",height:"100%"}),Q(Bo.recordHistory,"internal"),go.css({"-ms-touch-action":"none","touch-action":"none"}),t.length&&Jn(t.position().top)):(ao.css({overflow:"visible",height:"initial"}),Q(!1,"internal"),go.css({"-ms-touch-action":"","touch-action":""}),t.length&&ao.scrollTop(t.position().top))}function Q(e,n){oo("recordHistory",e,n)}function G(e,n){oo("scrollingSpeed",e,n)}function ne(e,n){oo("fitToSection",e,n)}function oe(e){N.lockAnchors=e}function te(e){e?(Nn(),Un()):(Yn(),Xn())}function ie(n,o){"undefined"!=typeof o?(o=o.replace(/ /g,"").split(","),e.each(o,function(e,o){$n(n,o,"m")})):($n(n,"all","m"),n?(te(!0),Wn()):(te(!1),Kn()))}function ae(n,o){"undefined"!=typeof o?(o=o.replace(/ /g,"").split(","),e.each(o,function(e,o){$n(n,o,"k")})):($n(n,"all","k"),N.keyboardScrolling=n)}function le(){var n=e(S).prev(w);n.length||!N.loopTop&&!N.continuousVertical||(n=e(w).last()),n.length&&Ne(n,null,!0)}function re(){var n=e(S).next(w);n.length||!N.loopBottom&&!N.continuousVertical||(n=e(w).first()),n.length&&Ne(n,null,!1)}function se(e,n){G(0,"internal"),ce(e,n),G(Bo.scrollingSpeed,"internal")}function ce(e,n){var o=Bn(e);"undefined"!=typeof n?zn(e,n):o.length>0&&Ne(o)}function de(e){Ve("right",e)}function fe(e){Ve("left",e)}function ue(n){if(!go.hasClass(c)){wo=!0,mo=$.height(),e(w).each(function(){var n=e(this).find(P),o=e(this).find(R);N.verticalCentered&&e(this).find(C).css("height",En(e(this))+"px"),e(this).css("height",mo+"px"),o.length>1&&gn(n,n.find(z))}),N.scrollOverflow&&Co.createScrollBarForAll();var o=e(S),t=o.index(w);t&&se(t+1),wo=!1,e.isFunction(N.afterResize)&&n&&N.afterResize.call(go),e.isFunction(N.afterReBuild)&&!n&&N.afterReBuild.call(go)}}function he(n){var o=lo.hasClass(r);n?o||(W(!1,"internal"),ne(!1,"internal"),e(A).hide(),lo.addClass(r),e.isFunction(N.afterResponsive)&&N.afterResponsive.call(go,n)):o&&(W(Bo.autoScrolling,"internal"),ne(Bo.autoScrolling,"internal"),e(A).show(),lo.removeClass(r),e.isFunction(N.afterResponsive)&&N.afterResponsive.call(go,n))}function pe(){N.css3&&(N.css3=jn()),N.scrollBar=N.scrollBar||N.hybrid,ge(),me(),ie(!0),W(N.autoScrolling,"internal"),xn(),Vn(),"complete"===o.readyState&&nn(),$.on("load",nn)}function ve(){$.on("scroll",Ie).on("hashchange",on).blur(fn).resize(yn),ee.keydown(an).keyup(rn).on("click touchstart",A+" a",un).on("click touchstart",Y,hn).on("click",I,ln),e(w).on("click touchstart",U,dn),N.normalScrollElements&&(ee.on("mouseenter touchstart",N.normalScrollElements,function(){ie(!1)}),ee.on("mouseleave touchend",N.normalScrollElements,function(){ie(!0)}))}function ge(){var n=go.find(N.sectionSelector);N.anchors.length||(N.anchors=n.filter("[data-anchor]").map(function(){return e(this).data("anchor").toString()}).get()),N.navigationTooltips.length||(N.navigationTooltips=n.filter("[data-tooltip]").map(function(){return e(this).data("tooltip").toString()}).get())}function me(){go.css({height:"100%",position:"relative"}),go.addClass(a),e("html").addClass(d),mo=$.height(),go.removeClass(c),xe(),e(w).each(function(n){var o=e(this),t=o.find(R),i=t.length;Se(o,n),ye(o,n),i>0?we(o,t,i):N.verticalCentered&&In(o)}),N.fixedElements&&N.css3&&e(N.fixedElements).appendTo(lo),N.navigation&&Ce(),Te(),N.scrollOverflow?Co=N.scrollOverflowHandler.init(N):Ae()}function we(n,o,t){var i=100*t,a=100/t;o.wrapAll('<div class="'+D+'" />'),o.parent().wrap('<div class="'+H+'" />'),n.find(q).css("width",i+"%"),t>1&&(N.controlArrows&&be(n),N.slidesNavigation&&Pn(n,t)),o.each(function(n){e(this).css("width",a+"%"),N.verticalCentered&&In(e(this))});var l=n.find(z);l.length&&(0!==e(S).index(w)||0===e(S).index(w)&&0!==l.index())?Gn(l,"internal"):o.eq(0).addClass(u)}function Se(n,o){o||0!==e(S).length||n.addClass(u),uo=e(S),n.css("height",mo+"px"),N.paddingTop&&n.css("padding-top",N.paddingTop),N.paddingBottom&&n.css("padding-bottom",N.paddingBottom),"undefined"!=typeof N.sectionsColor[o]&&n.css("background-color",N.sectionsColor[o]),"undefined"!=typeof N.anchors[o]&&n.attr("data-anchor",N.anchors[o])}function ye(n,o){"undefined"!=typeof N.anchors[o]&&n.hasClass(u)&&Ln(N.anchors[o],o),N.menu&&N.css3&&e(N.menu).closest(l).length&&e(N.menu).appendTo(lo)}function xe(){go.find(N.sectionSelector).addClass(m),go.find(N.slideSelector).addClass(B)}function be(e){e.find(P).after('<div class="'+K+'"></div><div class="'+J+'"></div>'),"#fff"!=N.controlArrowColor&&(e.find(Z).css("border-color","transparent transparent transparent "+N.controlArrowColor),e.find(_).css("border-color","transparent "+N.controlArrowColor+" transparent transparent")),N.loopHorizontal||e.find(_).hide()}function Ce(){lo.append('<div id="'+L+'"><ul></ul></div>');var n=e(A);n.addClass(function(){return N.showActiveTooltip?E+" "+N.navigationPosition:N.navigationPosition});for(var o=0;o<e(w).length;o++){var t="";N.anchors.length&&(t=N.anchors[o]);var i='<li><a href="#'+t+'"><span></span></a>',a=N.navigationTooltips[o];"undefined"!=typeof a&&""!==a&&(i+='<div class="'+O+" "+N.navigationPosition+'">'+a+"</div>"),i+="</li>",n.find("ul").append(i)}e(A).css("margin-top","-"+e(A).height()/2+"px"),e(A).find("li").eq(e(S).index(w)).find("a").addClass(u)}function Te(){go.find('iframe[src*="youtube.com/embed/"]').each(function(){ke(e(this),"enablejsapi=1")})}function ke(e,n){var o=e.attr("src");e.attr("src",o+Le(o)+n)}function Le(e){return/\?/.test(e)?"&":"?"}function Ae(){var n=e(S);n.addClass(p),Ge(n),Je(n),N.scrollOverflow&&N.scrollOverflowHandler.afterLoad(),Oe()&&e.isFunction(N.afterLoad)&&N.afterLoad.call(n,n.data("anchor"),n.index(w)+1),e.isFunction(N.afterRender)&&N.afterRender.call(go)}function Oe(){var e=Bn(tn().section);return!e.length||e.length&&e.index()===uo.index()}function Ie(){var n;if(!N.autoScrolling||N.scrollBar){var t=$.scrollTop(),i=Be(t),a=0,l=t+$.height()/2,r=lo.height()-$.height()===t,s=o.querySelectorAll(w);if(r)a=s.length-1;else if(t)for(var c=0;c<s.length;++c){var d=s[c];d.offsetTop<=l&&(a=c)}else a=0;if(Me(i)&&(e(S).hasClass(p)||e(S).addClass(p).siblings().removeClass(p)),n=e(s).eq(a),!n.hasClass(u)){Ro=!0;var f,h,v=e(S),g=v.index(w)+1,m=An(n),y=n.data("anchor"),x=n.index(w)+1,b=n.find(z);b.length&&(h=b.data("anchor"),f=b.index()),yo&&(n.addClass(u).siblings().removeClass(u),e.isFunction(N.onLeave)&&N.onLeave.call(v,g,x,m),e.isFunction(N.afterLoad)&&N.afterLoad.call(n,y,x),$e(v),Ge(n),Je(n),Ln(y,x-1),N.anchors.length&&(so=y),Dn(f,h,y,x)),clearTimeout(Ao),Ao=setTimeout(function(){Ro=!1},100)}N.fitToSection&&(clearTimeout(Oo),Oo=setTimeout(function(){N.fitToSection&&e(S).outerHeight()<=mo&&Ee()},N.fitToSectionDelay))}}function Ee(){yo&&(wo=!0,Ne(e(S)),wo=!1)}function Me(n){var o=e(S).position().top,t=o+$.height();return"up"==n?t>=$.scrollTop()+$.height():o<=$.scrollTop()}function Be(e){var n=e>zo?"down":"up";return zo=e,Vo=e,n}function Re(n){if(bo.m[n]){var o="down"===n?re:le;if(N.scrollOverflow){var t=N.scrollOverflowHandler.scrollable(e(S)),i="down"===n?"bottom":"top";if(t.length>0){if(!N.scrollOverflowHandler.isScrolled(i,t))return!0;o()}else o()}else o()}}function ze(e){var n=e.originalEvent;N.autoScrolling&&Pe(n)&&e.preventDefault()}function He(n){var o=n.originalEvent,i=e(o.target).closest(w);if(Pe(o)){N.autoScrolling&&n.preventDefault();var a=Qn(o);Do=a.y,qo=a.x,i.find(P).length&&t.abs(Po-qo)>t.abs(Ho-Do)?!ho&&t.abs(Po-qo)>$.outerWidth()/100*N.touchSensitivity&&(Po>qo?bo.m.right&&de(i):bo.m.left&&fe(i)):N.autoScrolling&&yo&&t.abs(Ho-Do)>$.height()/100*N.touchSensitivity&&(Ho>Do?Re("down"):Do>Ho&&Re("up"))}}function Pe(e){return"undefined"==typeof e.pointerType||"mouse"!=e.pointerType}function De(e){var n=e.originalEvent;if(N.fitToSection&&ao.stop(),Pe(n)){var o=Qn(n);Ho=o.y,Po=o.x}}function qe(e,n){for(var o=0,i=e.slice(t.max(e.length-n,1)),a=0;a<i.length;a++)o+=i[a];return t.ceil(o/n)}function Fe(o){var i=(new Date).getTime(),a=e(v).hasClass(k);if(N.autoScrolling&&!fo&&!a){o=o||n.event;var l=o.wheelDelta||-o.deltaY||-o.detail,r=t.max(-1,t.min(1,l)),s="undefined"!=typeof o.wheelDeltaX||"undefined"!=typeof o.deltaX,c=t.abs(o.wheelDeltaX)<t.abs(o.wheelDelta)||t.abs(o.deltaX)<t.abs(o.deltaY)||!s;xo.length>149&&xo.shift(),xo.push(t.abs(l)),N.scrollBar&&(o.preventDefault?o.preventDefault():o.returnValue=!1);var d=i-Fo;if(Fo=i,d>200&&(xo=[]),yo){var f=qe(xo,10),u=qe(xo,70),h=f>=u;h&&c&&Re(r<0?"down":"up")}return!1}N.fitToSection&&ao.stop()}function Ve(n,o){var t="undefined"==typeof o?e(S):o,i=t.find(P),a=i.find(R).length;if(!(!i.length||ho||a<2)){var l=i.find(z),r=null;if(r="left"===n?l.prev(R):l.next(R),!r.length){if(!N.loopHorizontal)return;r="left"===n?l.siblings(":last"):l.siblings(":first")}ho=!0,gn(i,r,n)}}function je(){e(z).each(function(){Gn(e(this),"internal")})}function Ye(e){var n=e.position(),o=n.top,t=n.top>Vo,i=o-mo+e.outerHeight(),a=N.bigSectionsDestination;return e.outerHeight()>mo?(t||a)&&"bottom"!==a||(o=i):(t||wo&&e.is(":last-child"))&&(o=i),Vo=o,o}function Ne(n,o,t){if("undefined"!=typeof n){var i,a,l=Ye(n),r={element:n,callback:o,isMovementUp:t,dtop:l,yMovement:An(n),anchorLink:n.data("anchor"),sectionIndex:n.index(w),activeSlide:n.find(z),activeSection:e(S),leavingSection:e(S).index(w)+1,localIsResizing:wo};r.activeSection.is(n)&&!wo||N.scrollBar&&$.scrollTop()===r.dtop&&!n.hasClass(T)||(r.activeSlide.length&&(i=r.activeSlide.data("anchor"),a=r.activeSlide.index()),e.isFunction(N.onLeave)&&!r.localIsResizing&&N.onLeave.call(r.activeSection,r.leavingSection,r.sectionIndex+1,r.yMovement)===!1||(N.autoScrolling&&N.continuousVertical&&"undefined"!=typeof r.isMovementUp&&(!r.isMovementUp&&"up"==r.yMovement||r.isMovementUp&&"down"==r.yMovement)&&(r=We(r)),r.localIsResizing||$e(r.activeSection),N.scrollOverflow&&N.scrollOverflowHandler.beforeLeave(),n.addClass(u).siblings().removeClass(u),Ge(n),N.scrollOverflow&&N.scrollOverflowHandler.onLeave(),yo=!1,Dn(a,i,r.anchorLink,r.sectionIndex),Ue(r),so=r.anchorLink,Ln(r.anchorLink,r.sectionIndex)))}}function Ue(n){if(N.css3&&N.autoScrolling&&!N.scrollBar){var o="translate3d(0px, -"+t.round(n.dtop)+"px, 0px)";Mn(o,!0),N.scrollingSpeed?(clearTimeout(ko),ko=setTimeout(function(){_e(n)},N.scrollingSpeed)):_e(n)}else{var i=Xe(n);e(i.element).animate(i.options,N.scrollingSpeed,N.easing).promise().done(function(){N.scrollBar?setTimeout(function(){_e(n)},30):_e(n)})}}function Xe(e){var n={};return N.autoScrolling&&!N.scrollBar?(n.options={top:-e.dtop},n.element=l):(n.options={scrollTop:e.dtop},n.element="html, body"),n}function We(n){return n.isMovementUp?e(S).before(n.activeSection.nextAll(w)):e(S).after(n.activeSection.prevAll(w).get().reverse()),Jn(e(S).position().top),je(),n.wrapAroundElements=n.activeSection,n.dtop=n.element.position().top,n.yMovement=An(n.element),n.leavingSection=n.activeSection.index(w)+1,n.sectionIndex=n.element.index(w),n}function Ke(n){n.wrapAroundElements&&n.wrapAroundElements.length&&(n.isMovementUp?e(y).before(n.wrapAroundElements):e(x).after(n.wrapAroundElements),Jn(e(S).position().top),je())}function _e(n){Ke(n),e.isFunction(N.afterLoad)&&!n.localIsResizing&&N.afterLoad.call(n.element,n.anchorLink,n.sectionIndex+1),N.scrollOverflow&&N.scrollOverflowHandler.afterLoad(),n.localIsResizing||Je(n.element),n.element.addClass(p).siblings().removeClass(p),yo=!0,e.isFunction(n.callback)&&n.callback.call(this)}function Qe(e,n){e.attr(n,e.data(n)).removeAttr("data-"+n)}function Ge(n){if(N.lazyLoading){var o,t=en(n);t.find("img[data-src], img[data-srcset], source[data-src], video[data-src], audio[data-src], iframe[data-src]").each(function(){if(o=e(this),e.each(["src","srcset"],function(e,n){var t=o.attr("data-"+n);"undefined"!=typeof t&&t&&Qe(o,n)}),o.is("source")){var n=o.closest("video").length?"video":"audio";o.closest(n).get(0).load()}})}}function Je(n){var o=en(n);o.find("video, audio").each(function(){var n=e(this).get(0);n.hasAttribute("data-autoplay")&&"function"==typeof n.play&&n.play()}),o.find('iframe[src*="youtube.com/embed/"]').each(function(){var n=e(this).get(0);n.hasAttribute("data-autoplay")&&Ze(n),n.onload=function(){n.hasAttribute("data-autoplay")&&Ze(n)}})}function Ze(e){e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*")}function $e(n){var o=en(n);o.find("video, audio").each(function(){var n=e(this).get(0);n.hasAttribute("data-keepplaying")||"function"!=typeof n.pause||n.pause()}),o.find('iframe[src*="youtube.com/embed/"]').each(function(){var n=e(this).get(0);/youtube\.com\/embed\//.test(e(this).attr("src"))&&!n.hasAttribute("data-keepplaying")&&e(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")})}function en(n){var o=n.find(z);return o.length&&(n=e(o)),n}function nn(){var e=tn(),n=e.section,o=e.slide;n&&(N.animateAnchor?zn(n,o):se(n,o))}function on(){if(!Ro&&!N.lockAnchors){var e=tn(),n=e.section,o=e.slide,t="undefined"==typeof so,i="undefined"==typeof so&&"undefined"==typeof o&&!ho;n.length&&(n&&n!==so&&!t||i||!ho&&co!=o)&&zn(n,o)}}function tn(){var e=n.location.hash,o=e.replace("#","").split("/"),t=e.indexOf("#/")>-1;return{section:t?"/"+o[1]:decodeURIComponent(o[0]),slide:t?decodeURIComponent(o[2]):decodeURIComponent(o[1])}}function an(n){clearTimeout(Io);var o=e(":focus");if(!o.is("textarea")&&!o.is("input")&&!o.is("select")&&"true"!==o.attr("contentEditable")&&""!==o.attr("contentEditable")&&N.keyboardScrolling&&N.autoScrolling){var t=n.which,i=[40,38,32,33,34];e.inArray(t,i)>-1&&n.preventDefault(),fo=n.ctrlKey,Io=setTimeout(function(){pn(n)},150)}}function ln(){e(this).prev().trigger("click")}function rn(e){So&&(fo=e.ctrlKey)}function sn(e){2==e.which&&(jo=e.pageY,go.on("mousemove",vn))}function cn(e){2==e.which&&go.off("mousemove")}function dn(){var n=e(this).closest(w);e(this).hasClass(X)?bo.m.left&&fe(n):bo.m.right&&de(n)}function fn(){So=!1,fo=!1}function un(n){n.preventDefault();var o=e(this).parent().index();Ne(e(w).eq(o))}function hn(n){n.preventDefault();var o=e(this).closest(w).find(P),t=o.find(R).eq(e(this).closest("li").index());gn(o,t)}function pn(n){var o=n.shiftKey;if(yo||!([37,39].indexOf(n.which)<0))switch(n.which){case 38:case 33:bo.k.up&&le();break;case 32:if(o&&bo.k.up){le();break}case 40:case 34:bo.k.down&&re();break;case 36:bo.k.up&&ce(1);break;case 35:bo.k.down&&ce(e(w).length);break;case 37:bo.k.left&&fe();break;case 39:bo.k.right&&de();break;default:return}}function vn(e){yo&&(e.pageY<jo&&bo.m.up?le():e.pageY>jo&&bo.m.down&&re()),jo=e.pageY}function gn(n,o,t){var i=n.closest(w),a={slides:n,destiny:o,direction:t,destinyPos:o.position(),slideIndex:o.index(),section:i,sectionIndex:i.index(w),anchorLink:i.data("anchor"),slidesNav:i.find(j),slideAnchor:Fn(o),prevSlide:i.find(z),prevSlideIndex:i.find(z).index(),localIsResizing:wo};return a.xMovement=On(a.prevSlideIndex,a.slideIndex),a.localIsResizing||(yo=!1),N.onSlideLeave&&!a.localIsResizing&&"none"!==a.xMovement&&e.isFunction(N.onSlideLeave)&&N.onSlideLeave.call(a.prevSlide,a.anchorLink,a.sectionIndex+1,a.prevSlideIndex,a.direction,a.slideIndex)===!1?void(ho=!1):(o.addClass(u).siblings().removeClass(u),a.localIsResizing||($e(a.prevSlide),Ge(o)),!N.loopHorizontal&&N.controlArrows&&(i.find(_).toggle(0!==a.slideIndex),i.find(Z).toggle(!o.is(":last-child"))),i.hasClass(u)&&!a.localIsResizing&&Dn(a.slideIndex,a.slideAnchor,a.anchorLink,a.sectionIndex),void wn(n,a,!0))}function mn(n){Sn(n.slidesNav,n.slideIndex),n.localIsResizing||(e.isFunction(N.afterSlideLoad)&&N.afterSlideLoad.call(n.destiny,n.anchorLink,n.sectionIndex+1,n.slideAnchor,n.slideIndex),yo=!0,Je(n.destiny)),ho=!1}function wn(e,n,o){var i=n.destinyPos;if(N.css3){var a="translate3d(-"+t.round(i.left)+"px, 0px, 0px)";bn(e.find(q)).css(Zn(a)),Lo=setTimeout(function(){o&&mn(n)},N.scrollingSpeed,N.easing)}else e.animate({scrollLeft:t.round(i.left)},N.scrollingSpeed,N.easing,function(){o&&mn(n)})}function Sn(e,n){e.find(h).removeClass(u),e.find("li").eq(n).find("a").addClass(u)}function yn(){if(xn(),po){var n=e(o.activeElement);if(!n.is("textarea")&&!n.is("input")&&!n.is("select")){var i=$.height();t.abs(i-Yo)>20*t.max(Yo,i)/100&&(ue(!0),Yo=i)}}else clearTimeout(To),To=setTimeout(function(){ue(!0)},350)}function xn(){var e=N.responsive||N.responsiveWidth,n=N.responsiveHeight,o=e&&$.outerWidth()<e,t=n&&$.height()<n;e&&n?he(o||t):e?he(o):n&&he(t)}function bn(e){var n="all "+N.scrollingSpeed+"ms "+N.easingcss3;return e.removeClass(s),e.css({"-webkit-transition":n,transition:n})}function Cn(e){return e.addClass(s)}function Tn(n,o){N.navigation&&(e(A).find(h).removeClass(u),n?e(A).find('a[href="#'+n+'"]').addClass(u):e(A).find("li").eq(o).find("a").addClass(u))}function kn(n){N.menu&&(e(N.menu).find(h).removeClass(u),e(N.menu).find('[data-menuanchor="'+n+'"]').addClass(u))}function Ln(e,n){kn(e),Tn(e,n)}function An(n){var o=e(S).index(w),t=n.index(w);return o==t?"none":o>t?"up":"down"}function On(e,n){return e==n?"none":e>n?"left":"right"}function In(e){e.hasClass(F)||e.addClass(F).wrapInner('<div class="'+b+'" style="height:'+En(e)+'px;" />')}function En(e){var n=mo;if(N.paddingTop||N.paddingBottom){var o=e;o.hasClass(m)||(o=e.closest(w));var t=parseInt(o.css("padding-top"))+parseInt(o.css("padding-bottom"));n=mo-t}return n}function Mn(e,n){n?bn(go):Cn(go),go.css(Zn(e)),setTimeout(function(){go.removeClass(s)},10)}function Bn(n){if(!n)return[];var o=go.find(w+'[data-anchor="'+n+'"]');return o.length||(o=e(w).eq(n-1)),o}function Rn(e,n){var o=n.find(P),t=o.find(R+'[data-anchor="'+e+'"]');return t.length||(t=o.find(R).eq(e)),t}function zn(e,n){var o=Bn(e);o.length&&("undefined"==typeof n&&(n=0),e===so||o.hasClass(u)?Hn(o,n):Ne(o,function(){Hn(o,n)}))}function Hn(e,n){if("undefined"!=typeof n){var o=e.find(P),t=Rn(n,e);t.length&&gn(o,t)}}function Pn(e,n){e.append('<div class="'+V+'"><ul></ul></div>');var o=e.find(j);o.addClass(N.slidesNavPosition);for(var t=0;t<n;t++)o.find("ul").append('<li><a href="#"><span></span></a></li>');o.css("margin-left","-"+o.width()/2+"px"),o.find("li").first().find("a").addClass(u)}function Dn(e,n,o,t){var i="";N.anchors.length&&!N.lockAnchors&&(e?("undefined"!=typeof o&&(i=o),"undefined"==typeof n&&(n=e),co=n,qn(i+"/"+n)):"undefined"!=typeof e?(co=n,qn(o)):qn(o)),Vn()}function qn(e){if(N.recordHistory)location.hash=e;else if(po||vo)n.history.replaceState(i,i,"#"+e);else{var o=n.location.href.split("#")[0];n.location.replace(o+"#"+e)}}function Fn(e){var n=e.data("anchor"),o=e.index();return"undefined"==typeof n&&(n=o),n}function Vn(){var n=e(S),o=n.find(z),t=Fn(n),i=Fn(o),a=String(t);o.length&&(a=a+"-"+i),a=a.replace("/","-").replace("#","");var l=new RegExp("\\b\\s?"+f+"-[^\\s]+\\b","g");lo[0].className=lo[0].className.replace(l,""),lo.addClass(f+"-"+a)}function jn(){var e,t=o.createElement("p"),a={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};o.body.insertBefore(t,null);for(var l in a)t.style[l]!==i&&(t.style[l]="translate3d(1px,1px,1px)",e=n.getComputedStyle(t).getPropertyValue(a[l]));return o.body.removeChild(t),e!==i&&e.length>0&&"none"!==e}function Yn(){o.addEventListener?(o.removeEventListener("mousewheel",Fe,!1),o.removeEventListener("wheel",Fe,!1),o.removeEventListener("MozMousePixelScroll",Fe,!1)):o.detachEvent("onmousewheel",Fe)}function Nn(){var e,t="";n.addEventListener?e="addEventListener":(e="attachEvent",t="on");var a="onwheel"in o.createElement("div")?"wheel":o.onmousewheel!==i?"mousewheel":"DOMMouseScroll";"DOMMouseScroll"==a?o[e](t+"MozMousePixelScroll",Fe,!1):o[e](t+a,Fe,!1)}function Un(){go.on("mousedown",sn).on("mouseup",cn)}function Xn(){go.off("mousedown",sn).off("mouseup",cn)}function Wn(){(po||vo)&&(N.autoScrolling&&lo.off(Mo.touchmove).on(Mo.touchmove,ze),e(l).off(Mo.touchstart).on(Mo.touchstart,De).off(Mo.touchmove).on(Mo.touchmove,He))}function Kn(){(po||vo)&&(N.autoScrolling&&lo.off(Mo.touchmove),e(l).off(Mo.touchstart).off(Mo.touchmove))}function _n(){var e;return e=n.PointerEvent?{down:"pointerdown",move:"pointermove"}:{down:"MSPointerDown",move:"MSPointerMove"}}function Qn(e){var n=[];return n.y="undefined"!=typeof e.pageY&&(e.pageY||e.pageX)?e.pageY:e.touches[0].pageY,n.x="undefined"!=typeof e.pageX&&(e.pageY||e.pageX)?e.pageX:e.touches[0].pageX,vo&&Pe(e)&&N.scrollBar&&(n.y=e.touches[0].pageY,n.x=e.touches[0].pageX),n}function Gn(e,n){G(0,"internal"),"undefined"!=typeof n&&(wo=!0),gn(e.closest(P),e),"undefined"!=typeof n&&(wo=!1),G(Bo.scrollingSpeed,"internal")}function Jn(e){var n=t.round(e);if(N.css3&&N.autoScrolling&&!N.scrollBar){var o="translate3d(0px, -"+n+"px, 0px)";Mn(o,!1)}else N.autoScrolling&&!N.scrollBar?go.css("top",-n):ao.scrollTop(n)}function Zn(e){return{"-webkit-transform":e,"-moz-transform":e,"-ms-transform":e,transform:e}}function $n(n,o,t){"all"!==o?bo[t][o]=n:e.each(Object.keys(bo[t]),function(e,o){bo[t][o]=n})}function eo(n){W(!1,"internal"),ie(!1),ae(!1),go.addClass(c),clearTimeout(Lo),clearTimeout(ko),clearTimeout(To),clearTimeout(Ao),clearTimeout(Oo),$.off("scroll",Ie).off("hashchange",on).off("resize",yn),ee.off("click touchstart",A+" a").off("mouseenter",A+" li").off("mouseleave",A+" li").off("click touchstart",Y).off("mouseover",N.normalScrollElements).off("mouseout",N.normalScrollElements),e(w).off("click touchstart",U),clearTimeout(Lo),clearTimeout(ko),n&&no()}function no(){Jn(0),go.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function(){Qe(e(this),"src")}),go.find("img[data-srcset]").each(function(){Qe(e(this),"srcset")}),e(A+", "+j+", "+U).remove(),e(w).css({height:"","background-color":"",padding:""}),e(R).css({width:""}),go.css({height:"",position:"","-ms-touch-action":"","touch-action":""}),ao.css({overflow:"",height:""}),e("html").removeClass(d),lo.removeClass(r),e.each(lo.get(0).className.split(/\s+/),function(e,n){0===n.indexOf(f)&&lo.removeClass(n)}),e(w+", "+R).each(function(){N.scrollOverflowHandler&&N.scrollOverflowHandler.remove(e(this)),e(this).removeClass(F+" "+u)}),Cn(go),go.find(C+", "+q+", "+P).each(function(){e(this).replaceWith(this.childNodes)}),go.css({"-webkit-transition":"none",transition:"none"}),ao.scrollTop(0);var n=[m,B,D];e.each(n,function(n,o){e("."+o).removeClass(o)})}function oo(e,n,o){N[e]=n,"internal"!==o&&(Bo[e]=n)}function to(){var n=["fadingEffect","continuousHorizontal","scrollHorizontally","interlockedSlides","resetSliders","responsiveSlides","offsetSections","dragAndMove","scrollOverflowReset","parallax"];return e("html").hasClass(d)?void io("error","Fullpage.js can only be initialized once and you are doing it multiple times!"):(N.continuousVertical&&(N.loopTop||N.loopBottom)&&(N.continuousVertical=!1,io("warn","Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),N.scrollBar&&N.scrollOverflow&&io("warn","Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"),!N.continuousVertical||!N.scrollBar&&N.autoScrolling||(N.continuousVertical=!1,io("warn","Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),N.scrollOverflow&&!N.scrollOverflowHandler&&(N.scrollOverflow=!1,io("error","The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.")),e.each(n,function(e,n){N[n]&&io("warn","fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: "+n)}),void e.each(N.anchors,function(n,o){var t=ee.find("[name]").filter(function(){return e(this).attr("name")&&e(this).attr("name").toLowerCase()==o.toLowerCase()}),i=ee.find("[id]").filter(function(){return e(this).attr("id")&&e(this).attr("id").toLowerCase()==o.toLowerCase()});(i.length||t.length)&&(io("error","data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."),i.length&&io("error",'"'+o+'" is is being used by another element `id` property'),t.length&&io("error",'"'+o+'" is is being used by another element `name` property'))}))}function io(e,n){console&&console[e]&&console[e]("fullPage: "+n)}if(e("html").hasClass(d))return void to();var ao=e("html, body"),lo=e("body"),ro=e.fn.fullpage;N=e.extend({menu:!1,anchors:[],lockAnchors:!1,navigation:!1,navigationPosition:"right",navigationTooltips:[],showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:"bottom",scrollBar:!1,hybrid:!1,css3:!0,scrollingSpeed:700,autoScrolling:!0,fitToSection:!0,fitToSectionDelay:1e3,easing:"easeInOutCubic",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,continuousHorizontal:!1,scrollHorizontally:!1,interlockedSlides:!1,dragAndMove:!1,offsetSections:!1,resetSliders:!1,fadingEffect:!1,normalScrollElements:null,scrollOverflow:!1,scrollOverflowReset:!1,scrollOverflowHandler:e.fn.fp_scrolloverflow?e.fn.fp_scrolloverflow.iscrollHandler:null,scrollOverflowOptions:null,touchSensitivity:5,normalScrollElementTouchThreshold:5,bigSectionsDestination:null,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,controlArrows:!0,controlArrowColor:"#fff",verticalCentered:!0,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,responsiveWidth:0,responsiveHeight:0,responsiveSlides:!1,parallax:!1,parallaxOptions:{type:"reveal",percentage:62,property:"translate"},sectionSelector:g,slideSelector:M,afterLoad:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null,afterResponsive:null,lazyLoading:!0},N);var so,co,fo,uo,ho=!1,po=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),vo="ontouchstart"in n||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints,go=e(this),mo=$.height(),wo=!1,So=!0,yo=!0,xo=[],bo={};bo.m={up:!0,down:!0,left:!0,right:!0},bo.k=e.extend(!0,{},bo.m);var Co,To,ko,Lo,Ao,Oo,Io,Eo=_n(),Mo={touchmove:"ontouchmove"in n?"touchmove":Eo.move,touchstart:"ontouchstart"in n?"touchstart":Eo.down},Bo=e.extend(!0,{},N);to(),e.extend(e.easing,{easeInOutCubic:function(e,n,o,t,i){return(n/=i/2)<1?t/2*n*n*n+o:t/2*((n-=2)*n*n+2)+o}}),e(this).length&&(ro.version="2.9.5",ro.setAutoScrolling=W,ro.setRecordHistory=Q,ro.setScrollingSpeed=G,ro.setFitToSection=ne,ro.setLockAnchors=oe,ro.setMouseWheelScrolling=te,ro.setAllowScrolling=ie,ro.setKeyboardScrolling=ae,ro.moveSectionUp=le,ro.moveSectionDown=re,ro.silentMoveTo=se,ro.moveTo=ce,ro.moveSlideRight=de,ro.moveSlideLeft=fe,ro.fitToSection=Ee,ro.reBuild=ue,ro.setResponsive=he,ro.destroy=eo,ro.shared={afterRenderActions:Ae},pe(),ve());var Ro=!1,zo=0,Ho=0,Po=0,Do=0,qo=0,Fo=(new Date).getTime(),Vo=0,jo=0,Yo=mo}});
//# sourceMappingURL=jquery.fullpage.min.js.map




			$('#fullpage').fullpage({
				'verticalCentered': false,
				'css3': true,
				'sectionsColor': ['#F0F2F4', '#fff', '#fff', '#fff'],
				'navigation': true,
				'navigationPosition': 'right',
				'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple']

			});

    }
});

});