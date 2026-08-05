import { useMemo, useState } from "react";
import { Play, Calendar, ExternalLink, Clapperboard, Film } from "lucide-react";
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
      { title: "Ant-Man", year: "2015", trailer: "https://www.youtube.com/results?search_query=Ant-Man+2015+official+trailer", poster: "https://image.tmdb.org/t/p/w500/A7Y3p5irhjNroNpXMc6kxxrrM7S.jpg" },
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
      { title: "300", year: "2006", trailer: "https://www.youtube.com/results?search_query=300+2006+official+trailer", poster: "https://image.tmdb.org/t/p/w500/hVxd5MdkRFYVtK4zkw7zUTay1Xk.jpg" },
      { title: "Casino Royale", year: "2006", trailer: "https://www.youtube.com/results?search_query=Casino+Royale+2006+official+trailer", poster: "https://image.tmdb.org/t/p/w500/hJsiNIn1YWQsSW88tNhJwgeDXJn.jpg" },
      { title: "Drunken Master", year: "1978", trailer: "https://www.youtube.com/results?search_query=Drunken+Master+1978+official+trailer", poster: "https://image.tmdb.org/t/p/w500/cf43J2SH8tECZVl9N5n0Q6Ckche.jpg" },
      { title: "Expendables", year: "Collection", trailer: "https://www.youtube.com/results?search_query=Expendables++official+trailer", poster: "https://image.tmdb.org/t/p/w500/j09ZkH6R4JWVylBcDai1laCmGw7.jpg" },
      { title: "Extraction", year: "2020", trailer: "https://www.youtube.com/results?search_query=Extraction+2020+official+trailer", poster: "https://image.tmdb.org/t/p/w500/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg" },
      { title: "Furious 6", year: "2013", trailer: "https://www.youtube.com/results?search_query=Furious+6+2013+official+trailer", poster: "https://image.tmdb.org/t/p/w500/thSmnRdrzPBBospIOJjLZBReqzo.jpg" },
      { title: "Furious Seven", year: "2015", trailer: "https://www.youtube.com/results?search_query=Furious+Seven+2015+official+trailer", poster: "https://image.tmdb.org/t/p/w500/ktofZ9Htrjiy0P6LEowsDaxd3Ri.jpg" },
      { title: "Gladiator", year: "2000", trailer: "https://www.youtube.com/results?search_query=Gladiator+2000+official+trailer", poster: "https://image.tmdb.org/t/p/w500/7GWRCDqOQv5riogrHjxJskf7K2i.jpg" },
      { title: "James Bond", year: "Collection", trailer: "https://www.youtube.com/results?search_query=James+Bond++official+trailer", poster: "https://image.tmdb.org/t/p/w500/cwUnbz31k7K5fV0zximhN2nPM14.jpg" },
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
      { title: "Frozen", year: "2013", trailer: "https://www.youtube.com/results?search_query=Frozen+2013+official+trailer", poster: "https://image.tmdb.org/t/p/w500/1keE9oReldd7QmG8epHoY23jQXv.jpg" },
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
      { title: "F1 The Movie", year: "2025", trailer: "https://www.youtube.com/results?search_query=F1+The+Movie+2025+official+trailer", poster: "https://image.tmdb.org/t/p/w500/o4kRR0Zt08NlnMSlCHIop3sqUhX.jpg" },
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

const MovieCard = ({ movie, category, index }: { movie: Movie; category: string; index: number }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Card
        className="group overflow-hidden bg-card/50 border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in cursor-glow cursor-pointer"
        style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}
      >
        <CardContent className="p-0">
          <div className="relative overflow-hidden aspect-[2/3]">
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/25 via-card to-accent/20 p-3 text-center">
                <Film className="h-6 w-6 text-primary/70" />
                <span className="text-xs sm:text-sm font-semibold text-foreground leading-tight line-clamp-4">
                  {movie.title}
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-primary/90 rounded-full p-2">
                <Play className="h-5 w-5 text-primary-foreground fill-current" />
              </div>
            </div>
          </div>

          <div className="p-2.5 sm:p-3">
            <h3 className="font-bold text-xs sm:text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
              {movie.title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{movie.year}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </DialogTrigger>

    <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-xl border-border/60">
      <DialogHeader className="sr-only">
        <DialogTitle>{movie.title}</DialogTitle>
        <DialogDescription>{`${movie.title} (${movie.year}) — ${category}`}</DialogDescription>
      </DialogHeader>

      <div className="grid gap-5 sm:grid-cols-5 items-start">
        <div className="sm:col-span-2 aspect-[2/3] rounded-lg overflow-hidden border border-border/50">
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/25 via-card to-accent/20 p-3 text-center">
              <span className="text-sm font-semibold text-foreground">{movie.title}</span>
            </div>
          )}
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

  const total = useMemo(
    () => categories.reduce((sum, c) => sum + c.movies.length, 0),
    []
  );
  const visible = active === "All" ? categories : categories.filter((c) => c.category === active);

  return (
    <section id="movies" className="section-padding bg-background px-4 sm:px-6 lg:px-8">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 animate-fade-in">
            <div className="inline-block bg-accent/20 text-accent px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium mb-4">
              🎬 Entertainment
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Movies I <span className="text-primary">Love</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto glass-bg inline-block">
              {total} films across {categories.length} genres — the stories that inspire my creativity
              and fuel my passion for technology and innovation.
            </p>
          </div>

          {/* Genre filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["All", ...categories.map((c) => c.category)].map((name) => (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
                  active === name
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card/50 text-muted-foreground border-border/50 hover:text-foreground hover:border-primary/40"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Grouped grids */}
          <div className="space-y-12">
            {visible.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                    {group.category}
                  </h3>
                  <span className="text-xs text-muted-foreground">{group.movies.length}</span>
                  <div className="flex-1 h-px bg-border/60" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {group.movies.map((movie, index) => (
                    <MovieCard
                      key={`${group.category}-${movie.title}`}
                      movie={movie}
                      category={group.category}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

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
