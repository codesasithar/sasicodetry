const WelcomeMarquee = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-primary/90 backdrop-blur-sm border-b border-primary/30 overflow-hidden">
      <div className="marquee-container py-2">
        <div className="marquee-content">
          <span className="marquee-text text-sm sm:text-base md:text-lg font-bold text-primary-foreground">
            ✨ Welcome to My Profile ✨ • 🚀 Application Developer • 💻 Building Amazing Apps • 
            ✨ Welcome to My Profile ✨ • 🚀 Application Developer • 💻 Building Amazing Apps • 
            ✨ Welcome to My Profile ✨ • 🚀 Application Developer • 💻 Building Amazing Apps •
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMarquee;
