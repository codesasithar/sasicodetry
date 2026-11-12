import { useEffect, useRef, useState } from "react";
import { GraduationCap, Briefcase, Code, Brain, Smartphone, Database } from "lucide-react";

const BIO_COPY = "I’m Sasithar M—an Analyst at Deloitte who enjoys turning ideas into useful digital products. I’ve built Android and OCR apps, integrated APIs, and explored AR/VR. Psychology and motivational ideas keep me curious about how people think and grow.";
const NAME_START = BIO_COPY.indexOf("Sasithar M");
const NAME_END = NAME_START + "Sasithar M".length;

const mobileTypingIsEnabled = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PersonalBio = () => {
  const bioRef = useRef<HTMLParagraphElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(mobileTypingIsEnabled);
  const [hasStarted, setHasStarted] = useState(false);
  const [visibleCharacters, setVisibleCharacters] = useState(() =>
    mobileTypingIsEnabled() ? 0 : BIO_COPY.length,
  );
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionMode = () => {
      const enabled = mobileQuery.matches && !reducedMotionQuery.matches;
      setShouldAnimate(enabled);
      setVisibleCharacters(enabled ? 0 : BIO_COPY.length);
      setHasStarted(false);
      setIsTyping(false);
    };

    mobileQuery.addEventListener("change", updateMotionMode);
    reducedMotionQuery.addEventListener("change", updateMotionMode);
    return () => {
      mobileQuery.removeEventListener("change", updateMotionMode);
      reducedMotionQuery.removeEventListener("change", updateMotionMode);
    };
  }, []);

  useEffect(() => {
    const target = bioRef.current;
    if (!shouldAnimate || hasStarted || !target) return;

    if (!("IntersectionObserver" in window)) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasStarted, shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate || !hasStarted) return;

    let characterIndex = 0;
    let timeoutId = 0;
    setIsTyping(true);

    const typeNextCharacter = () => {
      characterIndex += 1;
      setVisibleCharacters(characterIndex);

      if (characterIndex >= BIO_COPY.length) {
        setIsTyping(false);
        return;
      }

      const lastCharacter = BIO_COPY[characterIndex - 1];
      const pause = lastCharacter === "." ? 125 : lastCharacter === "," || lastCharacter === "—" ? 55 : 13;
      timeoutId = window.setTimeout(typeNextCharacter, pause);
    };

    timeoutId = window.setTimeout(typeNextCharacter, 100);
    return () => window.clearTimeout(timeoutId);
  }, [hasStarted, shouldAnimate]);

  const visibleBio = BIO_COPY.slice(0, visibleCharacters);

  return (
    <p ref={bioRef} className="text-muted-foreground leading-relaxed about-bio-copy">
      <span aria-hidden="true">
        {visibleBio.slice(0, NAME_START)}
        {visibleBio.length > NAME_START && (
          <span className="text-primary font-semibold">
            {visibleBio.slice(NAME_START, Math.min(visibleBio.length, NAME_END))}
          </span>
        )}
        {visibleBio.length > NAME_END && visibleBio.slice(NAME_END)}
        {isTyping && <span className="about-typing-caret" />}
      </span>
      <span className="sr-only">{BIO_COPY}</span>
    </p>
  );
};

const About = () => {
  const skills = [
    "Android Development",
    "Java",
    "Full Stack Development",
    "MuleSoft",
    "Python",
    "Artificial Intelligence",
    "Machine Learning",
    "SQL",
    "Unity",
    "Spark AR",
    "Vuforia",
    "Firebase",
    "API Integration",
    "AR/VR Development",
    "OCR Technology"
  ];

  return (
    <section id="about" className="section-container px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto glass-bg inline-block">
            Passionate coder turning ideas into digital reality
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column - Bio */}
          <div className="space-y-8">
            <div className="tech-card">
              <Brain className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Personal Bio</h3>
              <PersonalBio />
            </div>

            <div className="tech-card">
              <GraduationCap className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4">Education</h3>
              <p className="text-muted-foreground">
                <span className="text-accent font-semibold">Bachelor of Computer Applications</span>
                <br />
                Strong foundation in computer science and software development
              </p>
            </div>

            <div className="tech-card">
              <Briefcase className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Current Role</h3>
              <p className="text-muted-foreground">
                <span className="text-primary font-semibold">Analyst at Deloitte</span>
                <br />
                Contributing to enterprise solutions and digital transformation initiatives
              </p>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-8">
            <div className="tech-card">
              <div className="flex items-center mb-6">
                <Code className="h-6 h-6 sm:h-8 sm:w-8 text-primary mr-3" />
                <h3 className="text-xl sm:text-2xl font-bold">Technical Skills</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {skills.map((skill, index) => (
                  <div key={skill} className="skill-tag animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div className="space-y-6">
              <div className="flex items-center p-6 tech-card">
                <Smartphone className="h-12 w-12 text-primary mr-4" />
                <div>
                  <h4 className="text-lg font-bold text-primary">Mobile Development</h4>
                  <p className="text-muted-foreground">Android apps with modern UI/UX</p>
                </div>
              </div>

              <div className="flex items-center p-6 tech-card">
                <Database className="h-12 w-12 text-accent mr-4" />
                <div>
                  <h4 className="text-lg font-bold text-accent">API Integration</h4>
                  <p className="text-muted-foreground">MuleSoft & backend solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
