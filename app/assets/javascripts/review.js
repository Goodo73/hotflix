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

		for (var i = 0; i < rev.length; i++) {
			// var $review = $('<div>').addClass('grid-item');
			var $reviewLink = $('<a>');

			$reviewLink.attr('href','#');
			$reviewLink.attr('data-featherlight','.mylightbox');
			$reviewLink.attr('data-movie-id',rev[i].id);
			$reviewLink.addClass('grid-item');
			$reviewLink
				.append($('<h1>').html(rev[i].title))
				.append($('<p>').html('Released ' + prettyDate(rev[i].release_date)));

			$reviewContainer.append($reviewLink);

			loadReviews.idLookup[rev[i].id] = i;
		};
	}
}


$(document).ready(function() {

	loadReviews.getReviewData();

	$('.grid-items').on('click','.grid-item',function() {
		var $modal = $('.mylightbox');
		$modal.empty();

		var $idx = $(this).data('movieId');
		var review = loadReviews.reviews[loadReviews.idLookup[$idx]];

		$modal.append(reviewPara('Title: ',review.title));
		$modal.append(reviewPara('Release date: ',prettyDate(review.release_date)));
		$modal.append(reviewPara('Rating: ',review.rating));
		$modal.append(reviewPara('Director: ',review.director));
		$modal.append(reviewPara('Stars: ',review.cast));
		$modal.append(reviewPara('Run time (minutes): ',review.duration));
		$modal.append(reviewPara('My score (out of 10): ',review.score));
		$modal.append(reviewPara('Target demo score (out of 10): ',review.demographic_score));

		var $para = reviewPara('IMDb: ','');
		var imdbUrl = ('http://www.imdb.com/title/' + review.imdbid + '/');

		$para.append(createLink(imdbUrl));
		$modal.append($para);

		$modal.append($('<p>').html(review.review));
	})
});

// Returns a formatted date: DD/MM/YYYY' (leading-zero suppressed)
// Input format: 'YYYY-MM-DD'
function prettyDate(date) {
	var d = new Date(Date.parse(date));
	
	return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
}

function reviewPara(heading, text) {
	return $('<p>').html('<strong>' + heading + '</strong>' + text);
}

function createLink(url) {
	var $link = $('<a>');
	$link.attr('href',url);
	$link.attr('target','_blank');
	$link.html(url);
	return $link
}