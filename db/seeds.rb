# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Movie.destroy_all

Movie.create(title: "Birdman",release_date: Date.new(2015,1,15),rating: "MA 15+",director: "Alejandro G. Inarritu",cast: "Michael Keaton, Edward Norton, Emma Stone, Zach Galifianakis, Naomi Watts, Andrea Riseborough, Amy Ryan",duration: 119,score: 10,demographic_score: 9.5,imdbid: "tt2562232",review: "Michael Keaton plays the title role of a former superhero so desperate to make a comeback that he bankrolls his own stage adaptation of a popular play. It's not full on arty, but it's also not a total popcorn flick. But one thing Birdman definitely IS, is a 10 out of 10!! In fact of all the films I watched in 2014, this is only my 4th perfect score (after Boyhood, Her, & Whiplash). Co-starring, and all brilliant in their individual roles are Naomi Watts, Edward Norton, Zach Galafinakas & Emma Stone.",trailer_link: "http://youtu.be/uJfLoE6hanc")
Movie.create(title: "Dumb and Dumber To",release_date: Date.new(2015,1,8),rating: "M",director: "Bobby Farrelly, Peter Farrelly",cast: "Jim Carrey, Jeff Daniels",duration: 109,score: 7.75,demographic_score: 8,imdbid: "tt2096672",review: "Lloyd & Harry are 20 years older, but definitely no more the wiser; with so many of the original gags trundled out with mostly strong results. At 1hr 50mins it's probably about 20 mins too long, but considering it's a totally unnecessary sequel, it's probably as good as fans could've hoped for. Unlikely to win too many new devotees, this is definitely one for those of us who laughed so hard back in 1994 that more than a little wee probably came out!!",trailer_link: "http://youtu.be/vZDvLdppypg")
# Movie.create(title: "",release_date: Date.new(,,),rating: "",director: "",cast: "",duration: ,score: ,demographic_score: ,imdbid: "",review: "",trailer_link: "")