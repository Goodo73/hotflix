# General Assembly WDI Individual Project 3

## Website for Hot Flix Movie Reviews

### Background
My brother, Pete Goodwin, reviews films. He currently presents his reviews on radio, usually as **Pete, The Movie Guy**, and on [Facebook](https://www.facebook.com/HotFlix.com.au) under the heading **Hot Flix Movie Reviews**. He does not yet have a functioning website.

### Objective
The project objective is to build a website that will display his reviews, and allow him, through an *admin* portal, to add new reviews. The admin portal will also give him the ability to modify and delete existing reviews.

The minimum viable product should provide the following:
- Display a list of reviewed movies to a visitor to the website
- Each movie displayed to have the following details available:
  - title
  - Australian release date and rating
  - director(s) and main cast members
  - duration in minutes
  - score out of 10; ie. Pete's personal scoring of the movie
  - demographic score out of 10; ie. Pete's scoring of the movie in terms of its target demographic
  - link to the movie's IMDb page and trailer
  - Pete's written review
  - movie's poster
- A local database for storage of movie reviews
- An administration page/portal for Pete to:
  - add new reviews to the database
  - retrive exsting reviews from the database to view, edit or delete

Desirable extensions include:
- An API (likely **www.omdbapi.com**) in the admin portal to search for movies, and automatically copy-over the relevant fields
- Login for the admin portal

### Technology
- Build with Ruby on Rails for the back end
- Use postgresql for the database
- HTML/CSS/JavaScript/JQuery on the front end
- Use modals to play trailers (to keep visitors at the site); possibly venobox plugin