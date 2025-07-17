import { Award, Trophy, Star, GraduationCap, Users, Target } from "lucide-react";

const Achievements = () => {
  const certifications = [
    {
      title: "Introduction to Modern Application Development",
      issuer: "NPTEL – IITM",
      type: "Course Certification"
    },
    {
      title: "Python Crash Course",
      issuer: "Google",
      score: "91%",
      type: "Technical Certification"
    },
    {
      title: "Git and GitHub",
      issuer: "Grow with Google",
      score: "96.25%",
      type: "Development Tools"
    }
  ];

  const awards = [
    {
      title: "Exemplary Programming Skills Shield",
      organization: "Presidency College",
      icon: Award,
      color: "text-primary"
    },
    {
      title: "Winner – Inter College IT Fest",
      organization: "TECHNOZIA",
      icon: Trophy,
      color: "text-accent"
    },
    {
      title: "National Qualifier",
      organization: "TCS NQT",
      icon: Star,
      color: "text-primary"
    },
    {
      title: "Manager Recognition",
      organization: "Deloitte",
      icon: Users,
      color: "text-accent"
    }
  ];

  return (
    <section id="achievements" className="section-container">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Certifications & <span className="text-primary">Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recognition of excellence in programming, development, and professional growth
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Certifications */}
          <div>
            <div className="flex items-center mb-8">
              <GraduationCap className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-3xl font-bold">Certifications</h3>
            </div>

            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div 
                  key={cert.title}
                  className="tech-card"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-primary">{cert.title}</h4>
                    {cert.score && (
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {cert.score}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">{cert.issuer}</p>
                  <span className="text-sm bg-secondary px-3 py-1 rounded-full text-secondary-foreground">
                    {cert.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div>
            <div className="flex items-center mb-8">
              <Trophy className="h-8 w-8 text-accent mr-3" />
              <h3 className="text-3xl font-bold">Awards</h3>
            </div>

            <div className="space-y-6">
              {awards.map((award, index) => (
                <div 
                  key={award.title}
                  className="tech-card group"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <award.icon className={`h-8 w-8 ${award.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2">{award.title}</h4>
                      <p className="text-muted-foreground">{award.organization}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 tech-card p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Professional Highlights</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">3</div>
              <p className="text-muted-foreground">Certifications</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <p className="text-muted-foreground">Awards Won</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">2+</div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Interested in collaborating? Let's bring your ideas to life!
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-tech"
          >
            <Target className="mr-2 h-5 w-5" />
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Achievements;