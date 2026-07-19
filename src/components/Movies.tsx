import { Play, Star, Calendar, Clock, ExternalLink, Clapperboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import realSteelPoster from "@/assets/movies/real-steel.jpg";
import tetrisPoster from "@/assets/movies/tetris.jpg";
import goodWillHuntingPoster from "@/assets/movies/good-will-hunting.jpg";

const Movies = () => {
  const movies = [
    {
      title: "I, Robot",
      year: "2004",
      genre: "Sci-Fi/Action",
      rating: "7.1",
      duration: "115 min",
      poster: "https://cdn.kinocheck.com/i/anfyr4lfyo.jpg",
      description: "In 2035, robots serve humanity under three laws of robotics.",
      trailer: "https://www.youtube.com/results?search_query=I+Robot+2004+official+trailer"
    },
    {
      title: "Hidden Figures",
      year: "2016",
      genre: "Biography/Drama",
      rating: "7.8",
      duration: "127 min",
      poster: "https://m.media-amazon.com/images/M/MV5BMzg2Mzg4YmUtNDdkNy00NWY1LWE3NmEtZWMwNGNlMzE5YzU3XkEyXkFqcGdeQXVyMjA5MTIzMjQ@._V1_SX300.jpg",
      description: "The untold story of African-American women mathematicians at NASA.",
      trailer: "https://www.youtube.com/results?search_query=Hidden+Figures+2016+official+trailer"
    },
    {
      title: "A Beautiful Mind",
      year: "2001",
      genre: "Biography/Drama",
      rating: "8.2",
      duration: "135 min",
      poster: "https://m.media-amazon.com/images/M/MV5BMzcwYWFkYzktZjAzNC00OGY1LWI4YTgtNzc5MzVjMDVmNjY0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      description: "The brilliant mathematician John Nash struggles with schizophrenia.",
      trailer: "https://www.youtube.com/results?search_query=A+Beautiful+Mind+2001+official+trailer"
    },
    {
      title: "Iron Man",
      year: "2008",
      genre: "Action/Sci-Fi",
      rating: "7.9",
      duration: "126 min",
      poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
      description: "Genius billionaire Tony Stark builds a high-tech suit of armor.",
      trailer: "https://www.youtube.com/results?search_query=Iron+Man+2008+official+trailer"
    },
    {
      title: "The Dark Knight",
      year: "2008",
      genre: "Action/Crime",
      rating: "9.0",
      duration: "152 min",
      poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
      description: "Batman faces the Joker in an epic battle for Gotham's soul.",
      trailer: "https://www.youtube.com/results?search_query=The+Dark+Knight+2008+official+trailer"
    },
    {
      title: "World War Z",
      year: "2013",
      genre: "Action/Horror",
      rating: "7.0",
      duration: "116 min",
      poster: "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
      description: "A global zombie pandemic threatens to end humanity.",
      trailer: "https://www.youtube.com/results?search_query=World+War+Z+2013+official+trailer"
    },
    {
      title: "Interstellar",
      year: "2014",
      genre: "Sci-Fi/Drama",
      rating: "8.6",
      duration: "169 min",
      poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      description: "Humanity's last hope lies beyond the stars.",
      trailer: "https://www.youtube.com/results?search_query=Interstellar+2014+official+trailer"
    },
    {
      title: "Oppenheimer",
      year: "2023",
      genre: "Biography/Drama",
      rating: "8.3",
      duration: "180 min",
      poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
      description: "The story of American scientist J. Robert Oppenheimer and his role in developing the atomic bomb.",
      trailer: "https://www.youtube.com/results?search_query=Oppenheimer+2023+official+trailer"
    },
    {
      title: "The Terminator",
      year: "1984",
      genre: "Sci-Fi/Action",
      rating: "8.1",
      duration: "107 min",
      poster: "https://alternativemovieposters.com/wp-content/uploads/2021/09/OSCARMARTINEZ_SHOP1-1.jpg",
      description: "A cyborg assassin sent back in time to kill the mother of humanity's savior.",
      trailer: "https://www.youtube.com/results?search_query=The+Terminator+1984+official+trailer"
    },
    {
      title: "Transformers",
      year: "2007",
      genre: "Action/Sci-Fi",
      rating: "7.0",
      duration: "144 min",
      poster: "https://i.pinimg.com/1200x/d1/a0/0e/d1a00e1ce397ac6ab5400a945225babc.jpg",
      description: "Ancient alien robots come to Earth as the fate of humanity hangs in the balance.",
      trailer: "https://www.youtube.com/results?search_query=Transformers+2007+official+trailer"
    },
    {
      title: "The Matrix",
      year: "1999",
      genre: "Sci-Fi/Action",
      rating: "8.7",
      duration: "136 min",
      poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      description: "A computer programmer discovers reality is a simulation.",
      trailer: "https://www.youtube.com/results?search_query=The+Matrix+1999+official+trailer"
    },
    {
      title: "Inception",
      year: "2010",
      genre: "Sci-Fi/Thriller",
      rating: "8.8",
      duration: "148 min",
      poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      description: "Dream within a dream - the ultimate heist.",
      trailer: "https://www.youtube.com/results?search_query=Inception+2010+official+trailer"
    },
    {
      title: "Ex Machina",
      year: "2014",
      genre: "Sci-Fi/Thriller",
      rating: "7.7",
      duration: "108 min",
      poster: "https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg",
      description: "AI meets human consciousness in this thriller.",
      trailer: "https://www.youtube.com/results?search_query=Ex+Machina+2014+official+trailer"
    },
    {
      title: "Real Steel",
      year: "2011",
      genre: "Sci-Fi/Action",
      rating: "7.1",
      duration: "127 min",
      poster: realSteelPoster,
      description: "In a future where human boxers are replaced by robots, a struggling promoter and his son build an unlikely champion.",
      trailer: "https://www.youtube.com/results?search_query=Real+Steel+2011+official+trailer"
    },
    {
      title: "Shutter Island",
      year: "2010",
      genre: "Mystery/Thriller",
      rating: "8.2",
      duration: "138 min",
      poster: "https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      description: "A U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
      trailer: "https://www.youtube.com/results?search_query=Shutter+Island+2010+official+trailer"
    },
    {
      title: "Tetris",
      year: "2023",
      genre: "Biography/Thriller",
      rating: "7.4",
      duration: "118 min",
      poster: tetrisPoster,
      description: "The true story of how the addictive video game became a Cold War battleground between rights holders and the Soviet Union.",
      trailer: "https://www.youtube.com/results?search_query=Tetris+2023+official+trailer"
    },
    {
      title: "Good Will Hunting",
      year: "1997",
      genre: "Drama/Romance",
      rating: "8.3",
      duration: "126 min",
      poster: goodWillHuntingPoster,
      description: "A troubled janitor at MIT with a genius-level IQ is guided by a therapist to confront his past and realize his potential.",
      trailer: "https://www.youtube.com/results?search_query=Good+Will+Hunting+1997+official+trailer"
    }
  ];

  return (
    <section id="movies" className="section-padding bg-background px-4 sm:px-6 lg:px-8">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 animate-fade-in">
            <div className="inline-block bg-accent/20 text-accent px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium mb-4">
              🎬 Entertainment
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Movies I <span className="text-primary">Love</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto glass-bg inline-block">
              A curated collection of films that inspire my creativity and fuel my passion for technology and innovation.
            </p>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {movies.map((movie, index) => (
              <Dialog key={movie.title}>
                <DialogTrigger asChild>
                  <Card 
                    className="group overflow-hidden bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in cursor-glow cursor-pointer"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Summary Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="glass-bg text-center max-w-full">
                            <h4 className="font-bold text-sm sm:text-base text-foreground mb-2">{movie.title}</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {movie.description}
                            </p>
                          </div>
                          <div className="mt-3 bg-primary/90 rounded-full p-2 hover:bg-primary transition-colors">
                            <Play className="h-5 w-5 text-primary-foreground fill-current" />
                          </div>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 bg-background/90 rounded-full px-2 py-1 flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium">{movie.rating}</span>
                        </div>
                      </div>

                      {/* Movie Info */}
                      <div className="p-3 sm:p-4">
                        <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                          {movie.title}
                        </h3>
                        
                        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-2">
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
                </DialogTrigger>

                <DialogContent className="sm:max-w-xl bg-card/95 backdrop-blur-xl border-border/60">
                  <DialogHeader className="sr-only">
                    <DialogTitle>{movie.title}</DialogTitle>
                    <DialogDescription>{movie.description}</DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-6 sm:grid-cols-5 items-start">
                    {/* Modal Poster */}
                    <div className="sm:col-span-2 aspect-[2/3] rounded-lg overflow-hidden border border-border/50">
                      <img
                        src={movie.poster}
                        alt={`${movie.title} poster`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Modal Details */}
                    <div className="sm:col-span-3 flex flex-col gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">{movie.title}</h3>
                        <p className="text-sm text-muted-foreground">{movie.year} • {movie.genre}</p>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="font-medium">{movie.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{movie.duration}</span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {movie.description}
                      </p>

                      <Button
                        asChild
                        className="w-full sm:w-auto mt-2 gap-2"
                      >
                        <a
                          href={movie.trailer}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Clapperboard className="h-4 w-4" />
                          Watch Trailer
                          <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-70" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
