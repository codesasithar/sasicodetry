import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

// Import role model images
import nikolaTesla from "@/assets/role-models/nikola-tesla.jpg";
import albertEinstein from "@/assets/role-models/albert-einstein.jpg";
import elonMusk from "@/assets/role-models/elon-musk.jpg";
import kamalHassan from "@/assets/role-models/kamal-hassan.jpg";
import gandhi from "@/assets/role-models/gandhi.jpg";
import bruceLee from "@/assets/role-models/bruce-lee.jpg";
import muhammadAli from "@/assets/role-models/muhammad-ali.jpg";
import mikeTyson from "@/assets/role-models/mike-tyson.jpg";
import alexanderGreat from "@/assets/role-models/alexander-great.jpg";
import michaelJackson from "@/assets/role-models/michael-jackson.jpg";
import quentinTarantino from "@/assets/role-models/quentin-tarantino.jpg";
import clintEastwood from "@/assets/role-models/clint-eastwood.jpg";
import nelsonMandela from "@/assets/role-models/nelson-mandela.jpg";
import morganFreeman from "@/assets/role-models/morgan-freeman.jpg";
import apjAbdulKalam from "@/assets/role-models/apj-abdul-kalam.jpg";
import billGates from "@/assets/role-models/bill-gates.jpg";
import steveJobs from "@/assets/role-models/steve-jobs.jpg";
import vanGogh from "@/assets/role-models/van-gogh.jpg";
import jackieChan from "@/assets/role-models/jackie-chan.jpg";
import willSmith from "@/assets/role-models/will-smith.jpg";
import leonardoDiCaprio from "@/assets/role-models/leonardo-dicaprio.jpg";
import keanuReeves from "@/assets/role-models/keanu-reeves.jpg";
import danielCraig from "@/assets/role-models/daniel-craig.jpg";
import oppenheimer from "@/assets/role-models/oppenheimer.jpg";
import nielsBohr from "@/assets/role-models/niels-bohr.jpg";
import michioKaku from "@/assets/role-models/michio-kaku.jpg";
import neilDeGrasseTyson from "@/assets/role-models/neil-degrasse-tyson.jpg";
import ramanujan from "@/assets/role-models/ramanujan.jpg";
import michaelFaraday from "@/assets/role-models/michael-faraday.jpg";
import jamesClerkMaxwell from "@/assets/role-models/james-clerk-maxwell.jpg";
import stephenHawking from "@/assets/role-models/stephen-hawking.jpg";

interface RoleModel {
  id: string;
  name: string;
  title: string;
  image: string;
  category: string;
  introduction: string;
  lifespan: string;
  achievements: string[];
}

