import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

// Import role model images
import nikolaTesla from "@/assets/role-models/nikola-tesla.jpg";
import albertEinstein from "@/assets/role-models/albert-einstein.jpg";
import elonMusk from "@/assets/role-models/elon-musk.jpg";
import kamalHassan from "/lovable-uploads/8a583bd8-8a7b-419c-98d4-819cef5329ac.png";
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
import apjAbdulKalam from "/lovable-uploads/51b56dc6-2991-43a3-a98b-7dc0de156dcc.png";
import billGates from "@/assets/role-models/bill-gates.jpg";
import steveJobs from "@/assets/role-models/steve-jobs.jpg";
import vanGogh from "@/assets/role-models/van-gogh.jpg";
import jackieChan from "/lovable-uploads/ccff2e08-9724-4120-871c-ad84e51771bc.png";
import willSmith from "@/assets/role-models/will-smith.jpg";
import leonardoDiCaprio from "@/assets/role-models/leonardo-dicaprio.jpg";
import keanuReeves from "/lovable-uploads/8507b3df-7d14-47b5-bf4e-fd10ef5508af.png";

interface RoleModel {
  id: string;
  name: string;
  title: string;
  image: string;
  category: string;
  introduction: string;
}

const roleModels: RoleModel[] = [
  {
    id: "1",
    name: "Nikola Tesla",
    title: "Inventor & Electrical Engineer",
    image: nikolaTesla,
    category: "Innovation",
    introduction: "A visionary inventor who revolutionized our understanding of electricity and magnetism. Tesla's innovations in AC power systems, wireless technology, and electromagnetic fields laid the foundation for modern electrical engineering. His relentless pursuit of scientific advancement and futuristic thinking continues to inspire inventors and engineers worldwide."
  },
  {
    id: "2",
    name: "Albert Einstein",
    title: "Theoretical Physicist",
    image: albertEinstein,
    category: "Science",
    introduction: "The brilliant mind behind the theory of relativity who fundamentally changed our understanding of space, time, and gravity. Einstein's intellectual curiosity, creative thinking, and dedication to scientific truth exemplify the pursuit of knowledge. His humanitarian values and advocacy for peace demonstrate that great minds can positively impact both science and society."
  },
  {
    id: "3",
    name: "Elon Musk",
    title: "Entrepreneur & Innovator",
    image: elonMusk,
    category: "Innovation",
    introduction: "A modern entrepreneur pushing the boundaries of technology across multiple industries. From electric vehicles with Tesla to space exploration with SpaceX, Musk exemplifies ambitious vision and relentless execution. His approach to solving humanity's biggest challenges through technology and innovation serves as inspiration for modern entrepreneurship."
  },
  {
    id: "4",
    name: "Kamal Hassan",
    title: "Actor & Filmmaker",
    image: kamalHassan,
    category: "Arts",
    introduction: "A legendary Indian actor, filmmaker, and artist known for his versatility and dedication to craft. Hassan's commitment to excellence, continuous learning, and artistic innovation across multiple decades demonstrates the power of passion and perseverance. His ability to reinvent himself and adapt to changing times is truly inspiring."
  },
  {
    id: "5",
    name: "Mahatma Gandhi",
    title: "Leader & Philosopher",
    image: gandhi,
    category: "Leadership",
    introduction: "The father of Indian independence who proved that non-violence and truth can overcome the mightiest empires. Gandhi's principles of satyagraha, simple living, and moral leadership continue to inspire social movements worldwide. His dedication to justice, equality, and peaceful resistance demonstrates the power of leading by example."
  },
  {
    id: "6",
    name: "Bruce Lee",
    title: "Martial Artist & Philosopher",
    image: bruceLee,
    category: "Discipline",
    introduction: "A martial arts legend who revolutionized combat sports and philosophy. Lee's approach to 'be like water' and his creation of Jeet Kune Do exemplify adaptability and continuous improvement. His dedication to physical and mental discipline, combined with his philosophical insights, continues to inspire athletes and thinkers alike."
  },
  {
    id: "7",
    name: "Muhammad Ali",
    title: "Boxer & Activist",
    image: muhammadAli,
    category: "Courage",
    introduction: "The greatest boxer who transcended sports through courage and conviction. Ali's confidence, charisma, and willingness to sacrifice his career for his principles demonstrate true heroism. His ability to 'float like a butterfly, sting like a bee' while standing up for justice and equality makes him an enduring symbol of strength and integrity."
  },
  {
    id: "8",
    name: "Mike Tyson",
    title: "Boxer & Resilience Icon",
    image: mikeTyson,
    category: "Resilience",
    introduction: "A boxing legend who overcame tremendous personal challenges to achieve greatness. Tyson's raw power, determination, and later personal transformation demonstrate the capacity for growth and redemption. His journey from troubled youth to champion to philosopher shows that true strength comes from confronting and overcoming our inner demons."
  },
  {
    id: "9",
    name: "Alexander the Great",
    title: "Military Leader & Conqueror",
    image: alexanderGreat,
    category: "Leadership",
    introduction: "One of history's greatest military strategists who created one of the largest empires in ancient history. Alexander's leadership, tactical brilliance, and ability to inspire loyalty in his troops remain legendary. His vision of cultural fusion and his relentless pursuit of excellence continue to inspire leaders and strategists across all fields."
  },
  {
    id: "10",
    name: "Michael Jackson",
    title: "King of Pop",
    image: michaelJackson,
    category: "Entertainment",
    introduction: "The undisputed King of Pop who revolutionized music, dance, and entertainment. Jackson's perfectionism, innovative artistry, and dedication to his craft set new standards for performance. His ability to unite people across cultures through music and his relentless pursuit of artistic excellence continue to inspire entertainers worldwide."
  },
  {
    id: "11",
    name: "Quentin Tarantino",
    title: "Film Director & Screenwriter",
    image: quentinTarantino,
    category: "Cinema",
    introduction: "A visionary filmmaker who redefined modern cinema with his unique storytelling style. Tarantino's passion for film history, meticulous attention to detail, and bold creative choices demonstrate the power of artistic vision. His ability to blend genres and create compelling narratives inspires filmmakers and storytellers everywhere."
  },
  {
    id: "12",
    name: "Clint Eastwood",
    title: "Actor & Director",
    image: clintEastwood,
    category: "Cinema",
    introduction: "A legendary actor and director whose career spans over six decades. Eastwood's dedication to his craft, work ethic, and ability to evolve as an artist demonstrate longevity and excellence in entertainment. His transition from actor to acclaimed director shows the importance of continuous growth and reinvention."
  },
  {
    id: "13",
    name: "Nelson Mandela",
    title: "Anti-Apartheid Leader & President",
    image: nelsonMandela,
    category: "Leadership",
    introduction: "A symbol of peace, reconciliation, and human dignity who transformed a nation through forgiveness and unity. Mandela's resilience during 27 years of imprisonment and his commitment to justice without revenge demonstrate extraordinary character. His leadership in transitioning South Africa peacefully inspires leaders working for social change."
  },
  {
    id: "14",
    name: "Morgan Freeman",
    title: "Actor & Narrator",
    image: morganFreeman,
    category: "Arts",
    introduction: "A distinguished actor whose voice and presence have defined storytelling for generations. Freeman's dedication to his craft, wisdom, and ability to bring depth to every role demonstrate mastery of the art of acting. His journey from struggling actor to Hollywood icon shows the power of persistence and belief in oneself."
  },
  {
    id: "15",
    name: "APJ Abdul Kalam",
    title: "Scientist & President of India",
    image: apjAbdulKalam,
    category: "Science",
    introduction: "The People's President who combined scientific brilliance with humanitarian values. Kalam's contributions to India's space and missile programs, along with his dedication to education and youth development, exemplify using knowledge for national progress. His humility, vision, and commitment to inspiring young minds continue to motivate scientists and leaders."
  },
  {
    id: "16",
    name: "Bill Gates",
    title: "Entrepreneur & Philanthropist",
    image: billGates,
    category: "Innovation",
    introduction: "A technology pioneer who revolutionized personal computing and later dedicated his life to global health and education. Gates' strategic thinking, problem-solving abilities, and commitment to using wealth for humanitarian causes demonstrate responsible leadership. His transition from tech entrepreneur to philanthropist inspires others to use success for positive global impact."
  },
  {
    id: "17",
    name: "Steve Jobs",
    title: "Co-founder of Apple",
    image: steveJobs,
    category: "Innovation",
    introduction: "A visionary who transformed multiple industries through design excellence and user-centered innovation. Jobs' perfectionism, attention to detail, and ability to anticipate consumer needs revolutionized technology. His philosophy of simplicity, focus, and creating products that enrich people's lives continues to inspire entrepreneurs and designers worldwide."
  },
  {
    id: "18",
    name: "Vincent van Gogh",
    title: "Post-Impressionist Painter",
    image: vanGogh,
    category: "Visual Arts",
    introduction: "An artistic genius whose passionate dedication to art transcended personal struggles. Van Gogh's unique style, emotional intensity, and perseverance despite lack of recognition during his lifetime demonstrate the power of artistic vision. His commitment to expressing human emotion through color and brushwork continues to inspire artists worldwide."
  },
  {
    id: "19",
    name: "Jackie Chan",
    title: "Martial Artist & Actor",
    image: jackieChan,
    category: "Entertainment",
    introduction: "A martial arts legend who combined action with comedy to create a unique entertainment style. Chan's dedication to performing his own stunts, innovation in fight choreography, and global cultural bridge-building demonstrate passion and versatility. His work ethic, creativity, and commitment to entertaining audiences worldwide inspire performers across all disciplines."
  },
  {
    id: "20",
    name: "Will Smith",
    title: "Actor & Entertainer",
    image: willSmith,
    category: "Entertainment",
    introduction: "A charismatic entertainer who successfully transitioned from music to becoming one of Hollywood's biggest stars. Smith's positive attitude, work ethic, and ability to connect with audiences across different mediums demonstrate versatility and star power. His commitment to family values and motivational philosophy inspires people to pursue their dreams with optimism."
  },
  {
    id: "21",
    name: "Leonardo DiCaprio",
    title: "Actor & Environmental Activist",
    image: leonardoDiCaprio,
    category: "Arts",
    introduction: "An acclaimed actor who uses his platform for environmental advocacy and social change. DiCaprio's dedication to his craft, selective choice of meaningful projects, and commitment to climate activism demonstrate using fame responsibly. His ability to balance commercial success with artistic integrity and environmental causes inspires conscious celebrity leadership."
  },
  {
    id: "22",
    name: "Keanu Reeves",
    title: "Actor & Humanitarian",
    image: keanuReeves,
    category: "Humility",
    introduction: "An actor beloved not just for his performances but for his genuine kindness and humility. Reeves' generosity, down-to-earth nature, and resilience through personal tragedies demonstrate grace under pressure. His charitable acts, respect for others, and authentic personality show that true greatness comes from character, not just talent or fame."
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
    <section id="role-models" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-4xl font-bold text-foreground">Role Models</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Extraordinary individuals who inspire through their achievements, character, and impact on humanity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {roleModels.map((model) => (
            <Card 
              key={model.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 bg-card/50 backdrop-blur border-border/50"
              onClick={() => setSelectedModel(model)}
            >
              <CardContent className="p-6">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{model.title}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(model.category)}`}>
                    {model.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Role Model Details */}
        {selectedModel && (
          <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur border-border/50">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <img
                    src={selectedModel.image}
                    alt={selectedModel.name}
                    className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="md:w-2/3">
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold text-foreground mb-2">{selectedModel.name}</h3>
                    <p className="text-lg text-muted-foreground mb-3">{selectedModel.title}</p>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getCategoryColor(selectedModel.category)}`}>
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