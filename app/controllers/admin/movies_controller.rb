class Admin::MoviesController < AdminController

	def index
		@movies = Movie.order('release_date')
	end

	def create
		@movie = Movie.new(movie_params)
		if @movie.save(movie_params)
			redirect_to admin_movies_path
		else
			render :new
		end
	end

	def new
		@movie = Movie.new
	end

	def edit
		@movie = Movie.find(params[:id])
	end

	def show
		@movie = Movie.find(params[:id])
	end

	def update
		@movie = Movie.find(params[:id])
		if @movie.update(movie_params)
			redirect_to admin_movies_path
		else
			render :edit
		end
	end

	def destroy
		Movie.find(params[:id]).destroy
		redirect_to admin_movies_path
	end

	def movie_params
		params.require(:movie).permit(:title, :release_date, :rating, :director, :cast, :duration, :score, :demographic_score, :imdbid, :review, :trailer_link)
	end

end