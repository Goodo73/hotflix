var loadReviews = {
	reviews: [],

	// Retrieve all review data from db
	getReviewData: function() {
		// setup ajax call parameters
		var apiReviews = {
			url: '/api/reviews',
			dataType: 'json'
		};
		
		// make ajax call and store data on 'done'
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
			var $review = $('<div>').addClass('grid-item');
			
			$review
				.append($('<h1>').html(rev[i].title))
				.append($('<p>').html('Released ' + prettyDate(rev[i].release_date)));

			$reviewContainer.append($review);
		};

	
		$('.grid-item').on('click',function() {
			console.log('grid-item clicked');
		})
	}
}

// Returns a formatted date
// Input format: 'YYYY-MM-DD'
// Output format: 'DD/MM/YYYY' (leading-zero suppressed)
function prettyDate(date) {
	var dateIn = new Date(Date.parse(date));
	
	var dateOut = dateIn.getDate() + '/' + (dateIn.getMonth() + 1) + '/' + dateIn.getFullYear();

	return dateOut;
}

$(document).ready(function() {

	loadReviews.getReviewData();

});

