import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Your interests - easily customizable
  const interests = [
    "electronics",
    "robotics",
    "AR/VR",
    "software development",
    "artificial intelligence",
    "machine learning"
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-news', {
        body: { topics: interests }
      });

      if (error) {
        console.error('Error fetching news:', error);
        toast({
          title: "Error fetching news",
          description: "Could not load latest news. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      if (data?.articles) {
        setArticles(data.articles.filter((article: NewsArticle) => 
          article.title && article.description && article.urlToImage
        ));
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch news",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <section id="news" className="py-20 px-8 sm:px-10 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Latest Updates</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-size-200 animate-gradient">
            Tech News
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Curated news based on my interests: {interests.slice(0, 3).join(", ")} and more
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* News Grid */}
        {!isLoading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Card 
                key={index}
                className="group overflow-hidden hover:shadow-tech transition-all duration-500 hover:scale-[1.02] border border-border/50 hover:border-primary/50 bg-card/90 backdrop-blur-sm"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  {/* Source & Date */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <Badge variant="secondary" className="font-medium">
                      {article.source.name}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.description}
                  </p>

                  {/* Read More Link */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-glow transition-colors group/link"
                  >
                    Read full article
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && articles.length === 0 && (
          <div className="text-center py-16">
            <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">No news available</h3>
            <p className="text-muted-foreground">
              Check back later for the latest updates
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
