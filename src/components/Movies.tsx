import { Play, Star, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Movies = () => {
  const movies = [
    {
      title: "The Matrix",
      year: "1999",
      genre: "Sci-Fi/Action",
      rating: "8.7",
      duration: "136 min",
      poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      description: "A computer programmer discovers reality is a simulation."
    },
    {
      title: "Inception",
      year: "2010",
      genre: "Sci-Fi/Thriller",
      rating: "8.8",
      duration: "148 min",
      poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      description: "Dream within a dream - the ultimate heist."
    },
    {
      title: "Interstellar",
      year: "2014",
      genre: "Sci-Fi/Drama",
      rating: "8.6",
      duration: "169 min",
      poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      description: "Humanity's last hope lies beyond the stars."
    },
    {
      title: "The Social Network",
      year: "2010",
      genre: "Biography/Drama",
      rating: "7.7",
      duration: "120 min",
      poster: "https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      description: "The story behind Facebook's creation."
    },
    {
      title: "Iron Man",
      year: "2008",
      genre: "Action/Sci-Fi",
      rating: "7.9",
      duration: "126 min",
      poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
      description: "Genius billionaire builds a high-tech suit."
    },
    {
      title: "Ex Machina",
      year: "2014",
      genre: "Sci-Fi/Thriller",
      rating: "7.7",
      duration: "108 min",
      poster: "https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg",
      description: "AI meets human consciousness in this thriller."
    },
    {
      title: "Blade Runner 2049",
      year: "2017",
      genre: "Sci-Fi/Drama",
      rating: "8.0",
      duration: "164 min",
      poster: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg",
      description: "The future of artificial intelligence unfolds."
    },
    {
      title: "Steve Jobs",
      year: "2015",
      genre: "Biography/Drama",
      rating: "7.2",
      duration: "122 min",
      poster: "https://m.media-amazon.com/images/M/MV5BMjE1MzU1MjUwM15BMl5BanBnXkFtZTgwMTA4MDU0NjE@._V1_SX300.jpg",
      description: "The visionary behind Apple's revolution."
    }
  ];

  return (
    <section id="movies" className="section-padding bg-background">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
              🎬 Entertainment
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Movies I <span className="text-primary">Love</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A curated collection of films that inspire my creativity and fuel my passion for technology and innovation.
            </p>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie, index) => (
              <Card 
                key={movie.title}
                className="group overflow-hidden bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in cursor-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Movie Poster */}
                  <div className="relative overflow-hidden aspect-[2/3]">
                    <img
                      src={movie.poster}
                      alt={`${movie.title} poster`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary/90 rounded-full p-3 hover:bg-primary transition-colors">
                        <Play className="h-6 w-6 text-primary-foreground fill-current" />
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-background/90 rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium">{movie.rating}</span>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                      {movie.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{movie.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{movie.duration}</span>
                      </div>
                    </div>

                    <div className="text-xs text-accent font-medium mb-2">
                      {movie.genre}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {movie.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Watch More Button */}
          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="inline-block bg-card/50 border border-border/50 rounded-lg p-4">
              <p className="text-muted-foreground mb-2">
                <span className="text-2xl mr-2">🍿</span>
                These movies inspire my coding journey
              </p>
              <p className="text-sm text-muted-foreground">
                From AI consciousness to tech entrepreneurship - each film sparks creativity
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movies;