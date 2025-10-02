import { PenTool, BookOpen, FileText, Calendar, ArrowRight, Eye } from "lucide-react";

const Writings = () => {
  const writings = [
    {
      id: 1,
      title: "The Psychology of Mobile UX Design",
      excerpt: "Exploring how psychological principles can enhance mobile app user experiences and drive engagement.",
      category: "Psychology & Tech",
      date: "2024-01-15",
      readTime: "5 min read",
      status: "published"
    },
    {
      id: 2,
      title: "Building Resilient Android Applications",
      excerpt: "Best practices for creating Android apps that handle edge cases gracefully and provide smooth user experiences.",
      category: "Development",
      date: "2024-01-10",
      readTime: "8 min read",
      status: "published"
    },
    {
      id: 3,
      title: "The Future of AR/VR in Everyday Applications",
      excerpt: "How augmented and virtual reality technologies are reshaping the way we interact with digital content.",
      category: "Technology",
      date: "2024-01-05",
      readTime: "6 min read",
      status: "published"
    },
    {
      id: 4,
      title: "Motivation in the Digital Age",
      excerpt: "Understanding how technology affects our motivation and practical strategies for staying focused in a connected world.",
      category: "Psychology",
      date: "2024-01-01",
      readTime: "7 min read",
      status: "draft"
    }
  ];

  const categories = ["All", "Psychology & Tech", "Development", "Technology", "Psychology"];

  return (
    <section id="writings" className="section-container px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-accent/20 text-accent px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            Latest Thoughts
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            My <span className="text-primary">Writings</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Sharing insights on technology, psychology, and the intersection of human behavior with digital innovation
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-10 sm:mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category}
              className="skill-tag hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Writings Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {writings.map((writing, index) => (
            <article
              key={writing.id}
              className="tech-card group cursor-pointer"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Article Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="skill-tag text-xs">{writing.category}</span>
                <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                  {writing.status === 'draft' ? (
                    <FileText className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span>{writing.status}</span>
                </div>
              </div>

              {/* Article Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {writing.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {writing.excerpt}
              </p>

              {/* Article Meta */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(writing.date).toLocaleDateString()}</span>
                  </div>
                  <span>{writing.readTime}</span>
                </div>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </article>
          ))}
        </div>

        {/* Writing Stats & CTA */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Stats Card */}
          <div className="tech-card">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold">Writing Journey</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Articles Published</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Total Reads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Main Topics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">6</div>
                <div className="text-sm text-muted-foreground">Months Writing</div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="tech-card">
            <div className="flex items-center mb-6">
              <PenTool className="h-8 w-8 text-accent mr-3" />
              <h3 className="text-2xl font-bold">Stay Updated</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Get notified when I publish new articles about technology, psychology, and personal development.
            </p>
            
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
              <button className="btn-tech w-full group cursor-glow ripple-effect sparkle-hover relative overflow-hidden hover-scale">
                <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
                <span className="absolute inset-0 bg-accent/10 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-lg"></span>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-2">📧</span>
                  Subscribe to Updates
                  <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                </span>
                <div className="absolute inset-0 border border-accent/30 rounded-lg group-hover:border-accent/60 transition-colors duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Writings;