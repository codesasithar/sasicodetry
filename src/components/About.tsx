import { GraduationCap, Briefcase, Code, Brain, Smartphone, Database } from "lucide-react";

const About = () => {
  const skills = [
    "Android Development",
    "Java",
    "Full Stack Development",
    "MuleSoft",
    "Python",
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
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Passionate coder turning ideas into digital reality
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column - Bio */}
          <div className="space-y-8">
            <div className="tech-card">
              <Brain className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Personal Bio</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm <span className="text-primary font-semibold">Sasithar M</span>, a passionate coder and Application developer 
                who loves turning ideas into working digital products. My passion extends into psychology and motivational content, 
                which inspires how I create and interact with technology.
              </p>
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