const roleModels: RoleModel[] = [
  {
    id: "1",
    name: "Nikola Tesla",
    title: "Inventor & Electrical Engineer",
    image: nikolaTesla,
    category: "Innovation",
    introduction: "A visionary inventor who revolutionized our understanding of electricity and magnetism. Tesla's innovations in AC power systems, wireless technology, and electromagnetic fields laid the foundation for modern electrical engineering. His relentless pursuit of scientific advancement and futuristic thinking continues to inspire inventors and engineers worldwide.",
    lifespan: "1856 – 1943",
    achievements: [
      "Pioneered the AC electrical power system used worldwide today",
      "Invented the Tesla coil and contributed to early X-ray imaging",
      "Held nearly 300 patents across electricity, radio, and wireless tech",
      "Demonstrated wireless transmission of energy and signals"
    ]
  },
  {
    id: "2",
    name: "Albert Einstein",
    title: "Theoretical Physicist",
    image: albertEinstein,
    category: "Science",
    introduction: "The brilliant mind behind the theory of relativity who fundamentally changed our understanding of space, time, and gravity. Einstein's intellectual curiosity, creative thinking, and dedication to scientific truth exemplify the pursuit of knowledge. His humanitarian values and advocacy for peace demonstrate that great minds can positively impact both science and society.",
    lifespan: "1879 – 1955",
    achievements: [
      "Formulated the Special and General Theories of Relativity",
      "Won the 1921 Nobel Prize in Physics for the photoelectric effect",
      "Discovered the famous mass-energy equivalence E=mc²",
      "Reshaped modern cosmology, gravity, and quantum theory"
    ]
  },
  {
    id: "3",
    name: "Elon Musk",
    title: "Entrepreneur & Innovator",
    image: elonMusk,
    category: "Innovation",
    introduction: "A modern entrepreneur pushing the boundaries of technology across multiple industries. From electric vehicles with Tesla to space exploration with SpaceX, Musk exemplifies ambitious vision and relentless execution. His approach to solving humanity's biggest challenges through technology and innovation serves as inspiration for modern entrepreneurship.",
    lifespan: "1971 – Present",
    achievements: [
      "Co-founded PayPal and revolutionized online payments",
      "Founded SpaceX, achieving the first privately-funded orbital spaceflight",
      "Led Tesla to mainstream adoption of electric vehicles",
      "Founded Neuralink, xAI, and The Boring Company"
    ]
  },
  {
    id: "4",
    name: "Kamal Hassan",
    title: "Actor & Filmmaker",
    image: kamalHassan,
    category: "Arts",
    introduction: "A legendary Indian actor, filmmaker, and artist known for his versatility and dedication to craft. Hassan's commitment to excellence, continuous learning, and artistic innovation across multiple decades demonstrates the power of passion and perseverance. His ability to reinvent himself and adapt to changing times is truly inspiring.",
    lifespan: "1954 – Present",
    achievements: [
      "Recipient of 4 National Film Awards and 19 Filmfare Awards",
      "Played 10 distinct roles in Dasavathaaram, a world record",
      "Padma Bhushan and Padma Shri awardee",
      "Pioneer of method acting and experimental cinema in India"
    ]
  },
  {
    id: "5",
    name: "Mahatma Gandhi",
    title: "Leader & Philosopher",
    image: gandhi,
    category: "Leadership",
    introduction: "The father of Indian independence who proved that non-violence and truth can overcome the mightiest empires. Gandhi's principles of satyagraha, simple living, and moral leadership continue to inspire social movements worldwide. His dedication to justice, equality, and peaceful resistance demonstrates the power of leading by example.",
    lifespan: "1869 – 1948",
    achievements: [
      "Led India to independence from British rule in 1947",
      "Pioneered nonviolent civil disobedience (Satyagraha)",
      "Inspired civil rights movements led by MLK and Mandela",
      "Authored 'The Story of My Experiments with Truth'"
    ]
  },
  {
    id: "6",
    name: "Bruce Lee",
    title: "Martial Artist & Philosopher",
    image: bruceLee,
    category: "Discipline",
    introduction: "A martial arts legend who revolutionized combat sports and philosophy. Lee's approach to 'be like water' and his creation of Jeet Kune Do exemplify adaptability and continuous improvement. His dedication to physical and mental discipline, combined with his philosophical insights, continues to inspire athletes and thinkers alike.",
    lifespan: "1940 – 1973",
    achievements: [
      "Founded the martial art Jeet Kune Do",
      "Broke racial barriers in Hollywood as the first Asian-American leading man",
      "Starred in 'Enter the Dragon', a global cinematic landmark",
      "Authored 'Tao of Jeet Kune Do', blending philosophy and combat"
    ]
  },
  {
    id: "7",
    name: "Muhammad Ali",
    title: "Boxer & Activist",
    image: muhammadAli,
    category: "Courage",
    introduction: "The greatest boxer who transcended sports through courage and conviction. Ali's confidence, charisma, and willingness to sacrifice his career for his principles demonstrate true heroism. His ability to 'float like a butterfly, sting like a bee' while standing up for justice and equality makes him an enduring symbol of strength and integrity.",
    lifespan: "1942 – 2016",
    achievements: [
      "3-time Heavyweight Boxing World Champion",
      "Won Olympic Gold at the 1960 Rome Olympics",
      "Defeated George Foreman in the 'Rumble in the Jungle'",
      "Named Sportsman of the Century by Sports Illustrated"
    ]
  },
  {
    id: "8",
    name: "Mike Tyson",
    title: "Boxer & Resilience Icon",
    image: mikeTyson,
    category: "Resilience",
    introduction: "A boxing legend who overcame tremendous personal challenges to achieve greatness. Tyson's raw power, determination, and later personal transformation demonstrate the capacity for growth and redemption. His journey from troubled youth to champion to philosopher shows that true strength comes from confronting and overcoming our inner demons.",
    lifespan: "1966 – Present",
    achievements: [
      "Youngest heavyweight champion in boxing history at age 20",
      "Held WBA, WBC, and IBF heavyweight titles simultaneously",
      "50 wins with 44 by knockout",
      "Inducted into the International Boxing Hall of Fame"
    ]
  },
  {
    id: "9",
    name: "Alexander the Great",
    title: "Military Leader & Conqueror",
    image: alexanderGreat,
    category: "Leadership",
    introduction: "One of history's greatest military strategists who created one of the largest empires in ancient history. Alexander's leadership, tactical brilliance, and ability to inspire loyalty in his troops remain legendary. His vision of cultural fusion and his relentless pursuit of excellence continue to inspire leaders and strategists across all fields.",
    lifespan: "356 BC – 323 BC",
    achievements: [
      "Created one of the largest empires in ancient history by age 30",
      "Undefeated in battle across 15+ years of military campaigns",
      "Founded over 20 cities, many named Alexandria",
      "Spread Greek (Hellenistic) culture from Egypt to India"
    ]
  },
  {
    id: "10",
    name: "Michael Jackson",
    title: "King of Pop",
    image: michaelJackson,
    category: "Entertainment",
    introduction: "The undisputed King of Pop who revolutionized music, dance, and entertainment. Jackson's perfectionism, innovative artistry, and dedication to his craft set new standards for performance. His ability to unite people across cultures through music and his relentless pursuit of artistic excellence continue to inspire entertainers worldwide.",
    lifespan: "1958 – 2009",
    achievements: [
      "Best-selling album of all time: 'Thriller' (70M+ copies)",
      "13 Grammy Awards and 26 American Music Awards",
      "Pioneered the moonwalk and modern music video format",
      "Inducted twice into the Rock and Roll Hall of Fame"
    ]
  },
  {
    id: "11",
    name: "Quentin Tarantino",
    title: "Film Director & Screenwriter",
    image: quentinTarantino,
    category: "Cinema",
    introduction: "A visionary filmmaker who redefined modern cinema with his unique storytelling style. Tarantino's passion for film history, meticulous attention to detail, and bold creative choices demonstrate the power of artistic vision. His ability to blend genres and create compelling narratives inspires filmmakers and storytellers everywhere.",
    lifespan: "1963 – Present",
    achievements: [
      "Won 2 Academy Awards for Best Original Screenplay",
      "Directed iconic films: Pulp Fiction, Kill Bill, Inglourious Basterds",
      "Palme d'Or winner at the Cannes Film Festival (Pulp Fiction)",
      "Redefined non-linear storytelling in modern cinema"
    ]
  },
  {
    id: "12",
    name: "Clint Eastwood",
    title: "Actor & Director",
    image: clintEastwood,
    category: "Cinema",
    introduction: "A legendary actor and director whose career spans over six decades. Eastwood's dedication to his craft, work ethic, and ability to evolve as an artist demonstrate longevity and excellence in entertainment. His transition from actor to acclaimed director shows the importance of continuous growth and reinvention.",
    lifespan: "1930 – Present",
    achievements: [
      "4-time Academy Award winner (Best Director and Best Picture)",
      "Iconic roles in Dirty Harry and the Dollars Trilogy",
      "Directed acclaimed films: Unforgiven, Million Dollar Baby",
      "AFI Life Achievement Award recipient"
    ]
  },
  {
    id: "13",
    name: "Nelson Mandela",
    title: "Anti-Apartheid Leader & President",
    image: nelsonMandela,
    category: "Leadership",
    introduction: "A symbol of peace, reconciliation, and human dignity who transformed a nation through forgiveness and unity. Mandela's resilience during 27 years of imprisonment and his commitment to justice without revenge demonstrate extraordinary character. His leadership in transitioning South Africa peacefully inspires leaders working for social change.",
    lifespan: "1918 – 2013",
    achievements: [
      "Imprisoned 27 years for opposing apartheid",
      "First democratically elected President of South Africa (1994)",
      "Awarded the Nobel Peace Prize in 1993",
      "Founded the Nelson Mandela Foundation for human rights"
    ]
  },
  {
    id: "14",
    name: "Morgan Freeman",
    title: "Actor & Narrator",
    image: morganFreeman,
    category: "Arts",
    introduction: "A distinguished actor whose voice and presence have defined storytelling for generations. Freeman's dedication to his craft, wisdom, and ability to bring depth to every role demonstrate mastery of the art of acting. His journey from struggling actor to Hollywood icon shows the power of persistence and belief in oneself.",
    lifespan: "1937 – Present",
    achievements: [
      "Academy Award winner for 'Million Dollar Baby'",
      "Iconic narrator: March of the Penguins, Shawshank Redemption",
      "AFI Life Achievement Award (2011)",
      "Presidential Medal of Freedom recipient"
    ]
  },
  {
    id: "15",
    name: "APJ Abdul Kalam",
    title: "Scientist & President of India",
    image: apjAbdulKalam,
    category: "Science",
    introduction: "The People's President who combined scientific brilliance with humanitarian values. Kalam's contributions to India's space and missile programs, along with his dedication to education and youth development, exemplify using knowledge for national progress. His humility, vision, and commitment to inspiring young minds continue to motivate scientists and leaders.",
    lifespan: "1931 – 2015",
    achievements: [
      "11th President of India (2002–2007)",
      "Project director for India's first satellite launch vehicle (SLV-III)",
      "Father of India's missile program (Agni, Prithvi)",
      "Bharat Ratna, Padma Bhushan, and Padma Vibhushan awardee"
    ]
  },
  {
    id: "16",
    name: "Bill Gates",
    title: "Entrepreneur & Philanthropist",
    image: billGates,
    category: "Innovation",
    introduction: "A technology pioneer who revolutionized personal computing and later dedicated his life to global health and education. Gates' strategic thinking, problem-solving abilities, and commitment to using wealth for humanitarian causes demonstrate responsible leadership. His transition from tech entrepreneur to philanthropist inspires others to use success for positive global impact.",
    lifespan: "1955 – Present",
    achievements: [
      "Co-founded Microsoft, the world's largest software company",
      "World's richest person for 18 of 23 years (1995–2017)",
      "Co-founded Bill & Melinda Gates Foundation, donating $50B+",
      "Pledged majority of wealth to charity via The Giving Pledge"
    ]
  },
  {
    id: "17",
    name: "Steve Jobs",
    title: "Co-founder of Apple",
    image: steveJobs,
    category: "Innovation",
    introduction: "A visionary who transformed multiple industries through design excellence and user-centered innovation. Jobs' perfectionism, attention to detail, and ability to anticipate consumer needs revolutionized technology. His philosophy of simplicity, focus, and creating products that enrich people's lives continues to inspire entrepreneurs and designers worldwide.",
    lifespan: "1955 – 2011",
    achievements: [
      "Co-founded Apple, transforming personal computing",
      "Pioneered the iPod, iPhone, iPad, and Mac product lines",
      "Co-founded and led Pixar Animation Studios",
      "Posthumously awarded the Presidential Medal of Freedom (2022)"
    ]
  },
  {
    id: "18",
    name: "Vincent van Gogh",
    title: "Post-Impressionist Painter",
    image: vanGogh,
    category: "Visual Arts",
    introduction: "An artistic genius whose passionate dedication to art transcended personal struggles. Van Gogh's unique style, emotional intensity, and perseverance despite lack of recognition during his lifetime demonstrate the power of artistic vision. His commitment to expressing human emotion through color and brushwork continues to inspire artists worldwide.",
    lifespan: "1853 – 1890",
    achievements: [
      "Created over 2,100 artworks, including 860 oil paintings",
      "Painted iconic works: Starry Night, Sunflowers, Self-Portraits",
      "Pioneer of Post-Impressionism and Expressionism",
      "Influenced 20th-century art more than any other painter"
    ]
  },
  {
    id: "19",
    name: "Jackie Chan",
    title: "Martial Artist & Actor",
    image: jackieChan,
    category: "Entertainment",
    introduction: "A martial arts legend who combined action with comedy to create a unique entertainment style. Chan's dedication to performing his own stunts, innovation in fight choreography, and global cultural bridge-building demonstrate passion and versatility. His work ethic, creativity, and commitment to entertaining audiences worldwide inspire performers across all disciplines.",
    lifespan: "1954 – Present",
    achievements: [
      "Performed his own stunts in over 100 films",
      "Honorary Academy Award (2016) for lifetime achievement",
      "Star on the Hollywood Walk of Fame",
      "Global ambassador bridging Eastern and Western cinema"
    ]
  },
  {
    id: "20",
    name: "Will Smith",
    title: "Actor & Entertainer",
    image: willSmith,
    category: "Entertainment",
    introduction: "A charismatic entertainer who successfully transitioned from music to becoming one of Hollywood's biggest stars. Smith's positive attitude, work ethic, and ability to connect with audiences across different mediums demonstrate versatility and star power. His commitment to family values and motivational philosophy inspires people to pursue their dreams with optimism.",
    lifespan: "1968 – Present",
    achievements: [
      "Academy Award for Best Actor (King Richard, 2022)",
      "4 Grammy Awards as a hip-hop artist",
      "Star of blockbuster franchises: Bad Boys, Men in Black, Hancock",
      "First rapper to win a Grammy (1989)"
    ]
  },
  {
    id: "21",
    name: "Leonardo DiCaprio",
    title: "Actor & Environmental Activist",
    image: leonardoDiCaprio,
    category: "Arts",
    introduction: "An acclaimed actor who uses his platform for environmental advocacy and social change. DiCaprio's dedication to his craft, selective choice of meaningful projects, and commitment to climate activism demonstrate using fame responsibly. His ability to balance commercial success with artistic integrity and environmental causes inspires conscious celebrity leadership.",
    lifespan: "1974 – Present",
    achievements: [
      "Academy Award for Best Actor (The Revenant, 2016)",
      "Founded the Leonardo DiCaprio Foundation for environmental causes",
      "UN Messenger of Peace on climate change",
      "Star of Titanic, the second-highest grossing film of its era"
    ]
  },
  {
    id: "22",
    name: "Keanu Reeves",
    title: "Actor & Humanitarian",
    image: keanuReeves,
    category: "Humility",
    introduction: "An actor beloved not just for his performances but for his genuine kindness and humility. Reeves' generosity, down-to-earth nature, and resilience through personal tragedies demonstrate grace under pressure. His charitable acts, respect for others, and authentic personality show that true greatness comes from character, not just talent or fame.",
    lifespan: "1964 – Present",
    achievements: [
      "Star of The Matrix and John Wick franchises ($5B+ box office)",
      "Donated millions of his own salary to crew and charity",
      "Hollywood Walk of Fame star",
      "Founded Arch Motorcycle Company"
    ]
  },
  {
    id: "23",
    name: "Daniel Craig",
    title: "Actor & James Bond Icon",
    image: danielCraig,
    category: "Entertainment",
    introduction: "A versatile actor who redefined the iconic James Bond character with depth and intensity. Craig's dedication to performing physically demanding stunts, his commitment to character authenticity, and his ability to bring emotional complexity to action roles demonstrate serious craftsmanship. His journey from theater to becoming one of cinema's most memorable action stars shows the power of skill and persistence.",
    lifespan: "1968 – Present",
    achievements: [
      "Played James Bond in 5 films (2006–2021)",
      "Honorary Commander of the Royal Navy",
      "BAFTA-nominated for Casino Royale",
      "Highest-grossing Bond actor in cinematic history"
    ]
  },
  {
    id: "24",
    name: "J. Robert Oppenheimer",
    title: "Theoretical Physicist",
    image: oppenheimer,
    category: "Science",
    introduction: "The father of the atomic bomb who led the Manhattan Project during World War II. Oppenheimer's brilliant scientific mind, leadership of complex teams, and later moral reflections on the power of science demonstrate the profound responsibility that comes with knowledge. His famous quote 'Now I am become Death, the destroyer of worlds' reflects the deep ethical considerations that accompany groundbreaking discoveries.",
    lifespan: "1904 – 1967",
    achievements: [
      "Scientific director of the Manhattan Project (1942–1945)",
      "Led development of the world's first atomic weapons",
      "Founding director of the Institute for Advanced Study",
      "Awarded the Enrico Fermi Award in 1963"
    ]
  },
  {
    id: "25",
    name: "Niels Bohr",
    title: "Quantum Physics Pioneer",
    image: nielsBohr,
    category: "Science",
    introduction: "A Danish physicist who made foundational contributions to understanding atomic structure and quantum theory. Bohr's atomic model revolutionized physics and earned him the Nobel Prize. His collaborative spirit, philosophical approach to physics, and mentorship of the next generation of physicists demonstrate that great science is built on community and open dialogue.",
    lifespan: "1885 – 1962",
    achievements: [
      "Nobel Prize in Physics (1922) for atomic structure model",
      "Founded the Copenhagen interpretation of quantum mechanics",
      "Established the Niels Bohr Institute in Copenhagen",
      "Mentored generations of Nobel-winning physicists"
    ]
  },
  {
    id: "26",
    name: "Michio Kaku",
    title: "Theoretical Physicist & Futurist",
    image: michioKaku,
    category: "Science",
    introduction: "A co-founder of string field theory and one of the most popular science communicators of our time. Kaku's ability to explain complex physics concepts to general audiences through books, TV shows, and lectures demonstrates that science can be accessible and exciting. His futuristic vision and optimism about humanity's technological potential inspire curiosity about the universe.",
    lifespan: "1947 – Present",
    achievements: [
      "Co-founder of String Field Theory",
      "Authored bestsellers: Hyperspace, Physics of the Impossible",
      "Hosted Sci-Fi Science and Explorations on Discovery and BBC",
      "Henry Semat Professor of Theoretical Physics at CCNY"
    ]
  },
  {
    id: "27",
    name: "Neil deGrasse Tyson",
    title: "Astrophysicist & Science Communicator",
    image: neilDeGrasseTyson,
    category: "Science",
    introduction: "An astrophysicist who has become one of the most influential science communicators in the world. Tyson's passion for making science accessible, his wit, and his ability to spark wonder about the cosmos have inspired millions to look up at the stars. His work as director of the Hayden Planetarium and host of Cosmos demonstrates dedication to public science education.",
    lifespan: "1958 – Present",
    achievements: [
      "Director of the Hayden Planetarium since 1996",
      "Host of Cosmos: A Spacetime Odyssey (Emmy-winning)",
      "Author of 14+ books including Astrophysics for People in a Hurry",
      "NASA Distinguished Public Service Medal recipient"
    ]
  },
  {
    id: "28",
    name: "Srinivasa Ramanujan",
    title: "Mathematical Genius",
    image: ramanujan,
    category: "Science",
    introduction: "A self-taught mathematical genius from India whose intuitive brilliance produced thousands of groundbreaking theorems. Despite having almost no formal training, Ramanujan's work on infinite series, number theory, and continued fractions stunned the mathematical world. His collaboration with G.H. Hardy at Cambridge and his tragically short life at 32 exemplify pure genius transcending all barriers of circumstance and education.",
    lifespan: "1887 – 1920",
    achievements: [
      "Compiled nearly 3,900 mathematical results, mostly identities",
      "Elected Fellow of the Royal Society at age 31 (one of the youngest ever)",
      "Pioneered work on infinite series, partition function, and mock theta functions",
      "His 'Lost Notebook' continues to inspire modern mathematics research"
    ]
  },
  {
    id: "29",
    name: "Michael Faraday",
    title: "Physicist & Chemist",
    image: michaelFaraday,
    category: "Science",
    introduction: "A self-taught experimental genius whose discoveries in electromagnetism and electrochemistry laid the foundation for modern electrical technology. Faraday's invention of the electric motor, generator, and transformer principles transformed civilization. Rising from a bookbinder's apprentice to one of history's greatest scientists, his humility, tireless curiosity, and ability to visualize invisible fields exemplify the power of imagination paired with rigorous experimentation.",
    lifespan: "1791 – 1867",
    achievements: [
      "Discovered electromagnetic induction (Faraday's Law)",
      "Invented the first electric motor and electric generator",
      "Discovered benzene and the laws of electrolysis",
      "Established the concept of the electromagnetic field"
    ]
  },
  {
    id: "30",
    name: "James Clerk Maxwell",
    title: "Mathematical Physicist",
    image: jamesClerkMaxwell,
    category: "Science",
    introduction: "The Scottish physicist who unified electricity, magnetism, and light into a single elegant theory through his famous equations. Maxwell's work paved the way for Einstein's relativity and the entire field of modern physics, from radio waves to quantum theory. His ability to capture the deepest truths of nature in concise mathematical form represents the pinnacle of scientific elegance and inspires every physicist who follows.",
    lifespan: "1831 – 1879",
    achievements: [
      "Formulated Maxwell's equations unifying electricity and magnetism",
      "Predicted the existence of electromagnetic waves (radio, light)",
      "Produced the first true color photograph (1861)",
      "Founded the kinetic theory of gases"
    ]
  },
  {
    id: "31",
    name: "Stephen Hawking",
    title: "Theoretical Physicist & Cosmologist",
    image: stephenHawking,
    category: "Science",
    introduction: "A brilliant cosmologist who revolutionized our understanding of black holes, singularities, and the origins of the universe despite living with ALS for over five decades. Hawking's groundbreaking work on Hawking radiation and his ability to make complex physics accessible through 'A Brief History of Time' inspired millions. His indomitable spirit, wit, and refusal to let physical limitations define him exemplify the triumph of the human mind.",
    lifespan: "1942 – 2018",
    achievements: [
      "Discovered Hawking radiation emitted by black holes",
      "Authored 'A Brief History of Time' (10M+ copies sold)",
      "Lucasian Professor of Mathematics at Cambridge (1979–2009)",
      "Presidential Medal of Freedom (2009) recipient"
    ]
  }
];

