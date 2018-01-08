const APIKey = '179c1c64';

$(document).ready(function(){
	$('body').on('submit', '#searchForm', function(e){
		let searchText = $('#searchText').val();
		//alert(searchText);
		getMovies(searchText);
		e.preventDefault();
	});
});

// Before movie detail page
$(document).on('pagebeforeshow', '#movie', function(){
	let movieId = sessionStorage.getItem('movieId');
	getMovie(movieId);
});

function getMovie(movieId) {
	//alert(movieId);
	$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?apikey=' + APIKey + '&i=' + movieId
	}).done(function(movie){
		//let movies = data.Search;
		let movieTop = '';
		let movieDetails = '';
		console.log(movie);
		movieTop += '<div style="text-align:center;">';
		movieTop += '<h1>'+ movie.Title +'</h1>';
		movieTop += '<img src="'+ movie.Poster +'">';
		movieTop += '</div>';
		$('#movieTop').html(movieTop);

		movieDetails += '<li><strong>Genre:</strong> '+ movie.Genre +'</li>';
		movieDetails += '<li><strong>Rated:</strong> '+ movie.Rated +'</li>';
		movieDetails += '<li><strong>Released:</strong> '+ movie.Released +'</li>';
		movieDetails += '<li><strong>Runtime:</strong> '+ movie.Runtime +'</li>';
		movieDetails += '<li><strong>IMDB Rating:</strong> '+ movie.imdbRating +'</li>';
		movieDetails += '<li><strong>IMDB Votes:</strong> '+ movie.imdbVotes +'</li>';
		movieDetails += '<li><strong>Actors:</strong> '+ movie.Actors +'</li>';
		movieDetails += '<li><strong>Director:</strong> '+ movie.Director +'</li>';
		$('#movieDetails').html(movieDetails).listview('refresh');

	}).error(function(){
		alert('An Network Error occurred');
	});
}

// Get Moives from API
function getMovies(searchText) {
	$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?apikey=' + APIKey + '&s=' + searchText
	}).done(function(data){
		let movies = data.Search;
		let output = '';
		console.log(movies);
		$.each(movies, function(index, movie){
			console.log(movie.Title);
			output += '<li>';
			//output += '<a onclick="movieClicked('+ movie.imdbID +')" href="#">';
			output += '<a data-movie-id='+ '"' + movie.imdbID + '"' +'href="#">';
			output += '<img src="' + movie.Poster +'">';
			output += '<h2>' + movie.Title + '</h2>';
			output += 'Release Year: ' + movie.Year + '';
			output += '</a>';
			output += '</li>';

		});
		$('#movies').html(output).listview('refresh'); // for activate list css from jQuery Mobile

		// Links for a single page
		$('a', '#movies').on('click',function(){
			let movieId = $(this).attr('data-movie-id');
			//alert(movieId);
			sessionStorage.setItem('movieId', movieId);
			$.mobile.changePage('movie.html');
		});

	}).error(function(){
		alert('An Network Error occurred');
	});
}