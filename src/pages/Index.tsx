import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import CursorEffects from "@/components/CursorEffects";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CursorEffects />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Achievements />
      <Contact />
    </div>
  );
};

export default Index;
