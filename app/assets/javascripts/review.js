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
		var $gridItems = $('.grid-items');

		var reviews = loadReviews.reviews;

		// For each movie in the database, create a corresponding 'card' on the screen
		for (var i = 0; i < reviews.length; i++) {
			loadReviews.idLookup[reviews[i].id] = i;
			// ie. table-id: array-index

			var $movieCard = $('<div>').addClass('grid-item grid-item-image')
				.css('background-image','url(' + reviews[i].poster_link + ')');

			// Main text for the card; a trigger for a lightbox to show the movie's review
			var $movieCardTitle = $('<div>').addClass('movie-card-title')
				.attr('data-movie-id',reviews[i].id);
			$movieCardTitle
				.append($('<h1>').html(reviews[i].title));
			$movieCard.append($movieCardTitle);

			// Supplementary text for the card; a trigger for a lightbox to show the movie's trailer
			var $movieCardTrailer = $('<p>').addClass('movie-card-trailer')
				.attr('data-movie-id',reviews[i].id)
				.html('Play trailer');
			$movieCard.append($movieCardTrailer);

			$gridItems.append($movieCard);
		};
	}
}


$(document).ready(function() {

	loadReviews.getReviewData();

	// When card's main text is clicked, display a lightbox containing the movie's review
	$('.grid-items').on('click','.movie-card-title',function() {
		var $popup = $('<div>').addClass('review-popup');
		
		var $upper = $('<div>').addClass('movie-upper');

		// View the lookup table to determine the review's position within the
		// review array, and then retrieve the review from the array
		var $idx = $(this).data('movieId');
		var review = loadReviews.reviews[loadReviews.idLookup[$idx]];

		// Format the details of the reviewed movie.
		// The reviewPara function is called to join the category name and data (bolding
		// the former)
		var $details = $('<div>').addClass('movie-details');
		$details.append(reviewPara('Title: ',review.title));
		$details.append(reviewPara('Release date: ',prettyDate(review.release_date)));
		$details.append(reviewPara('Rating: ',review.rating));
		$details.append(reviewPara('Director: ',review.director));
		$details.append(reviewPara('Stars: ',review.cast));
		$details.append(reviewPara('Run time (minutes): ',review.duration));
		$details.append(reviewPara('My score (out of 10): ',review.score));
		$details.append(reviewPara('Target demo score (out of 10): ',review.demographic_score));

		// Format the movie's IMDb link as an anchor element
		var $imdb = reviewPara('IMDb: ','');
		var imdbUrl = ('http://www.imdb.com/title/' + review.imdbid + '/');
		$imdb.append(createLink(imdbUrl));
		$details.append($imdb);

		var $posterContainer = $('<div>').addClass('poster-container');
		var $poster = $('<img>').addClass('poster')
			.attr('src',review.poster_link)
			.attr('alt','Poster of ' + review.title);

		$posterContainer.append($poster);

		$upper.append($details);
		$upper.append($posterContainer);
		$popup.append($upper);
		
		// Format review text, replacing each carriage-return with a break tag
		var formattedString = review.review.replace(/\r/g,'<br>');
		var $review = $('<p>').html(formattedString);
		$popup.append($review);

		$.magnificPopup.open({
  		items: {
    		src: $popup,
    		type: 'inline'
  		},
  		closeBtnInside: true
		});
	});

	// When card's supplementary text is clicked, display a lightbox containing the movie's trailer
	$('.grid-items').on('click','p.movie-card-trailer',function() {
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
