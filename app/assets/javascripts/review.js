var loadMovies = {
  movieData: [],

  idLookup: {},

  // Retrieve all movie data from db
  getMovieData: function() {
    // Setup ajax call parameters
    var apiMovies = {
      url: '/api/movies',
      dataType: 'json'
    };
    
    // Make ajax call and store data on 'done'
    $.ajax(apiMovies).done(function(results) {
      for (var i = 0; i < results.length; i++) {
        loadMovies.movieData.push(results[i]);
      };

      loadMovies.render();
    });
  },

  // Display individual movies on the page
  render: function() {
    var $gridItems = $('.grid-items');

    var movies = loadMovies.movieData;

    // For each movie in the database, create a corresponding 'card' on the screen
    for (var i = 0; i < movies.length; i++) {
      loadMovies.idLookup[movies[i].id] = i;
      // ie. table-id: array-index

      var $movieCard = $('<div>').addClass('grid-item grid-item-image')
        .css('background-image','url(' + movies[i].poster_link + ')');

      // Movie title for the card; a trigger for a lightbox to show the movie's review
      var $movieCardTitle = $('<div>').addClass('movie-card-title')
        .attr('data-movie-id',movies[i].id);
      $movieCardTitle
        .append($('<h1>').html(movies[i].title));
      $movieCard.append($movieCardTitle);

      // Film icon for the card; a trigger for a lightbox to show the movie's trailer
      var $movieCardTrailer = $('<i>').addClass('movie-card-trailer')
        .addClass('fa')
        .addClass('fa-film')
        .attr('data-movie-id',movies[i].id);
      $movieCard.append($movieCardTrailer);

      $gridItems.append($movieCard);
    };
  }
}


$(document).ready(function() {

  loadMovies.getMovieData();

  // When card's main text is clicked, display a lightbox containing the movie's review
  $('.grid-items').on('click','.movie-card-title',function() {
    var $popup = $('<div>').addClass('review-popup');
    
    var $upper = $('<div>').addClass('movie-upper');

    // View the lookup table to determine the movie's position within the
    // movie array, and then retrieve the movie from the array
    var $idx = $(this).data('movieId');
    var movie = loadMovies.movieData[loadMovies.idLookup[$idx]];

    // Format the details of the reviewed movie.
    var $details = $('<div>').addClass('movie-details');
    $details.append($('<p>').html('<strong>Release date ... </strong>' + prettyDate(movie.release_date)));
    $details.append($('<p>').html('<strong>Rating ... </strong>' + movie.rating));
    $details.append($('<p>').html('<strong>Director ... </strong>' + movie.director));
    $details.append($('<p>').html('<strong>Stars ... </strong>' + movie.cast));
    $details.append($('<p>').html('<strong>Run time ... </strong>' + movie.duration + ' minutes'));
    $details.append($('<p>').html('<strong>My score ... </strong>' + movie.score + '/10'));
    $details.append($('<p>').html('<strong>Target demo score ... </strong>' + movie.demographic_score + '/10'));

    // Format the movie's IMDb link as an anchor element
    var imdbUrl = ('http://www.imdb.com/title/' + movie.imdbid + '/');
    var $imdb = $('<p>').append(createLink(imdbUrl));
    $details.append($imdb);

    var $posterContainer = $('<div>').addClass('poster-container');
    var $poster = $('<img>').addClass('poster')
      .attr('src',movie.poster_link)
      .attr('alt','Poster of ' + movie.title);

    $posterContainer.append($poster);

    $upper.append($details);
    $upper.append($posterContainer);
    $popup.append($upper);
    
    // Format review text, replacing each carriage-return with a break tag
    var formattedString = movie.review.replace(/\r/g,'<br>');
    var $review = $('<p>').addClass('review-text').html(formattedString);
    $popup.append($review);

    $.magnificPopup.open({
      items: {
        src: $popup,
        type: 'inline'
      },
      closeBtnInside: true
    });
  });

  // When card's trailer icon is clicked, display a lightbox containing the movie's trailer
  $('.grid-items').on('click','.movie-card-trailer',function() {
    var $idx = $(this).data('movieId');
    var movie = loadMovies.movieData[loadMovies.idLookup[$idx]];

    var trailerSrc = 'https://www.youtube.com/watch?v=' + movie.trailer_link;
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

// Builds an anchor element
function createLink(url) {
  var $link = $('<a>')
    .attr('href',url)
    .attr('target','_blank')
    .html(url);
  
  return $link
}
