class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title
      t.date :release_date
      t.string :rating
      t.string :director
      t.text :cast
      t.integer :duration
      t.float :score
      t.float :demographic_score
      t.string :imdbid
      t.text :review
      t.string :trailer_link

      t.timestamps null: false
    end
  end
end
