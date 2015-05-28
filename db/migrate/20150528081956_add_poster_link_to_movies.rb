class AddPosterLinkToMovies < ActiveRecord::Migration
  def change
    add_column :movies, :poster_link, :string
  end
end
