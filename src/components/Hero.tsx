import { ArrowRight, Facebook, Github, Instagram, Linkedin, Phone, Play, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import teslaRobot from "@/assets/tesla-robot.png";

const socials = [
  { href: "https://www.linkedin.com/in/sasitharcodes/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/codesasithar", icon: Github, label: "GitHub" },
  { href: "https://www.instagram.com/sasitharm/", icon: Instagram, label: "Instagram" },
  { href: "https://www.facebook.com/snazzy.sasithar", icon: Facebook, label: "Facebook" },
  { href: "tel:+919443798476", icon: Phone, label: "Phone" },
];

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-shell relative min-h-[100svh] overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pb-16">
      <div className="hero-scanlines absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="hero-bento relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 lg:h-[calc(100svh-8rem)] lg:min-h-[700px] lg:max-h-[840px] lg:grid-cols-4 lg:grid-rows-4 lg:gap-4">
        <article className="hero-panel hero-identity lg:col-span-2 lg:row-span-2">
          <span className="hero-panel-index">01 / 08</span>
          <div>
            <p className="hero-kicker">[ SYSTEM.IDENTITY ]</p>
            <h1 className="hero-title">
              <span>APPLICATION</span>
              <span className="text-primary">DEVELOPER.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I craft solid, scalable mobile products with thoughtful user experiences—turning innovative ideas into working digital solutions while pursuing a PG in AI/ML.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="hero-tag">Mobile products</span>
            <span className="hero-tag">AI / ML</span>
            <span className="hero-tag">Creative developer</span>
          </div>
        </article>

        <figure className="hero-panel hero-visual min-h-[310px] lg:col-span-2 lg:row-span-2">
          <span className="hero-panel-index">02 / VISUAL</span>
          <img src={teslaRobot} alt="Tesla Optimus humanoid robot" className="hero-robot" />
          <div className="hero-visual-grid" aria-hidden="true" />
          <div className="hero-visual-crosshair" aria-hidden="true"><span /><span /></div>
          <figcaption className="absolute bottom-5 left-5 flex items-center gap-2 font-mono text-[10px] uppercase text-primary sm:text-xs">
            <span className="hero-status-dot" /> Visual prototype // 01
          </figcaption>
        </figure>

        <article className="hero-panel hero-showcase min-h-[220px] lg:col-span-2 lg:row-span-1">
          <span className="hero-panel-index">03 / SHOWREEL</span>
          <video
            src="/videos/skills-video.mp4"
            poster="/videos/skills-video-thumb.jpg"
            loop
            playsInline
            controls
            preload="metadata"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-background/70 text-primary backdrop-blur-md">
              <Play className="h-5 w-5 fill-current" />
            </span>
          </div>
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase text-foreground/70">Play skills showreel</span>
        </article>

        <article className="hero-panel hero-stat flex min-h-[150px] flex-col justify-between lg:col-span-1 lg:row-span-1">
          <span className="hero-panel-index">04 / OUTPUT</span>
          <span className="font-mono text-[10px] uppercase text-muted-foreground">Build archive</span>
          <div>
            <p className="font-mono text-4xl font-bold text-foreground">5<span className="text-primary">+</span></p>
            <p className="mt-1 text-xs uppercase text-muted-foreground">Projects built & deployed</p>
          </div>
          <div className="h-px w-full bg-border"><div className="h-px w-3/4 bg-primary" /></div>
        </article>

        <article className="hero-panel hero-stat flex min-h-[150px] flex-col justify-between lg:col-span-1 lg:row-span-1">
          <span className="hero-panel-index">05 / SIGNAL</span>
          <span className="font-mono text-[10px] uppercase text-muted-foreground">Field experience</span>
          <div>
            <p className="font-mono text-4xl font-bold text-foreground">2<span className="text-primary">+</span></p>
            <p className="mt-1 text-xs uppercase text-muted-foreground">Years of practical work</p>
          </div>
          <div className="h-px w-full bg-border"><div className="h-px w-1/2 bg-primary" /></div>
        </article>

        <article className="hero-panel hero-network flex min-h-[130px] flex-col justify-between lg:col-span-2 lg:row-span-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase text-muted-foreground">Network / Protocol</span>
            <Radio className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="hero-social-link"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </article>

        <Button onClick={scrollToProjects} className="hero-project-cta group h-auto min-h-[130px] justify-between px-6 py-6 lg:col-span-2 lg:row-span-1">
          <span className="text-left">
            <span className="block font-mono text-2xl font-bold sm:text-3xl">VIEW MY WORK</span>
            <span className="mt-1 block font-mono text-[10px] uppercase opacity-70">Explore project archive</span>
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-5 w-5" />
          </span>
        </Button>

        <article className="hero-panel hero-system flex min-h-[110px] items-center gap-4 lg:col-span-2 lg:row-span-1">
          <span className="hero-status-dot" />
          <div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">System status</p>
            <p className="mt-1 font-mono text-xs uppercase text-foreground">Available for new projects</p>
          </div>
          <span className="ml-auto hidden font-mono text-[9px] text-muted-foreground sm:block">SIGNAL: LOCKED // PORTFOLIO: ONLINE</span>
        </article>
      </div>
    </section>
  );
};

export default Hero;