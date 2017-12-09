jQuery(function($){
var winHeight = $(window).height();
var headerHeight = $('header').innerHeight();
var innerHeight = winHeight - headerHeight ;
$('.inner').css("height", innerHeight + "px");
});

//Barba.js用トランジション設定
var FadeTransition = Barba.BaseTransition.extend({
start: function() {
//この関数は、遷移が開始されるとすぐに自動的に呼び出されます。

//読み込みが終了し、古いページがフェードアウトするとすぐに、新しいページがフェードインします。
Promise
.all([this.newContainerLoading, this.fadeOut()])
.then(this.fadeIn.bind(this));
},

fadeOut: function() {
//this.oldContainerは古いコンテナのHTMLElementです。この場合はアニメーションでフェードアウトさせている。
return $(this.oldContainer).animate({ opacity: 0 }).promise();
},

fadeIn: function() {
var _this = this;
//this.newContainerは、新しいコンテナのHTMLElementです。
//この段階では、newContainerはDOM上にあります（barba-container内にあり、visibility：hiddenで囲まれています）。
var $el = $(this.newContainer);

//古いコンテナをdisplay:none;にした後、新しいコンテナに初期値を設定。
$(this.oldContainer).hide();
$el.css({
visibility : 'visible',
opacity : 0
});

$el.animate({ opacity: 1 }, 400, function() {
//.done（）の記述で古いコンテナを自動的にDOMから削除。
_this.done();
});
}

});
// returnに作ったトランジションを設定。
Barba.Pjax.getTransition = function() {
return FadeTransition;
};

//Barba.jsを動かすのに最低限必要な記述。
Barba.Pjax.start();
	
Barba.Dispatcher.on('newPageReady', function( currentStatus, oldStatus, container, newPageRawHTML ) {

//head内のタグを更新
if ( Barba.HistoryManager.history.length === 1 ) {  // ファーストビュー
return;
}
var $newPageHead = $( '<head />' ).html(
$.parseHTML(
newPageRawHTML.match( /<head[^>]*>([\s\S.]*)<\/head>/i )[ 0 ],
document,
true
)
);
var headTags = [ // 更新が必要なタグ
"meta[name='description']",
].join( ',' );
$( 'head' ).find( headTags ).remove(); // タグを削除
$newPageHead.find( headTags ).appendTo( 'head' ); // タグを追加

//ページ読み込み時にスクリプトを再読み込み
var winHeight = $(window).height();
var headerHeight = $('header').innerHeight();
var innerHeight = winHeight - headerHeight ;
$('.inner').css("height", innerHeight + "px");
	
return false;
	
});