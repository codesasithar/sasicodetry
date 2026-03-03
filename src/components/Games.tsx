import { Gamepad2, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Games = () => {
  const games = [
    {
      title: "God of War Ragnarök",
      genre: "Action/Adventure",
      poster: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
      description: "Kratos and Atreus embark on a mythic journey for answers before Ragnarök arrives.",
    },
    {
      title: "Spider-Man 2",
      genre: "Action/Adventure",
      poster: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1301/fdb2c9230ebf872e2944f2b68ede25c9bf0a257d41e3a1a6.png",
      description: "Peter Parker and Miles Morales team up against new threats in Marvel's New York.",
    },
    {
      title: "Forza Horizon 5",
      genre: "Racing/Open World",
      poster: "https://store-images.s-microsoft.com/image/apps.41005.13718773309702837.b1bfa498-1e93-4224-952f-25308a75a85a.6e3f9b76-e150-4382-b714-312bf9e3217f",
      description: "Explore the vibrant open world landscapes of Mexico in the ultimate racing adventure.",
    },
    {
      title: "Horizon Zero Dawn",
      genre: "Action RPG",
      poster: "https://image.api.playstation.com/vulcan/ap/rnd/202009/2820/h12URI7MdswtM1GnMFMetbVn.png",
      description: "Aloy uncovers the secrets of a world overrun by mysterious machines.",
    },
    {
      title: "Horizon Forbidden West",
      genre: "Action RPG",
      poster: "https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/HO8vkO9pfXhwbHi5WHECQJdN.png",
      description: "Aloy ventures into the Forbidden West to find the source of a mysterious plague.",
    },
    {
      title: "Uncharted 4",
      genre: "Action/Adventure",
      poster: "https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/niMUubpU9y1PkGFVTzEFMabi.png",
      description: "Nathan Drake's greatest adventure — a globetrotting journey of discovery.",
    },
    {
      title: "Prototype 2",
      genre: "Action/Open World",
      poster: "https://upload.wikimedia.org/wikipedia/en/2/29/Prototype_2_cover.png",
      description: "James Heller wields incredible shapeshifting powers to hunt down the man responsible for his family's death.",
    },
    {
      title: "Microsoft Flight Simulator",
      genre: "Simulation",
      poster: "https://store-images.s-microsoft.com/image/apps.58289.14486259768498498.a]fa6e4e-7f26-4a7a-b0f7-6f0cb4c60b3d.ae8d29f4-f4a2-4dae-83f2-e66ed75f3543",
      description: "Fly anywhere in the world with stunning real-world detail and weather simulation.",
    },
  ];

  return (
    <section id="games" className="section-padding bg-background px-4 sm:px-6 lg:px-8">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 animate-fade-in">
            <div className="inline-block bg-accent/20 text-accent px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium mb-4">
              🎮 Gaming
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Games I <span className="text-primary">Recommend</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto glass-bg inline-block">
              Epic adventures and stunning worlds that keep me inspired beyond the code editor.
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {games.map((game, index) => (
              <Card
                key={game.title}
                className="group overflow-hidden bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in cursor-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Game Poster */}
                  <div className="relative overflow-hidden aspect-[2/3]">
                    <img
                      src={game.poster}
                      alt={`${game.title} poster`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Summary Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="glass-bg text-center max-w-full">
                        <h4 className="font-bold text-sm sm:text-base text-foreground mb-2">{game.title}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {game.description}
                        </p>
                      </div>
                      <div className="mt-3 bg-primary/90 rounded-full p-2 hover:bg-primary transition-colors">
                        <Gamepad2 className="h-5 w-5 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Genre Badge */}
                    <div className="absolute top-3 right-3 bg-background/90 rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium">★</span>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {game.title}
                    </h3>
                    <div className="text-xs text-accent font-medium mb-2">
                      {game.genre}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {game.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="inline-block bg-card/50 border border-border/50 rounded-lg p-4">
              <p className="text-muted-foreground mb-2">
                <span className="text-2xl mr-2">🕹️</span>
                These games fuel my imagination and drive for innovation
              </p>
              <p className="text-sm text-muted-foreground">
                From epic storytelling to stunning open worlds — gaming at its finest
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Games;
