import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Writings from "@/components/Writings";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import CursorEffects from "@/components/CursorEffects";
import MatrixBackground from "@/components/MatrixBackground";
import Bookshelf from "@/components/Bookshelf";


const Index = () => {
  return (
    <>
      {/* Matrix background - appears behind everything */}
      <MatrixBackground />
      
      {/* All your content with proper layering */}
      <div className="min-h-screen relative z-10">
        <CursorEffects />
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Services />
        <Writings />
        <Achievements />
        <Contact />
        <Bookshelf />
      </div>
    </>
  );
};

export default Index;