const RoleModels = () => {
  const [selectedModel, setSelectedModel] = useState<RoleModel | null>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      Innovation: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Science: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      Arts: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      Leadership: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      Discipline: "bg-green-500/10 text-green-400 border-green-500/20",
      Courage: "bg-red-500/10 text-red-400 border-red-500/20",
      Resilience: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      Entertainment: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      Cinema: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      "Visual Arts": "bg-rose-500/10 text-rose-400 border-rose-500/20",
      Humility: "bg-teal-500/10 text-teal-400 border-teal-500/20"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground border-border";
  };

  return (
    <section id="role-models" className="py-16 sm:py-20 bg-background px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Role Models</h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto glass-bg inline-block">
            Extraordinary individuals who inspire through their achievements, character, and impact on humanity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {roleModels.map((model) => (
            <>
              <Card 
                key={model.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 bg-card/50 backdrop-blur border-border/50 ${selectedModel?.id === model.id ? 'ring-2 ring-primary shadow-2xl shadow-primary/30' : ''}`}
                onClick={() => setSelectedModel(selectedModel?.id === model.id ? null : model)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-lg">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-56 sm:h-64 object-cover object-top transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">{model.title}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(model.category)}`}>
                      {model.category}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {selectedModel?.id === model.id && (
                <Card className="col-span-full bg-card/80 backdrop-blur border-primary/30 animate-in fade-in slide-in-from-top-2 duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="md:w-1/3">
                        <img
                          src={selectedModel.image}
                          alt={selectedModel.name}
                          className="w-full h-64 md:h-80 object-cover object-top rounded-lg shadow-lg"
                        />
                      </div>
                      
                      <div className="md:w-2/3">
                        <div className="mb-4">
                          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{selectedModel.name}</h3>
                          <p className="text-base sm:text-lg text-muted-foreground mb-1">{selectedModel.title}</p>
                          <p className="text-sm text-primary/80 font-mono mb-3">{selectedModel.lifespan}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(selectedModel.category)}`}>
                            {selectedModel.category}
                          </span>
                        </div>
                        
                        <div className="pt-4 border-t border-border/30 mb-5">
                          <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2">Why They Inspire Me</h4>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {selectedModel.introduction}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-border/30">
                          <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3">Key Achievements</h4>
                          <ul className="space-y-2">
                            {selectedModel.achievements.map((a, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground">
                                <span className="text-primary mt-1">▸</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ))}
        </div>`}>
                      {selectedModel.category}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-border/30">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Why They Inspire Me</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedModel.introduction}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default RoleModels;