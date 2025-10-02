import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Writings from "@/components/Writings";
import RoleModels from "@/components/RoleModels";
import Bookshelf from "@/components/Bookshelf";
import Movies from "@/components/Movies";
import WaxSculptureShelf from "@/components/WaxSculptureShelf";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import CursorEffects from "@/components/CursorEffects";
import MatrixBackground from "@/components/MatrixBackground";
import WelcomeMarquee from "@/components/WelcomeMarquee";


const Index = () => {
  return (
    <>
      {/* Matrix background - appears behind everything */}
      <MatrixBackground />
      
      {/* Welcome Marquee - at the very top */}
      <WelcomeMarquee />
      
      {/* All your content with proper layering */}
      <div className="min-h-screen relative z-10 pt-10">
        <CursorEffects />
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Services />
        <Writings />
        <Bookshelf />
        <Movies />
        <WaxSculptureShelf />
        <RoleModels />
        <Achievements />
        <Contact />
      </div>
    </>
  );
};

export default Index;
