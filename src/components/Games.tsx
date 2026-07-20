import { Gamepad2, Star, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import godOfWarImg from "@/assets/games/god-of-war-ragnarok.jpg";
import spiderman2Img from "@/assets/games/spiderman-2.jpg";
import forzaImg from "@/assets/games/forza-horizon-5.jpg";
import horizonZDImg from "@/assets/games/horizon-zero-dawn.jpg";
import horizonFWImg from "@/assets/games/horizon-forbidden-west.jpg";
import uncharted4Img from "@/assets/games/uncharted-4.jpg";
import prototype2Img from "@/assets/games/prototype-2.jpg";
import flightSimImg from "@/assets/games/flight-simulator.jpg";
import tombRaiderImg from "@/assets/games/rise-of-the-tomb-raider.jpg";
import blackMythImg from "@/assets/games/black-myth-wukong.jpg";
import tekken8Img from "@/assets/games/tekken-8.jpg";
import batmanArkhamKnightImg from "@/assets/games/batman-arkham-knight.jpg";
import cyberpunk2077Img from "@/assets/games/cyberpunk-2077.jpg";
import itTakesTwoImg from "@/assets/games/it-takes-two.jpg";
import redDeadRedemptionImg from "@/assets/games/red-dead-redemption.jpg";
import skyrimImg from "@/assets/games/skyrim.jpg";
import eldenRingImg from "@/assets/games/elden-ring.jpg";
import forza6Img from "@/assets/games/forza-6.jpg";
import redDeadRedemption2Img from "@/assets/games/red-dead-redemption-2.jpg";
import farCry5Img from "@/assets/games/far-cry-5.jpg";
import firstLight007Asset from "@/assets/games/007-first-light.png.asset.json";
const firstLight007Img = firstLight007Asset.url;

const Games = () => {
  const games = [
    {
      title: "God of War Ragnarök",
      genre: "Action/Adventure",
      year: "2022",
      platforms: "PS4, PS5, PC",
      poster: godOfWarImg,
      description: "Kratos and Atreus embark on a mythic journey for answers before Ragnarök arrives.",
    },
    {
      title: "Spider-Man 2",
      genre: "Action/Adventure",
      year: "2023",
      platforms: "PS5, PC",
      poster: spiderman2Img,
      description: "Peter Parker and Miles Morales team up against new threats in Marvel's New York.",
    },
    {
      title: "Forza Horizon 5",
      genre: "Racing/Open World",
      year: "2021",
      platforms: "Xbox Series X|S, Xbox One, PC",
      poster: forzaImg,
      description: "Explore the vibrant open world landscapes of Mexico in the ultimate racing adventure.",
    },
    {
      title: "Horizon Zero Dawn",
      genre: "Action RPG",
      year: "2017",
      platforms: "PS4, PC",
      poster: horizonZDImg,
      description: "Aloy uncovers the secrets of a world overrun by mysterious machines.",
    },
    {
      title: "Horizon Forbidden West",
      genre: "Action RPG",
      year: "2022",
      platforms: "PS4, PS5, PC",
      poster: horizonFWImg,
      description: "Aloy ventures into the Forbidden West to find the source of a mysterious plague.",
    },
    {
      title: "Uncharted 4",
      genre: "Action/Adventure",
      year: "2016",
      platforms: "PS4, PC",
      poster: uncharted4Img,
      description: "Nathan Drake's greatest adventure — a globetrotting journey of discovery.",
    },
    {
      title: "Prototype 2",
      genre: "Action/Open World",
      year: "2012",
      platforms: "PS3, Xbox 360, PC",
      poster: prototype2Img,
      description: "James Heller wields incredible shapeshifting powers to hunt down the man responsible for his family's death.",
    },
    {
      title: "Microsoft Flight Simulator",
      genre: "Simulation",
      year: "2020",
      platforms: "PC, Xbox Series X|S",
      poster: flightSimImg,
      description: "Fly anywhere in the world with stunning real-world detail and weather simulation.",
    },
    {
      title: "Rise of the Tomb Raider",
      genre: "Action/Adventure",
      year: "2015",
      platforms: "Xbox One, Xbox 360, PS4, PC",
      poster: tombRaiderImg,
      description: "Lara Croft's relentless journey to uncover an ancient immortal secret in treacherous Siberian wilderness.",
    },
    {
      title: "Black Myth: Wukong",
      genre: "Action RPG",
      year: "2024",
      platforms: "PS5, PC",
      poster: blackMythImg,
      description: "An epic action RPG rooted in Chinese mythology, playing as the Destined One on a perilous journey.",
    },
    {
      title: "Tekken 8",
      genre: "Fighting",
      year: "2024",
      platforms: "PS5, Xbox Series X|S, PC",
      poster: tekken8Img,
      description: "The latest chapter in the legendary fighting saga with stunning visuals and aggressive new gameplay mechanics.",
    },
    {
      title: "Batman: Arkham Knight",
      genre: "Action/Adventure",
      year: "2015",
      platforms: "PS4, Xbox One, PC",
      poster: batmanArkhamKnightImg,
      description: "Gotham's Dark Knight faces the ultimate threat as the city is transformed into a criminal battleground.",
    },
    {
      title: "Cyberpunk 2077",
      genre: "Action RPG",
      year: "2020",
      platforms: "PS4, PS5, Xbox One, Xbox Series X|S, PC",
      poster: cyberpunk2077Img,
      description: "A mercenary fighting for survival in the neon-drenched, dangerous megalopolis of Night City.",
    },
    {
      title: "It Takes Two",
      genre: "Co-op Adventure",
      year: "2021",
      platforms: "PS4, PS5, Xbox One, Xbox Series X|S, PC, Switch",
      poster: itTakesTwoImg,
      description: "A magical journey where two players must cooperate to heal a fractured relationship in a whimsical toy world.",
    },
    {
      title: "Red Dead Redemption",
      genre: "Action/Adventure",
      year: "2010",
      platforms: "PS3, Xbox 360, Switch, PC",
      poster: redDeadRedemptionImg,
      description: "An epic tale of loyalty, survival, and redemption set across the dying days of the American frontier.",
    },
    {
      title: "The Elder Scrolls V: Skyrim",
      genre: "Action RPG",
      year: "2011",
      platforms: "PS3, Xbox 360, PC, Switch, PS4, Xbox One",
      poster: skyrimImg,
      description: "A legendary open-world fantasy where the Dragonborn must rise to face an ancient returning threat.",
    },
    {
      title: "Elden Ring",
      genre: "Action RPG",
      year: "2022",
      platforms: "PS4, PS5, Xbox One, Xbox Series X|S, PC",
      poster: eldenRingImg,
      description: "A haunting open-world masterpiece of dark fantasy exploration, mythic combat, and grim discovery.",
    },
    {
      title: "007 First Light",
      genre: "Action/Adventure",
      year: "TBA",
      platforms: "PC, PS5, Xbox Series X|S",
      poster: firstLight007Img,
      description: "A fresh origin story for James Bond — the young agent earns his 00 status in a globe-trotting cinematic adventure.",
    },
    {
      title: "Forza Motorsport 6",
      genre: "Racing/Simulation",
      year: "2015",
      platforms: "Xbox One, PC",
      poster: forza6Img,
      description: "The ultimate simulation racing experience with over 450 cars, wet-weather racing, and stunning track visuals.",
    },
    {
      title: "Red Dead Redemption 2",
      genre: "Action/Adventure",
      year: "2018",
      platforms: "PS4, Xbox One, PC, Stadia",
      poster: redDeadRedemption2Img,
      description: "An epic western tale of outlaws, loyalty, and survival across a breathtaking, living American frontier.",
    },
    {
      title: "Far Cry 5",
      genre: "FPS/Open World",
      year: "2018",
      platforms: "PS4, Xbox One, PC",
      poster: farCry5Img,
      description: "Liberate the scenic Montana countryside from a fanatical doomsday cult in explosive open-world action.",
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
              <Dialog key={game.title}>
                <DialogTrigger asChild>
                  <Card
                    className="group overflow-hidden bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in cursor-glow cursor-pointer"
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
                          <Star className="h-3 w-3 fill-current text-primary" />
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
                </DialogTrigger>

                <DialogContent className="sm:max-w-xl bg-card/95 backdrop-blur-xl border-border/60">
                  <div className="grid gap-6 sm:grid-cols-5 items-start">
                    {/* Modal Poster */}
                    <div className="sm:col-span-2 aspect-[2/3] rounded-lg overflow-hidden border border-border/50">
                      <img
                        src={game.poster}
                        alt={`${game.title} poster`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Modal Details */}
                    <div className="sm:col-span-3 flex flex-col gap-4">
                      <div>
                        <DialogTitle asChild>
                          <h3 className="text-2xl font-bold text-foreground mb-1">{game.title}</h3>
                        </DialogTitle>
                        <p className="text-sm text-muted-foreground">{game.year} • {game.genre}</p>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1 bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{game.year}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full">
                          <Gamepad2 className="h-3.5 w-3.5" />
                          <span>{game.platforms}</span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {game.description}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
