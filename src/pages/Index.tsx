import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Writings from "@/components/Writings";
import Bookshelf from "@/components/Bookshelf";
import News from "@/components/News";
import RoleModels from "@/components/RoleModels";
import Movies from "@/components/Movies";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import CursorEffects from "@/components/CursorEffects";
import MatrixBackground from "@/components/MatrixBackground";
import ScrollToTop from "@/components/ScrollToTop";


const Index = () => {
  return (
    <>
      {/* Matrix background - appears behind everything */}
      <MatrixBackground />
      
      {/* All your content with proper layering */}
      <div className="min-h-screen relative z-10">
        <CursorEffects />
        <Navigation />
        <ScrollToTop />
        <Hero />
        <About />
        <Projects />
        <Services />
        <Writings />
        <Bookshelf />
        <News />
        <Movies />
        <RoleModels />
        <Achievements />
        <Contact />
      </div>
    </>
  );
};

export default Index;
