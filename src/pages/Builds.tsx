import {
  ArrowUpRight,
  Database,
  Gamepad2,
  Headset,
  Smartphone,
  Sparkles,
  Terminal,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import MatrixBackground from "@/components/MatrixBackground";
import CursorEffects from "@/components/CursorEffects";
import ScrollToTop from "@/components/ScrollToTop";

const builds = [
  {
    title: "Forex Transaction API Integration",
    category: "Backend systems",
    description:
      "MuleSoft APIs that connect mobile banking experiences to dependable online forex transaction flows.",
    technologies: ["MuleSoft", "API Design", "Integration"],
    icon: Database,
    number: "01",
  },
  {
    title: "ExcelPro Android Application",
    category: "Mobile product",
    description:
      "An OCR-powered Android app that turns Excel data into student-specific formats with Firebase support.",
    technologies: ["Android", "OCR", "Firebase", "Java"],
    icon: Smartphone,
    number: "02",
  },
  {
    title: "Angel Eyes — AR Road Safety",
    category: "Immersive experience",
    description:
      "A hackathon-built AR experience that makes road-safety education more memorable and interactive.",
    technologies: ["Unity", "Spark AR", "C#", "AR"],
    icon: Sparkles,
    number: "03",
  },
  {
    title: "Indian Roads — Android Game",
    category: "Game design",
    description:
      "A mobile game with intuitive controls, a friendly interface, and a distinctly local driving setting.",
    technologies: ["Unity", "C#", "Game Design", "Android"],
    icon: Gamepad2,
    number: "04",
  },
  {
    title: "Oculus VR Projects",
    category: "Virtual reality",
    description:
      "Immersive Unity applications exploring natural interaction and the possibilities of room-scale VR.",
    technologies: ["Unity", "Oculus SDK", "VR", "C#"],
    icon: Headset,
    number: "05",
  },
];

const Builds = () => (
  <>
    <MatrixBackground />
    <div className="relative z-10 min-h-screen">
      <CursorEffects />
      <Navigation />
      <ScrollToTop />

      <main className="px-4 pb-24 pt-32 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <header className="mb-14 max-w-3xl sm:mb-20">
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Terminal className="h-4 w-4" aria-hidden="true" />
              <span>Selected builds / 2020—2026</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-[0.98] sm:text-7xl">
              Things I&apos;ve <span className="text-primary">built.</span>
            </h1>
            <p className="glass-bg max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A working archive of mobile products, immersive experiments, games, and systems shaped by curiosity and careful craft.
            </p>
          </header>

          <section aria-label="Project builds" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {builds.map((build, index) => {
              const Icon = build.icon;
              return (
                <article
                  key={build.title}
                  className={`group tech-card relative flex min-h-[330px] flex-col overflow-hidden ${index === 0 ? "lg:col-span-2" : ""}`}
                >
                  <div className="pointer-events-none absolute right-5 top-3 select-none text-7xl font-black text-primary/[0.06]">
                    {build.number}
                  </div>
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {build.category}
                    </span>
                  </div>
                  <h2 className="mb-4 text-2xl font-semibold leading-tight sm:text-3xl">{build.title}</h2>
                  <p className="mb-8 max-w-xl flex-1 leading-relaxed text-muted-foreground">{build.description}</p>
                  <div className="flex flex-wrap gap-2 border-t border-border pt-5">
                    {build.technologies.map((technology) => (
                      <span key={technology} className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                        {technology}
                      </span>
                    ))}
                  </div>
                  <span className="absolute bottom-5 right-5 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </article>
              );
            })}
          </section>

          <div className="mt-14 border-t border-border pt-7 text-sm text-muted-foreground sm:mt-20">
            More experiments are always in progress. <a href="/#contact" className="text-primary transition-colors hover:text-primary-glow">Let&apos;s build something useful.</a>
          </div>
        </div>
      </main>
    </div>
  </>
);

export default Builds;