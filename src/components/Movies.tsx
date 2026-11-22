import { useEffect, useMemo, useState } from "react";
import MobileTypingReveal from "@/components/MobileTypingReveal";
import { Play, Calendar, ChevronDown, ChevronUp, ExternalLink, Clapperboard, Film, Pin, Heart, Search, X } from "lucide-react";
import { Card } from "@/components/ui/card";
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
import threeHundredPoster from "@/assets/movies/300.jpg";
import tetrisPoster from "@/assets/movies/tetris.webp";
import goodWillHuntingPoster from "@/assets/movies/good-will-hunting.webp";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Movie = {
  title: string;
  year: string;
  trailer: string;
  poster?: string;
};

type Category = {
  category: string;
  movies: Movie[];
};

const categories: Category[] = [
  {
    category: "Superhero & Comic Book",
    movies: [
      { title: "Ant-Man", year: "2015", trailer: "https://www.youtube.com/results?search_query=Ant-Man+2015+official+trailer", poster: "https://image.tmdb.org/t/p/w500/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg" },
      { title: "Avengers: Endgame", year: "2019", trailer: "https://www.youtube.com/results?search_query=Avengers%3A+Endgame+2019+official+trailer", poster: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg" },
      { title: "Avengers: Infinity War", year: "2018", trailer: "https://www.youtube.com/results?search_query=Avengers%3A+Infinity+War+2018+official+trailer", poster: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" },
      { title: "Black Panther", year: "2018", trailer: "https://www.youtube.com/results?search_query=Black+Panther+2018+official+trailer", poster: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg" },
      { title: "Black Panther: Wakanda Forever", year: "2022", trailer: "https://www.youtube.com/results?search_query=Black+Panther%3A+Wakanda+Forever+2022+official+trailer", poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg" },
      { title: "Deadpool", year: "2016", trailer: "https://www.youtube.com/results?search_query=Deadpool+2016+official+trailer", poster: "https://image.tmdb.org/t/p/w500/3E53WEZJqP6aM84D8CckXx4pIHw.jpg" },
      { title: "Doctor Strange", year: "2016", trailer: "https://www.youtube.com/results?search_query=Doctor+Strange+2016+official+trailer", poster: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg" },
      { title: "Iron Man", year: "2008", trailer: "https://www.youtube.com/results?search_query=Iron+Man+2008+official+trailer", poster: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg" },
      { title: "Iron Man 2", year: "2010", trailer: "https://www.youtube.com/results?search_query=Iron+Man+2+2010+official+trailer", poster: "https://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg" },
      { title: "Spider-Man: No Way Home", year: "2021", trailer: "https://www.youtube.com/results?search_query=Spider-Man%3A+No+Way+Home+2021+official+trailer", poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg" },
      { title: "The Dark Knight", year: "2008", trailer: "https://www.youtube.com/results?search_query=The+Dark+Knight+2008+official+trailer", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
      { title: "The Dark Knight Rises", year: "2012", trailer: "https://www.youtube.com/results?search_query=The+Dark+Knight+Rises+2012+official+trailer", poster: "https://image.tmdb.org/t/p/w500/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg" },
      { title: "The Fantastic Four: First Steps", year: "2025", trailer: "https://www.youtube.com/results?search_query=The+Fantastic+Four%3A+First+Steps+2025+official+trailer", poster: "https://image.tmdb.org/t/p/w500/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg" },
      { title: "Thor: The Dark World", year: "2013", trailer: "https://www.youtube.com/results?search_query=Thor%3A+The+Dark+World+2013+official+trailer", poster: "https://image.tmdb.org/t/p/w500/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg" },
      { title: "Venom", year: "2018", trailer: "https://www.youtube.com/results?search_query=Venom+2018+official+trailer", poster: "https://image.tmdb.org/t/p/w500/4VrMnGuR4k5qDf2Ka4Llw1bLi0e.jpg" },
    ],
  },
  {
    category: "Action, Thriller & Martial Arts",
    movies: [
      { title: "300", year: "2006", trailer: "https://www.youtube.com/results?search_query=300+2006+official+trailer", poster: threeHundredPoster },
      { title: "Casino Royale", year: "2006", trailer: "https://www.youtube.com/results?search_query=Casino+Royale+2006+official+trailer", poster: "https://image.tmdb.org/t/p/w500/hJsiNIn1YWQsSW88tNhJwgeDXJn.jpg" },
      { title: "Drunken Master", year: "1978", trailer: "https://www.youtube.com/results?search_query=Drunken+Master+1978+official+trailer", poster: "https://image.tmdb.org/t/p/w500/cf43J2SH8tECZVl9N5n0Q6Ckche.jpg" },
      { title: "Expendables", year: "Collection", trailer: "https://www.youtube.com/results?search_query=Expendables++official+trailer", poster: "https://image.tmdb.org/t/p/w500/j09ZkH6R4JWVylBcDai1laCmGw7.jpg" },
      { title: "Extraction", year: "2020", trailer: "https://www.youtube.com/results?search_query=Extraction+2020+official+trailer", poster: "https://image.tmdb.org/t/p/w500/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg" },
      { title: "Furious 6", year: "2013", trailer: "https://www.youtube.com/results?search_query=Furious+6+2013+official+trailer", poster: "https://image.tmdb.org/t/p/w500/thSmnRdrzPBBospIOJjLZBReqzo.jpg" },
      { title: "Furious Seven", year: "2015", trailer: "https://www.youtube.com/results?search_query=Furious+Seven+2015+official+trailer", poster: "https://image.tmdb.org/t/p/w500/ktofZ9Htrjiy0P6LEowsDaxd3Ri.jpg" },
      { title: "Gladiator", year: "2000", trailer: "https://www.youtube.com/results?search_query=Gladiator+2000+official+trailer", poster: "https://amblin.com/wp-content/uploads/2018/09/gladiator_2001_poster_1.jpg" },
      { title: "James Bond", year: "Collection", trailer: "https://www.youtube.com/results?search_query=James+Bond++official+trailer", poster: "https://image.tmdb.org/t/p/w500/os0V7u6tGAuxINNrHS3LMVJbDa9.jpg" },
      { title: "Kantara: A Legend Chapter 1", year: "2025", trailer: "https://www.youtube.com/results?search_query=Kantara%3A+A+Legend+Chapter+1+2025+official+trailer", poster: "https://image.tmdb.org/t/p/w500/ehQPboTPaIMkMUOoNOh8e7pZ5Rp.jpg" },
      { title: "Mad Max: Fury Road", year: "2015", trailer: "https://www.youtube.com/results?search_query=Mad+Max%3A+Fury+Road+2015+official+trailer", poster: "https://image.tmdb.org/t/p/w500/ulcAi4dKpAjHwYGS08vNyx9H6I9.jpg" },
      { title: "Meg 2: The Trench", year: "2023", trailer: "https://www.youtube.com/results?search_query=Meg+2%3A+The+Trench+2023+official+trailer", poster: "https://image.tmdb.org/t/p/w500/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg" },
      { title: "One Battle After Another", year: "2025", trailer: "https://www.youtube.com/results?search_query=One+Battle+After+Another+2025+official+trailer", poster: "https://image.tmdb.org/t/p/w500/lbBWwxBht4JFP5PsuJ5onpMqugW.jpg" },
      { title: "Pirates Of The Caribbean", year: "Collection", trailer: "https://www.youtube.com/results?search_query=Pirates+Of+The+Caribbean++official+trailer", poster: "https://image.tmdb.org/t/p/w500/poHwCZeWzJCShH7tOjg8RIoyjcw.jpg" },
      { title: "Seven Samurai", year: "1954", trailer: "https://www.youtube.com/results?search_query=Seven+Samurai+1954+official+trailer", poster: "https://image.tmdb.org/t/p/w500/klSXeepcjr89ltqfwcth8xXHiwC.jpg" },
      { title: "Sherlock Holmes", year: "2009", trailer: "https://www.youtube.com/results?search_query=Sherlock+Holmes+2009+official+trailer", poster: "https://image.tmdb.org/t/p/w500/lT8ywU0IjG0Ui0anPXpksvf7dPw.jpg" },
      { title: "Stealth", year: "2005", trailer: "https://www.youtube.com/results?search_query=Stealth+2005+official+trailer", poster: "https://image.tmdb.org/t/p/w500/cVtQHyTwaDhYFVRFXSuDthC2bXH.jpg" },
    ],
  },
  {
    category: "Sci-Fi & Speculative Fiction",
    movies: [
      { title: "2012", year: "2009", trailer: "https://www.youtube.com/results?search_query=2012+2009+official+trailer", poster: "https://image.tmdb.org/t/p/w500/299RfZa1nHv2pVXqVOnviiOZkgw.jpg" },
      { title: "Avatar", year: "2009", trailer: "https://www.youtube.com/results?search_query=Avatar+2009+official+trailer", poster: "https://image.tmdb.org/t/p/w500/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg" },
      { title: "Avatar: The Way Of Water", year: "2022", trailer: "https://www.youtube.com/results?search_query=Avatar%3A+The+Way+Of+Water+2022+official+trailer", poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
      { title: "Ex Machina", year: "2014", trailer: "https://www.youtube.com/results?search_query=Ex+Machina+2014+official+trailer", poster: "https://image.tmdb.org/t/p/w500/dmJW8IAKHKxFNiUnoDR7JfsK7Rp.jpg" },
      { title: "Gravity", year: "2013", trailer: "https://www.youtube.com/results?search_query=Gravity+2013+official+trailer", poster: "https://image.tmdb.org/t/p/w500/kZ2nZw8D681aphje8NJi8EfbL1U.jpg" },
      { title: "I, Robot", year: "2004", trailer: "https://www.youtube.com/results?search_query=I%2C+Robot+2004+official+trailer", poster: "https://image.tmdb.org/t/p/w500/efwv6F2lGaghjPpBRSINHtoEiZB.jpg" },
      { title: "Inception", year: "2010", trailer: "https://www.youtube.com/results?search_query=Inception+2010+official+trailer", poster: "https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg" },
      { title: "Interstellar", year: "2014", trailer: "https://www.youtube.com/results?search_query=Interstellar+2014+official+trailer", poster: "https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg" },
      { title: "Jurassic World: Fallen Kingdom", year: "2018", trailer: "https://www.youtube.com/results?search_query=Jurassic+World%3A+Fallen+Kingdom+2018+official+trailer", poster: "https://image.tmdb.org/t/p/w500/x2Us3jR6ToMJjbcPbLimYoxf6xr.jpg" },
      { title: "Real Steel", year: "2011", trailer: "https://www.youtube.com/results?search_query=Real+Steel+2011+official+trailer", poster: realSteelPoster },
      { title: "Terminator", year: "Collection", trailer: "https://www.youtube.com/results?search_query=Terminator++official+trailer", poster: "https://image.tmdb.org/t/p/w500/qvktm0BHcnmDpul4Hz01GIazWPr.jpg" },
      { title: "The Matrix", year: "1999", trailer: "https://www.youtube.com/results?search_query=The+Matrix+1999+official+trailer", poster: "https://image.tmdb.org/t/p/w500/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg" },
      { title: "The Matrix Reloaded", year: "2003", trailer: "https://www.youtube.com/results?search_query=The+Matrix+Reloaded+2003+official+trailer", poster: "https://image.tmdb.org/t/p/w500/aA5qHS0FbSXO8PxcxUIHbDrJyuh.jpg" },
      { title: "The Matrix Revolutions", year: "2003", trailer: "https://www.youtube.com/results?search_query=The+Matrix+Revolutions+2003+official+trailer", poster: "https://image.tmdb.org/t/p/w500/bkkS61w94ZVMNVd8KEyyJl2tnY5.jpg" },
      { title: "Transformers: The Last Knight", year: "2017", trailer: "https://www.youtube.com/results?search_query=Transformers%3A+The+Last+Knight+2017+official+trailer", poster: "https://image.tmdb.org/t/p/w500/s5HQf2Gb3lIO2cRcFwNL9sn1o1o.jpg" },
      { title: "World War Z", year: "2013", trailer: "https://www.youtube.com/results?search_query=World+War+Z+2013+official+trailer", poster: "https://image.tmdb.org/t/p/w500/aCnVdvExw6UWSeQfr0tUH3jr4qG.jpg" },
    ],
  },
  {
    category: "Fantasy & Mythological Adventure",
    movies: [
      { title: "Harry Potter", year: "Collection", trailer: "https://www.youtube.com/results?search_query=Harry+Potter++official+trailer", poster: "https://image.tmdb.org/t/p/w500/SJCnXVBJZh7X7ePLt6XMp6TZAj.jpg" },
      { title: "Life Of Pi", year: "2012", trailer: "https://www.youtube.com/results?search_query=Life+Of+Pi+2012+official+trailer", poster: "https://image.tmdb.org/t/p/w500/iLgRu4hhSr6V1uManX6ukDriiSc.jpg" },
      { title: "Ramayana: Part 1", year: "2026", trailer: "https://www.youtube.com/results?search_query=Ramayana%3A+Part+1+2026+official+trailer", poster: "https://ramayanariseofalegend.com/assets/images/ipadbannerportrait.jpg" },
      { title: "The Hobbit: An Unexpected Journey", year: "2012", trailer: "https://www.youtube.com/results?search_query=The+Hobbit%3A+An+Unexpected+Journey+2012+official+trailer", poster: "https://image.tmdb.org/t/p/w500/yHA9Fc37VmpUA5UncTxxo3rTGVA.jpg" },
      { title: "The Hobbit: The Battle Of The Five Armies", year: "2014", trailer: "https://www.youtube.com/results?search_query=The+Hobbit%3A+The+Battle+Of+The+Five+Armies+2014+official+trailer", poster: "https://image.tmdb.org/t/p/w500/xT98tLqatZPQApyRmlPL12LtiWp.jpg" },
      { title: "The Hobbit: The Desolation Of Smaug", year: "2013", trailer: "https://www.youtube.com/results?search_query=The+Hobbit%3A+The+Desolation+Of+Smaug+2013+official+trailer", poster: "https://image.tmdb.org/t/p/w500/xQYiXsheRCDBA39DOrmaw1aSpbk.jpg" },
      { title: "The Lord Of The Rings: The Return Of The King", year: "2003", trailer: "https://www.youtube.com/results?search_query=The+Lord+Of+The+Rings%3A+The+Return+Of+The+King+2003+official+trailer", poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" },
      { title: "The Lord Of The Rings: The Two Towers", year: "2002", trailer: "https://www.youtube.com/results?search_query=The+Lord+Of+The+Rings%3A+The+Two+Towers+2002+official+trailer", poster: "https://image.tmdb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg" },
    ],
  },
  {
    category: "Animation & Family",
    movies: [
      { title: "Aladdin", year: "2019", trailer: "https://www.youtube.com/results?search_query=Aladdin+2019+official+trailer", poster: "https://image.tmdb.org/t/p/w500/ykUEbfpkf8d0w49pHh0AD2KrT52.jpg" },
      { title: "Despicable Me", year: "2010", trailer: "https://www.youtube.com/results?search_query=Despicable+Me+2010+official+trailer", poster: "https://image.tmdb.org/t/p/w500/smQcYI4DiF15HKt9RRpLywoWhnK.jpg" },
      { title: "Despicable Me 3", year: "2017", trailer: "https://www.youtube.com/results?search_query=Despicable+Me+3+2017+official+trailer", poster: "https://image.tmdb.org/t/p/w500/6t3YWl7hrr88lCEFlGVqW5yV99R.jpg" },
      { title: "Finding Dory", year: "2016", trailer: "https://www.youtube.com/results?search_query=Finding+Dory+2016+official+trailer", poster: "https://image.tmdb.org/t/p/w500/3UVe8NL1E2ZdUZ9EDlKGJY5UzE.jpg" },
      { title: "Finding Nemo", year: "2003", trailer: "https://www.youtube.com/results?search_query=Finding+Nemo+2003+official+trailer", poster: "https://image.tmdb.org/t/p/w500/5lc6nQc0VhWFYFbNv016xze8Jvy.jpg" },
      { title: "Frozen", year: "2013", trailer: "https://www.youtube.com/results?search_query=Frozen+2013+official+trailer", poster: "https://image.tmdb.org/t/p/w500/itAKcobTYGpYT8Phwjd8c9hleTo.jpg" },
      { title: "Frozen II", year: "2019", trailer: "https://www.youtube.com/results?search_query=Frozen+II+2019+official+trailer", poster: "https://image.tmdb.org/t/p/w500/mINJaa34MtknCYl5AjtNJzWj8cD.jpg" },
      { title: "How To Train Your Dragon", year: "2010", trailer: "https://www.youtube.com/results?search_query=How+To+Train+Your+Dragon+2010+official+trailer", poster: "https://image.tmdb.org/t/p/w500/53dsJ3oEnBhTBVMigWJ9tkA5bzJ.jpg" },
      { title: "Ice Age", year: "2002", trailer: "https://www.youtube.com/results?search_query=Ice+Age+2002+official+trailer", poster: "https://image.tmdb.org/t/p/w500/gLhHHZUzeseRXShoDyC4VqLgsNv.jpg" },
      { title: "Ice Age: Collision Course", year: "2016", trailer: "https://www.youtube.com/results?search_query=Ice+Age%3A+Collision+Course+2016+official+trailer", poster: "https://image.tmdb.org/t/p/w500/okF78W1AcXAenlYFE3vna9Uuqjp.jpg" },
      { title: "Inside Out", year: "2015", trailer: "https://www.youtube.com/results?search_query=Inside+Out+2015+official+trailer", poster: "https://image.tmdb.org/t/p/w500/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg" },
      { title: "Kung Fu Panda", year: "2008", trailer: "https://www.youtube.com/results?search_query=Kung+Fu+Panda+2008+official+trailer", poster: "https://image.tmdb.org/t/p/w500/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg" },
      { title: "Kung Fu Panda 2", year: "2011", trailer: "https://www.youtube.com/results?search_query=Kung+Fu+Panda+2+2011+official+trailer", poster: "https://image.tmdb.org/t/p/w500/mtqqD00vB4PGRt20gWtGqFhrkd0.jpg" },
      { title: "Kung Fu Panda 3", year: "2016", trailer: "https://www.youtube.com/results?search_query=Kung+Fu+Panda+3+2016+official+trailer", poster: "https://image.tmdb.org/t/p/w500/oajNi4Su39WAByHI6EONu8G8HYn.jpg" },
      { title: "Kung Fu Panda 4", year: "2024", trailer: "https://www.youtube.com/results?search_query=Kung+Fu+Panda+4+2024+official+trailer", poster: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg" },
      { title: "Madagascar", year: "2005", trailer: "https://www.youtube.com/results?search_query=Madagascar+2005+official+trailer", poster: "https://image.tmdb.org/t/p/w500/zMpJY5CJKUufG9OTw0In4eAFqPX.jpg" },
      { title: "Moana", year: "2016", trailer: "https://www.youtube.com/results?search_query=Moana+2016+official+trailer", poster: "https://image.tmdb.org/t/p/w500/zKVgiv5qHCvCLT4A2ymJi5QeXDH.jpg" },
      { title: "Moana 2", year: "2024", trailer: "https://www.youtube.com/results?search_query=Moana+2+2024+official+trailer", poster: "https://image.tmdb.org/t/p/w500/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg" },
      { title: "Mufasa: The Lion King", year: "2024", trailer: "https://www.youtube.com/results?search_query=Mufasa%3A+The+Lion+King+2024+official+trailer", poster: "https://image.tmdb.org/t/p/w500/jbOSUAWMGzGL1L4EaUF8K6zYFo7.jpg" },
      { title: "Ratatouille", year: "2007", trailer: "https://www.youtube.com/results?search_query=Ratatouille+2007+official+trailer", poster: "https://image.tmdb.org/t/p/w500/t3vaWRPSf6WjDSamIkKDs1iQWna.jpg" },
      { title: "Spider-Man: Into The Spider-Verse", year: "2018", trailer: "https://www.youtube.com/results?search_query=Spider-Man%3A+Into+The+Spider-Verse+2018+official+trailer", poster: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg" },
      { title: "Stuart Little", year: "Collection", trailer: "https://www.youtube.com/results?search_query=Stuart+Little++official+trailer", poster: "https://image.tmdb.org/t/p/w500/362lcwTJlNyAhitTlp2UraECISR.jpg" },
      { title: "Tangled", year: "2010", trailer: "https://www.youtube.com/results?search_query=Tangled+2010+official+trailer", poster: "https://image.tmdb.org/t/p/w500/ym7Kst6a4uodryxqbGOxmewF235.jpg" },
      { title: "The Angry Birds Movie", year: "2016", trailer: "https://www.youtube.com/results?search_query=The+Angry+Birds+Movie+2016+official+trailer", poster: "https://image.tmdb.org/t/p/w500/iOH0fEFtV9z9rZp9zmBFGGeWicv.jpg" },
      { title: "The Angry Birds Movie 2", year: "2019", trailer: "https://www.youtube.com/results?search_query=The+Angry+Birds+Movie+2+2019+official+trailer", poster: "https://image.tmdb.org/t/p/w500/ebe8hJRCwdflNQbUjRrfmqtUiNi.jpg" },
      { title: "The Lion King", year: "1994", trailer: "https://www.youtube.com/results?search_query=The+Lion+King+1994+official+trailer", poster: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg" },
      { title: "The Super Mario Bros. Movie", year: "2023", trailer: "https://www.youtube.com/results?search_query=The+Super+Mario+Bros.+Movie+2023+official+trailer", poster: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg" },
      { title: "Up", year: "2009", trailer: "https://www.youtube.com/results?search_query=Up+2009+official+trailer", poster: "https://image.tmdb.org/t/p/w500/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg" },
      { title: "WALL-E", year: "2008", trailer: "https://www.youtube.com/results?search_query=WALL-E+2008+official+trailer", poster: "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg" },
      { title: "Zootopia", year: "2016", trailer: "https://www.youtube.com/results?search_query=Zootopia+2016+official+trailer", poster: "https://image.tmdb.org/t/p/w500/hlK0e0wAQ3VLuJcsfIYPvb4JVud.jpg" },
    ],
  },
  {
    category: "Biography, True Story & Historical Drama",
    movies: [
      { title: "A Beautiful Mind", year: "2001", trailer: "https://www.youtube.com/results?search_query=A+Beautiful+Mind+2001+official+trailer", poster: "https://image.tmdb.org/t/p/w500/rEIg5yJdNOt9fmX4P8gU9LeNoTQ.jpg" },
      { title: "Argo", year: "2012", trailer: "https://www.youtube.com/results?search_query=Argo+2012+official+trailer", poster: "https://image.tmdb.org/t/p/w500/m5gPWFZFIp4UJFABgWyLkbXv8GX.jpg" },
      { title: "F1 The Movie", year: "2025", trailer: "https://www.youtube.com/results?search_query=F1+The+Movie+2025+official+trailer", poster: "https://mediafiles.cineplex.com/Central/Film/Posters/37964_768_1024.jpg" },
      { title: "Gandhi", year: "1982", trailer: "https://www.youtube.com/results?search_query=Gandhi+1982+official+trailer", poster: "https://image.tmdb.org/t/p/w500/rOXftt7SluxskrFrvU7qFJa5zeN.jpg" },
      { title: "Green Book", year: "2018", trailer: "https://www.youtube.com/results?search_query=Green+Book+2018+official+trailer", poster: "https://image.tmdb.org/t/p/w500/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg" },
      { title: "Hidden Figures", year: "2016", trailer: "https://www.youtube.com/results?search_query=Hidden+Figures+2016+official+trailer", poster: "https://image.tmdb.org/t/p/w500/9lfz2W2uGjyow3am00rsPJ8iOyq.jpg" },
      { title: "Invictus", year: "2009", trailer: "https://www.youtube.com/results?search_query=Invictus+2009+official+trailer", poster: "https://image.tmdb.org/t/p/w500/runuhBAAX7PmdjGhqRKCyl4bh7z.jpg" },
      { title: "Oppenheimer", year: "2023", trailer: "https://www.youtube.com/results?search_query=Oppenheimer+2023+official+trailer", poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
      { title: "Rocky", year: "1976", trailer: "https://www.youtube.com/results?search_query=Rocky+1976+official+trailer", poster: "https://image.tmdb.org/t/p/w500/xSI0dbKLDETwhiVUy6hGE8KXUln.jpg" },
      { title: "Schindler's List", year: "1993", trailer: "https://www.youtube.com/results?search_query=Schindler%27s+List+1993+official+trailer", poster: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg" },
      { title: "Soorarai Pottru", year: "2020", trailer: "https://www.youtube.com/results?search_query=Soorarai+Pottru+2020+official+trailer", poster: "https://image.tmdb.org/t/p/w500/5uimlxPCgAei8JfQUDFEUQLoyyh.jpg" },
      { title: "Spotlight", year: "2015", trailer: "https://www.youtube.com/results?search_query=Spotlight+2015+official+trailer", poster: "https://image.tmdb.org/t/p/w500/8DPGG400FgaFWaqcv11n8mRd2NG.jpg" },
      { title: "Tetris", year: "2023", trailer: "https://www.youtube.com/results?search_query=Tetris+2023+official+trailer", poster: tetrisPoster },
      { title: "The Aviator", year: "2004", trailer: "https://www.youtube.com/results?search_query=The+Aviator+2004+official+trailer", poster: "https://image.tmdb.org/t/p/w500/lx4kWcZc3o9PaNxlQpEJZM17XUI.jpg" },
      { title: "The Man Who Knew Infinity", year: "2015", trailer: "https://www.youtube.com/results?search_query=The+Man+Who+Knew+Infinity+2015+official+trailer", poster: "https://image.tmdb.org/t/p/w500/v2X1BtkxaV8pzLbmM8a5gTdpg7B.jpg" },
      { title: "The Pianist", year: "2002", trailer: "https://www.youtube.com/results?search_query=The+Pianist+2002+official+trailer", poster: "https://image.tmdb.org/t/p/w500/2hFvxCCWrTmCYwfy7yum0GKRi3Y.jpg" },
      { title: "The Social Network", year: "2010", trailer: "https://www.youtube.com/results?search_query=The+Social+Network+2010+official+trailer", poster: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg" },
      { title: "The Wolf Of Wall Street", year: "2013", trailer: "https://www.youtube.com/results?search_query=The+Wolf+Of+Wall+Street+2013+official+trailer", poster: "https://image.tmdb.org/t/p/w500/kW9LmvYHAaS9iA0tHmZVq8hQYoq.jpg" },
    ],
  },
  {
    category: "Crime, Mystery, Drama & War",
    movies: [
      { title: "12 Angry Men", year: "1957", trailer: "https://www.youtube.com/results?search_query=12+Angry+Men+1957+official+trailer", poster: "https://image.tmdb.org/t/p/w500/ppd84D2i9W8jXmsyInGyihiSyqz.jpg" },
      { title: "Blood Diamond", year: "2006", trailer: "https://www.youtube.com/results?search_query=Blood+Diamond+2006+official+trailer", poster: "https://image.tmdb.org/t/p/w500/tnLxPpajkbVdbQl5B9CuD7sSpz9.jpg" },
      { title: "City Lights", year: "1931", trailer: "https://www.youtube.com/results?search_query=City+Lights+1931+official+trailer", poster: "https://image.tmdb.org/t/p/w500/ugmakEL5y294I5bXgiBqApuZpwc.jpg" },
      { title: "Django Unchained", year: "2012", trailer: "https://www.youtube.com/results?search_query=Django+Unchained+2012+official+trailer", poster: "https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg" },
      { title: "Fight Club", year: "1999", trailer: "https://www.youtube.com/results?search_query=Fight+Club+1999+official+trailer", poster: "https://image.tmdb.org/t/p/w500/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg" },
      { title: "Full Metal Jacket", year: "1987", trailer: "https://www.youtube.com/results?search_query=Full+Metal+Jacket+1987+official+trailer", poster: "https://image.tmdb.org/t/p/w500/kMKyx1k8hWWscYFnPbnxxN4Eqo4.jpg" },
      { title: "Good Will Hunting", year: "1997", trailer: "https://www.youtube.com/results?search_query=Good+Will+Hunting+1997+official+trailer", poster: goodWillHuntingPoster },
      { title: "Goodfellas", year: "1990", trailer: "https://www.youtube.com/results?search_query=Goodfellas+1990+official+trailer", poster: "https://image.tmdb.org/t/p/w500/9OkCLM73MIU2CrKZbqiT8Ln1wY2.jpg" },
      { title: "Pulp Fiction", year: "1994", trailer: "https://www.youtube.com/results?search_query=Pulp+Fiction+1994+official+trailer", poster: "https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg" },
      { title: "Saving Private Ryan", year: "1998", trailer: "https://www.youtube.com/results?search_query=Saving+Private+Ryan+1998+official+trailer", poster: "https://image.tmdb.org/t/p/w500/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg" },
      { title: "Shutter Island", year: "2010", trailer: "https://www.youtube.com/results?search_query=Shutter+Island+2010+official+trailer", poster: "https://image.tmdb.org/t/p/w500/nrmXQ0zcZUL8jFLrakWc90IR8z9.jpg" },
      { title: "Slumdog Millionaire", year: "2008", trailer: "https://www.youtube.com/results?search_query=Slumdog+Millionaire+2008+official+trailer", poster: "https://image.tmdb.org/t/p/w500/5leCCi7ZF0CawAfM5Qo2ECKPprc.jpg" },
      { title: "The Departed", year: "2006", trailer: "https://www.youtube.com/results?search_query=The+Departed+2006+official+trailer", poster: "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg" },
      { title: "The Godfather", year: "1972", trailer: "https://www.youtube.com/results?search_query=The+Godfather+1972+official+trailer", poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
      { title: "The Good, The Bad And The Ugly", year: "1966", trailer: "https://www.youtube.com/results?search_query=The+Good%2C+The+Bad+And+The+Ugly+1966+official+trailer", poster: "https://image.tmdb.org/t/p/w500/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg" },
      { title: "The Revenant", year: "2015", trailer: "https://www.youtube.com/results?search_query=The+Revenant+2015+official+trailer", poster: "https://image.tmdb.org/t/p/w500/ji3ecJphATlVgWNY0B0RVXZizdf.jpg" },
      { title: "The Shawshank Redemption", year: "1994", trailer: "https://www.youtube.com/results?search_query=The+Shawshank+Redemption+1994+official+trailer", poster: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg" },
      { title: "Titanic", year: "1997", trailer: "https://www.youtube.com/results?search_query=Titanic+1997+official+trailer", poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg" },
    ],
  },
  {
    category: "Documentaries & Music Specials",
    movies: [
      { title: "Muhammad Ali", year: "2021", trailer: "https://www.youtube.com/results?search_query=Muhammad+Ali+2021+official+trailer", poster: "https://image.tmdb.org/t/p/w500/yj3ddO67Am65Fi2TLmw81nMuYne.jpg" },
      { title: "The Real Charlie Chaplin", year: "2021", trailer: "https://www.youtube.com/results?search_query=The+Real+Charlie+Chaplin+2021+official+trailer", poster: "https://image.tmdb.org/t/p/w500/zajwv6MwIweYlyhu1ibMojr65wB.jpg" },
      { title: "Thriller 40", year: "2023", trailer: "https://www.youtube.com/results?search_query=Thriller+40+2023+official+trailer", poster: "https://image.tmdb.org/t/p/w500/5LOKk1Ca1YaCb3EjTEMDJdPbQxN.jpg" },
    ],
  },
];

const allMovies = categories.flatMap(({ category, movies }) =>
  movies.map((movie) => ({ ...movie, category }))
);
const FAVORITES_STORAGE_KEY = "movies-i-love-favorites";
const MOVIES_PAGE_SIZE = 12;

const movieNotes = [
  {
    movie: "Inception",
    line: "An idea is the world's stickiest sticky note. Plant the good ones.",
    tone: "gold",
  },
  {
    movie: "The Matrix",
    line: "There is no spoon — and half the time, no actual bug either.",
    tone: "cyan",
  },
  {
    movie: "Iron Man",
    line: "Built in a cave, with a box of scraps. Excuses officially cancelled.",
    tone: "coral",
  },
  {
    movie: "Rocky",
    line: "Getting hit is part of the plan; moving forward is the skill.",
    tone: "mint",
  },
  {
    movie: "Kung Fu Panda",
    line: "There is no secret ingredient. It was you all along.",
    tone: "lavender",
  },
  {
    movie: "WALL-E",
    line: "One tidy little robot saved a whole planet. Small habits, big orbit.",
    tone: "peach",
  },
  {
    movie: "12 Angry Men",
    line: "One calm 'wait — let's look again' can flip an entire room.",
    tone: "mint",
  },
  {
    movie: "Ant-Man",
    line: "Think small, impact big — the Ant-Man rule of good code.",
    tone: "coral",
  },
  {
    movie: "Interstellar",
    line: "Some messages travel faster through love than through light.",
    tone: "cyan",
  },
  {
    movie: "The Social Network",
    line: "Ship it from your dorm; history rarely books a conference room.",
    tone: "lavender",
  },
  {
    movie: "Up",
    line: "Adventure is out there — sometimes it floats on a bunch of balloons.",
    tone: "peach",
  },
  {
    movie: "The Shawshank Redemption",
    line: "Geology is the study of pressure — and so is patience.",
    tone: "gold",
  },
  {
    movie: "Good Will Hunting",
    line: "Knowing the theory is useful; showing up for the messy human part is harder.",
    tone: "cyan",
  },
  {
    movie: "Forrest Gump",
    line: "You cannot plan every mile. Keep walking and bring snacks.",
    tone: "mint",
  },
  {
    movie: "The Lord of the Rings",
    line: "Small steps still count, even when the quest has terrible parking.",
    tone: "coral",
  },
  {
    movie: "Tetris",
    line: "When life stacks up, one good move can clear more than a row.",
    tone: "lavender",
  },
];

const MoviePoster = ({ movie, className }: { movie: Movie; className?: string }) => {
  const [imageFailed, setImageFailed] = useState(false);

  if (!movie.poster || imageFailed) {
    return (
      <div className={cn("flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/20 via-card to-accent/15 p-3 text-center", className)}>
        <Film className="h-6 w-6 text-primary/70" aria-hidden="true" />
        <span className="line-clamp-4 text-xs font-semibold leading-tight text-foreground">{movie.title}</span>
      </div>
    );
  }

  return (
    <img
      src={movie.poster}
      alt={`${movie.title} poster`}
      className={cn("h-full w-full object-cover", className)}
      loading="lazy"
      decoding="async"
      onError={() => setImageFailed(true)}
    />
  );
};

const MovieCard = ({
  movie,
  category,
  index,
  isFavorite,
  onToggleFavorite,
}: {
  movie: Movie;
  category: string;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) => (
  <Dialog>
    <Card
      className="group relative overflow-hidden rounded-xl border-border/60 bg-card/65 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
      style={{ animationDelay: `${Math.min(index, 8) * 0.035}s` }}
    >
      <DialogTrigger asChild>
        <button type="button" className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
          <div className="relative aspect-[2/3] overflow-hidden bg-muted">
            <MoviePoster movie={movie} className="transition-transform duration-300 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-75 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-2 left-2 right-2 line-clamp-2 text-xs font-medium text-foreground/90 sm:text-sm">
              {category}
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="rounded-full bg-primary/95 p-2.5 text-primary-foreground shadow-lg">
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              </span>
            </span>
          </div>
          <div className="min-h-[4.5rem] p-3 pr-11 sm:min-h-[5rem] sm:p-3.5 sm:pr-11">
            <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-[0.95rem]">
              {movie.title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <span>{movie.year}</span>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <button
        type="button"
        className={cn(
          "absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full border border-foreground/20 bg-background/45 text-foreground shadow-sm backdrop-blur transition hover:scale-105 hover:bg-background/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          isFavorite && "border-primary/50 bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        aria-label={isFavorite ? `Remove ${movie.title} from saved movies` : `Save ${movie.title}`}
        aria-pressed={isFavorite}
        onClick={onToggleFavorite}
      >
        <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} aria-hidden="true" />
      </button>
    </Card>

    <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-xl border-border/60">
      <DialogHeader className="sr-only">
        <DialogTitle>{movie.title}</DialogTitle>
        <DialogDescription>{`${movie.title} (${movie.year}) — ${category}`}</DialogDescription>
      </DialogHeader>

      <div className="grid gap-5 sm:grid-cols-5 items-start">
        <div className="sm:col-span-2 aspect-[2/3] overflow-hidden rounded-lg border border-border/50 bg-muted">
          <MoviePoster movie={movie} />
        </div>

        <div className="sm:col-span-3 flex flex-col gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{movie.title}</h3>
            <p className="text-sm text-muted-foreground">{movie.year}</p>
          </div>
          <div className="inline-flex w-fit items-center rounded-full bg-accent/15 text-accent px-3 py-1 text-xs font-medium">
            {category}
          </div>
          <Button asChild className="w-full sm:w-auto mt-1 gap-2">
            <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
              <Clapperboard className="h-4 w-4" />
              Watch Trailer
              <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-70" />
            </a>
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const Movies = () => {
  const [active, setActive] = useState<string>("All");
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [shownCount, setShownCount] = useState(MOVIES_PAGE_SIZE);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // Keep the collection usable when browser storage is unavailable.
    }
  }, [favoriteIds]);

  const filteredMovies = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    const filtered = allMovies.filter((movie) => {
      const matchesCategory = active === "All" || movie.category === active;
      const matchesFavorite = !favoritesOnly || favoriteIds.includes(movie.title);
      const matchesSearch = !normalizedSearch ||
        `${movie.title} ${movie.year} ${movie.category}`.toLocaleLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesFavorite && matchesSearch;
    });

    if (sort === "title") filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "year-newest") filtered.sort((a, b) => (Number.parseInt(b.year, 10) || 0) - (Number.parseInt(a.year, 10) || 0));
    if (sort === "year-oldest") filtered.sort((a, b) => (Number.parseInt(a.year, 10) || 0) - (Number.parseInt(b.year, 10) || 0));
    return filtered;
  }, [active, favoritesOnly, favoriteIds, search, sort]);

  const visibleMovies = filteredMovies.slice(0, shownCount);
  const total = allMovies.length;

  const updateFilter = (update: () => void) => {
    update();
    setShownCount(MOVIES_PAGE_SIZE);
  };

  const toggleFavorite = (title: string) => {
    setFavoriteIds((current) => current.includes(title)
      ? current.filter((savedTitle) => savedTitle !== title)
      : [...current, title]);
  };

  return (
    <section id="movies" className="section-padding bg-background px-4 sm:px-6 lg:px-8">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center animate-fade-in sm:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/55 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Film className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              A personal watchlist
            </div>
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              <MobileTypingReveal>Movies I <span className="text-primary">Love</span></MobileTypingReveal>
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              <MobileTypingReveal startDelay={180}>
                {total} films across {categories.length} genres. Search, save favorites, and find something to watch.
              </MobileTypingReveal>
            </p>
          </div>

          {/* Pinned screen notes */}
          <section className="library-notes" data-collapsed={!notesExpanded} aria-labelledby="movie-notes-title">
            <div className="library-notes-heading">
              <div>
                <p className="library-notes-kicker">SCREEN NOTES / {String(movieNotes.length).padStart(2, "0")}</p>
                <h3 id="movie-notes-title" className="library-notes-title">Lines from the big screen</h3>
              </div>
              <div className="library-notes-actions">
                <span className="library-notes-mark" aria-hidden="true">WATCH / REWIND</span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  aria-expanded={notesExpanded}
                  aria-controls="movie-notes-grid"
                  onClick={() => setNotesExpanded((expanded) => !expanded)}
                >
                  {notesExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {notesExpanded ? "Show fewer" : `Show more · ${movieNotes.length - 6}`}
                </Button>
              </div>
            </div>
            <div className="library-notes-grid" id="movie-notes-grid">
              {(notesExpanded ? movieNotes : movieNotes.slice(0, 6)).map((note, index) => (
                <article
                  key={note.movie}
                  className="library-note"
                  data-tone={note.tone}
                  data-note-index={index + 1}
                >
                  <Pin className="library-note-pin" size={18} strokeWidth={1.8} aria-hidden="true" />
                  <p className="library-note-line">“{note.line}”</p>
                  <p className="library-note-source">Inspired by <span>{note.movie}</span></p>
                </article>
              ))}
            </div>
          </section>

          <div className="mb-7 rounded-2xl border border-border/60 bg-card/45 p-3 shadow-sm backdrop-blur-sm sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="search"
                  value={search}
                  onChange={(event) => updateFilter(() => setSearch(event.target.value))}
                  placeholder="Search titles, years, or genres"
                  aria-label="Search movies"
                  className="h-11 rounded-xl border-border/60 bg-background/70 pl-9 pr-10 text-sm"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => updateFilter(() => setSearch(""))}
                    className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateFilter(() => setFavoritesOnly((value) => !value))}
                  aria-pressed={favoritesOnly}
                  className={cn(
                    "inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    favoritesOnly
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/60 bg-background/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  <Heart className={cn("h-4 w-4", favoritesOnly && "fill-current")} aria-hidden="true" />
                  Saved <span className="text-xs opacity-75">{favoriteIds.length}</span>
                </button>
                <label className="relative flex h-11 min-w-[9.5rem] items-center rounded-xl border border-border/60 bg-background/70 pl-3 pr-2 text-muted-foreground focus-within:ring-2 focus-within:ring-primary">
                  <span className="sr-only">Sort movies</span>
                  <select
                    value={sort}
                    onChange={(event) => updateFilter(() => setSort(event.target.value))}
                    className="h-full w-full appearance-none bg-transparent pr-5 text-sm text-foreground outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="title">Title A–Z</option>
                    <option value="year-newest">Newest first</option>
                    <option value="year-oldest">Oldest first</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4" aria-hidden="true" />
                </label>
              </div>
            </div>

            <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]" aria-label="Filter by genre">
              {[{ category: "All", count: total }, ...categories.map((category) => ({ category: category.category, count: category.movies.length }))].map(({ category, count }) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => updateFilter(() => setActive(category))}
                  aria-pressed={active === category}
                  className={cn(
                    "inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm",
                    active === category
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/60 bg-background/65 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {category}<span className="opacity-65">{count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between gap-3 text-sm text-muted-foreground" aria-live="polite">
            <p>{filteredMovies.length === 0 ? "No movies found" : `Showing ${visibleMovies.length} of ${filteredMovies.length} movies`}</p>
            {(search || favoritesOnly || active !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFavoritesOnly(false);
                  setActive("All");
                  setShownCount(MOVIES_PAGE_SIZE);
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" /> Clear filters
              </button>
            )}
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {visibleMovies.map((movie, index) => (
                <MovieCard
                  key={`${movie.category}-${movie.title}`}
                  movie={movie}
                  category={movie.category}
                  index={index}
                  isFavorite={favoriteIds.includes(movie.title)}
                  onToggleFavorite={() => toggleFavorite(movie.title)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/70 bg-card/30 px-5 py-12 text-center">
              <Film className="mx-auto mb-3 h-8 w-8 text-muted-foreground/70" aria-hidden="true" />
              <p className="font-medium text-foreground">{favoritesOnly ? "No saved movies yet" : "No matches in this collection"}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {favoritesOnly ? "Tap the heart on a poster to keep it close." : "Try another title, year, or genre."}
              </p>
            </div>
          )}

          {filteredMovies.length > MOVIES_PAGE_SIZE && (
            <div className="mt-7 flex justify-center">
              {shownCount < filteredMovies.length ? (
                <Button type="button" variant="outline" className="h-11 rounded-xl px-5" onClick={() => setShownCount((count) => count + MOVIES_PAGE_SIZE)}>
                  Show more movies <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button type="button" variant="ghost" className="h-11 rounded-xl px-5 text-muted-foreground" onClick={() => setShownCount(MOVIES_PAGE_SIZE)}>
                  Show fewer <ChevronUp className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          )}

          <div className="text-center mt-12 animate-fade-in">
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
