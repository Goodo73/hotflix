class MoviesController < ApplicationController

	def index
	end

  # Declaring a 'list' method as Rails seems to have issues with using index in this situation
  # Retrieves all movie records and returns them as JSON (array)
	def list
    movies = Movie.order('release_date')
    render :json => movies.to_json
	end
	
end