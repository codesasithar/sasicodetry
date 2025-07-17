import { Smartphone, Code, Rocket, Users, Zap, Shield } from "lucide-react";

const Services = () => {
  const features = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Well-structured, maintainable code following best practices"
    },
    {
      icon: Rocket,
      title: "Fast Delivery",
      description: "Efficient development process with timely project completion"
    },
    {
      icon: Users,
      title: "User-Centric Design",
      description: "Intuitive interfaces designed with user experience in mind"
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Apps built for speed and smooth user interactions"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Following security best practices and reliable architecture"
    }
  ];

  return (
    <section id="services" className="section-container">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What I Can Build <span className="text-primary">For You</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Specialized in creating high-quality Android applications from concept to deployment
          </p>
        </div>

        {/* Main Service */}
        <div className="tech-card p-8 md:p-12 mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Smartphone className="h-16 w-16 text-primary" />
            </div>
          </div>
          
          <h3 className="text-3xl font-bold mb-6">
            Android Mobile Application Development
          </h3>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            I create <span className="text-primary font-semibold">high-quality, user-centric Android mobile applications</span> from scratch. 
            From concept to deployment — I deliver sleek, performant apps that engage users and drive results.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              "Native Android Development",
              "UI/UX Design",
              "Firebase Integration",
              "API Development",
              "App Store Deployment",
              "Maintenance & Support"
            ].map((service) => (
              <span key={service} className="skill-tag">
                {service}
              </span>
            ))}
          </div>

          <button className="btn-tech text-lg">
            Start Your Project
          </button>
        </div>

        {/* Service Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="tech-card text-center"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <feature.icon className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Process Overview */}
        <div className="mt-16 tech-card p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Development Process</h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your vision and requirements" },
              { step: "02", title: "Design", desc: "Creating intuitive UI/UX designs" },
              { step: "03", title: "Development", desc: "Building your app with clean code" },
              { step: "04", title: "Deployment", desc: "Launch and post-launch support" }
            ].map((phase, index) => (
              <div key={phase.step} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{phase.step}</div>
                <h4 className="text-lg font-semibold mb-2">{phase.title}</h4>
                <p className="text-sm text-muted-foreground">{phase.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-border"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;