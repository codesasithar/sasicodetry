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
    <section id="writings" className="section-container">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            Latest Thoughts
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-primary">Writings</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sharing insights on technology, psychology, and the intersection of human behavior with digital innovation
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
        <div className="grid md:grid-cols-2 gap-8">
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
              <button className="btn-tech w-full">
                Subscribe to Updates
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Writings;