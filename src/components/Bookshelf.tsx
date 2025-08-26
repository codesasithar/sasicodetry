import { useState } from "react";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
const briefHistoryOfTime = "/lovable-uploads/9187ac54-4777-4333-b976-3dfd06f39c82.png";
import atomicHabits from "@/assets/books/atomic-habits.jpg";
import richDadPoorDad from "@/assets/books/rich-dad-poor-dad.jpg";
import originOfSpecies from "@/assets/books/origin-of-species.jpg";
import mindIsYourBusiness from "@/assets/books/mind-is-your-business.jpg";
import powerOfSubconsciousMind from "@/assets/books/power-of-subconscious-mind.jpg";
import dopamineDetox from "@/assets/books/dopamine-detox.jpg";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  status: "read" | "reading" | "to-read";
  summary: string;
}

// Easy to add more books - just add to this array
const books: Book[] = [
  {
    id: "1",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    cover: briefHistoryOfTime,
    genre: "Science",
    status: "read",
    summary: "Hawking's masterpiece explores the nature of time, space, and the universe in accessible language. From the Big Bang to black holes, this book reveals the fundamental principles governing our cosmos and challenges our understanding of reality itself."
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    cover: atomicHabits,
    genre: "Self-Help",
    status: "read",
    summary: "A practical guide to building good habits and breaking bad ones. Clear reveals how small changes compound into remarkable results, providing a proven framework for improving every day through the power of atomic habits."
  },
  {
    id: "3",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: richDadPoorDad,
    genre: "Finance",
    status: "read",
    summary: "Kiyosaki challenges conventional wisdom about money and investing through the contrasting philosophies of his 'rich dad' and 'poor dad'. A foundational book on financial literacy that emphasizes assets over liabilities and financial education."
  },
  {
    id: "4",
    title: "The Origin of Species",
    author: "Charles Darwin",
    cover: originOfSpecies,
    genre: "Science",
    status: "read",
    summary: "Darwin's groundbreaking work that introduced the theory of evolution by natural selection. This revolutionary text fundamentally changed our understanding of life on Earth and remains one of the most influential scientific works ever written."
  },
  {
    id: "5",
    title: "Mind is Your Business",
    author: "Sadhguru",
    cover: mindIsYourBusiness,
    genre: "Philosophy",
    status: "read",
    summary: "Sadhguru explores the nature of the mind and consciousness, offering practical wisdom for achieving mental clarity and inner peace. A profound guide to understanding the mechanics of the mind and transcending its limitations."
  },
  {
    id: "6",
    title: "The Power of Your Subconscious Mind",
    author: "Joseph Murphy",
    cover: powerOfSubconsciousMind,
    genre: "Self-Help",
    status: "read",
    summary: "Murphy reveals how to harness the incredible power of your subconscious mind to transform your life. This classic explores techniques for programming your mind for success, health, and happiness through positive thinking and visualization."
  },
  {
    id: "7",
    title: "Dopamine Detox",
    author: "Thibaut Meurisse",
    cover: dopamineDetox,
    genre: "Self-Help",
    status: "read",
    summary: "A practical guide to removing distractions and training your brain to focus on challenging tasks. Learn how to break free from instant gratification and develop the mental discipline needed to achieve your goals through strategic dopamine management."
  }
];

const Bookshelf = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const getStatusColor = (status: Book['status']) => {
    switch (status) {
      case "read": return "text-emerald-400";
      case "reading": return "text-blue-400";
      case "to-read": return "text-yellow-400";
      default: return "text-muted-foreground";
    }
  };

  const getStatusText = (status: Book['status']) => {
    switch (status) {
      case "read": return "Completed";
      case "reading": return "Currently Reading";
      case "to-read": return "Want to Read";
      default: return "";
    }
  };

  return (
    <section id="bookshelf" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Books That Inspire Me</h2>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A curated collection of books that have shaped my thinking and inspired my journey
          </p>
        </div>
        
        <div className="w-full max-w-4xl mx-auto">
          <Card className="bg-background/90 backdrop-blur-sm border-primary/20 p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-base md:text-lg font-semibold text-foreground">My Library</h3>
              <Button size="sm" variant="outline" className="ml-auto">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile: Grid Layout */}
            <div className="block md:hidden">
              <div className="grid grid-cols-3 gap-3 mb-6">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
                    onClick={() => setSelectedBook(selectedBook?.id === book.id ? null : book)}
                  >
                    <div className="aspect-[2/3] bg-gradient-to-b from-background to-muted rounded shadow-lg overflow-hidden border border-border/20">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded pointer-events-none" />
                    <div className="absolute -inset-1 bg-primary/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                    {/* Status indicator */}
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Bookshelf Layout */}
            <div className="hidden md:block space-y-8">
              {/* Shelf 1 */}
              <div className="relative">
                <div className="flex gap-4 pb-4 border-b-4 border-wood-500/30 bg-gradient-to-b from-wood-200/20 to-wood-400/30 px-4 pt-4 rounded-t-sm">
                  {books.slice(0, 4).map((book) => (
                    <div
                      key={book.id}
                      className="relative group cursor-pointer transform hover:scale-110 transition-all duration-300"
                      onClick={() => setSelectedBook(selectedBook?.id === book.id ? null : book)}
                    >
                      <div className="w-20 lg:w-24 h-28 lg:h-32 bg-gradient-to-b from-background to-muted rounded-sm shadow-xl overflow-hidden border border-border/20">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-sm pointer-events-none" />
                      <div className="absolute -inset-1 bg-primary/20 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-gradient-to-r from-wood-600 via-wood-500 to-wood-600 rounded-b-sm" />
              </div>

              {/* Shelf 2 */}
              <div className="relative">
                <div className="flex gap-4 pb-4 border-b-4 border-wood-500/30 bg-gradient-to-b from-wood-200/20 to-wood-600/30 px-4 pt-4 rounded-t-sm min-h-[8rem]">
                  {books.slice(4).map((book) => (
                    <div
                      key={book.id}
                      className="relative group cursor-pointer transform hover:scale-110 transition-all duration-300"
                      onClick={() => setSelectedBook(selectedBook?.id === book.id ? null : book)}
                    >
                      <div className="w-20 lg:w-24 h-28 lg:h-32 bg-gradient-to-b from-background to-muted rounded-sm shadow-xl overflow-hidden border border-border/20">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-sm pointer-events-none" />
                      <div className="absolute -inset-1 bg-primary/20 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-gradient-to-r from-wood-600 via-wood-500 to-wood-600 rounded-b-sm" />
              </div>
            </div>

            {/* Book Details */}
            {selectedBook && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg animate-fade-in">
                <h4 className="font-semibold text-foreground text-base md:text-lg">{selectedBook.title}</h4>
                <p className="text-muted-foreground text-sm md:text-base">{selectedBook.author}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                    {selectedBook.genre}
                  </span>
                  <span className={`text-xs ${getStatusColor(selectedBook.status)}`}>
                    {getStatusText(selectedBook.status)}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-border/30">
                  <h5 className="text-sm font-medium text-foreground mb-2">Summary</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedBook.summary}
                  </p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Books Read: {books.filter(b => b.status === "read").length}</span>
                <span>Total: {books.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Bookshelf;