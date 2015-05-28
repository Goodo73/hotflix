var loadReviews = {
	reviews: [],

	idLookup: {},

	// Retrieve all review data from db
	getReviewData: function() {
		// Setup ajax call parameters
		var apiReviews = {
			url: '/api/reviews',
			dataType: 'json'
		};
		
		// Make ajax call and store data on 'done'
		$.ajax(apiReviews).done(function(results) {
			for (var i = 0; i < results.length; i++) {
				loadReviews.reviews.push(results[i]);
			};

			loadReviews.render();
		});
	},

	// Display individual reviews on the page
	render: function() {
		var $reviewContainer = $('.grid-items');
		var rev = loadReviews.reviews;

		// For each movie in the database, create a corresponding 'card' on the screen
		for (var i = 0; i < rev.length; i++) {
			loadReviews.idLookup[rev[i].id] = i;
			// ie. table-id: array-index

			var $movieCard = $('<div>');
			$movieCard.addClass('grid-item grid-item-image');

			// Main text for the card; a trigger for a lightbox to show the movie's review
			var $movieCardDetails = $('<div>').addClass('movie-card-dtl')
				.attr('data-featherlight','.mylightbox')
				.attr('data-movie-id',rev[i].id);
			$movieCardDetails
				.append($('<h1>').html(rev[i].title));
				// .append($('<p>').html('Released ' + prettyDate(rev[i].release_date)));

			$movieCard.append($movieCardDetails);

			// Supplementary text for the card; a trigger for a lightbox to show the movie's trailer
			var $movieCardTrailer = $('<p>').addClass('trailer')
				.attr('data-movie-id',rev[i].id)
				.html('Play trailer');

			$movieCard.append($movieCardTrailer);

			$reviewContainer.append($movieCard);
		};
	}
}


$(document).ready(function() {

	loadReviews.getReviewData();

	// When card's main text is clicked, display a lightbox containing the movie's review
	$('.grid-items').on('click','.movie-card-dtl',function() {
		var $modal = $('.mylightbox');
		$modal.empty();
		
		var $upper = $('<div>').addClass('movie-upper');

		var $idx = $(this).data('movieId');
		var review = loadReviews.reviews[loadReviews.idLookup[$idx]];

		var $details = $('<div>').addClass('movie-details');
		$details.append(reviewPara('Title: ',review.title));
		$details.append(reviewPara('Release date: ',prettyDate(review.release_date)));
		$details.append(reviewPara('Rating: ',review.rating));
		$details.append(reviewPara('Director: ',review.director));
		$details.append(reviewPara('Stars: ',review.cast));
		$details.append(reviewPara('Run time (minutes): ',review.duration));
		$details.append(reviewPara('My score (out of 10): ',review.score));
		$details.append(reviewPara('Target demo score (out of 10): ',review.demographic_score));

		var $imdb = reviewPara('IMDb: ','');
		var imdbUrl = ('http://www.imdb.com/title/' + review.imdbid + '/');
		$imdb.append(createLink(imdbUrl));
		$details.append($imdb);

		var $posterContainer = $('<div>').addClass('poster-container');
		var $poster = $('<img>').addClass('poster');
		// $img.attr('src',review.poster);
		$poster.attr('src','http://ia.media-imdb.com/images/M/MV5BNDQ3OTAzMDI3MV5BMl5BanBnXkFtZTgwNTUzMTQ3NDE@._V1_SX300.jpg');
		$poster.attr('alt','Poster of ' + review.title);

		$posterContainer.append($poster);

		$upper.append($details);
		$upper.append($posterContainer);
		$modal.append($upper);
		
		var $review = $('<p>').html(review.review);
		$modal.append($review);
	});

	// When card's supplementary text is clicked, display a lightbox containing the movie's trailer
	$('.grid-items').on('click','p.trailer',function() {
		var $idx = $(this).data('movieId');
		var review = loadReviews.reviews[loadReviews.idLookup[$idx]];

		var trailerSrc = 'https://www.youtube.com/watch?v=' + review.trailer_link;
		$.magnificPopup.open({
		    items: {
		      src: trailerSrc
		    },
		    type: 'iframe'
		});
	});
});

// Returns a formatted date: DD/MM/YYYY' (leading-zero suppressed)
// Input format: 'YYYY-MM-DD'
function prettyDate(date) {
	var d = new Date(Date.parse(date));
	
	return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
}

function reviewPara(heading,text) {
	return $('<p>').html('<strong>' + heading + '</strong>' + text);
}

function createLink(url) {
	var $link = $('<a>');
	$link.attr('href',url);
	$link.attr('target','_blank');
	$link.html(url);
	return $link
}
