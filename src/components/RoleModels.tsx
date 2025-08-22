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
      Resilience: "bg-orange-500/10 text-orange-400 border-orange-500/20"
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