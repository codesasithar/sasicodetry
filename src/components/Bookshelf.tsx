import { useState } from "react";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import briefHistoryOfTime from "@/assets/books/brief-history-of-time.jpg";
import atomicHabits from "@/assets/books/atomic-habits.jpg";
import richDadPoorDad from "@/assets/books/rich-dad-poor-dad.jpg";
import originOfSpecies from "@/assets/books/origin-of-species.jpg";
import mindIsYourBusiness from "@/assets/books/mind-is-your-business.jpg";
import powerOfSubconsciousMind from "@/assets/books/power-of-subconscious-mind.jpg";
import blackHolesHawking from "@/assets/books/black-holes-hawking.jpg";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  status: "read" | "reading" | "to-read";
}

// Easy to add more books - just add to this array
const books: Book[] = [
  {
    id: "1",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    cover: briefHistoryOfTime,
    genre: "Science",
    status: "read"
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    cover: atomicHabits,
    genre: "Self-Help",
    status: "read"
  },
  {
    id: "3",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: richDadPoorDad,
    genre: "Finance",
    status: "read"
  },
  {
    id: "4",
    title: "The Origin of Species",
    author: "Charles Darwin",
    cover: originOfSpecies,
    genre: "Science",
    status: "read"
  },
  {
    id: "5",
    title: "Mind is Your Business",
    author: "Sadhguru",
    cover: mindIsYourBusiness,
    genre: "Philosophy",
    status: "read"
  },
  {
    id: "6",
    title: "The Power of Your Subconscious Mind",
    author: "Joseph Murphy",
    cover: powerOfSubconsciousMind,
    genre: "Self-Help",
    status: "read"
  },
  {
    id: "7",
    title: "Black Holes and Baby Universes",
    author: "Stephen Hawking",
    cover: blackHolesHawking,
    genre: "Science",
    status: "read"
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
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-background/90 backdrop-blur-sm border-primary/20 p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">My Library</h3>
          <Button size="sm" variant="outline" className="ml-auto">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Bookshelf */}
        <div className="space-y-8">
          {/* Shelf 1 */}
          <div className="relative">
            <div className="flex gap-2 pb-3 border-b-4 border-wood-500/30 bg-gradient-to-b from-wood-200/20 to-wood-400/30 px-2 pt-2 rounded-t-sm">
              {books.slice(0, 3).map((book) => (
                <div
                  key={book.id}
                  className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedBook(selectedBook?.id === book.id ? null : book)}
                >
                  <div className="w-16 h-20 bg-gradient-to-b from-background to-muted rounded-sm shadow-lg overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Book spine shadow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-sm pointer-events-none" />
                </div>
              ))}
            </div>
            {/* Shelf wood effect */}
            <div className="h-1 bg-gradient-to-r from-wood-600 via-wood-500 to-wood-600 rounded-b-sm" />
          </div>

          {/* Shelf 2 - For future books */}
          <div className="relative">
            <div className="flex gap-2 pb-3 border-b-4 border-wood-500/30 bg-gradient-to-b from-wood-200/20 to-wood-600/30 px-2 pt-2 rounded-t-sm min-h-[5rem]">
              {books.slice(3, 6).map((book) => (
                <div
                  key={book.id}
                  className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedBook(selectedBook?.id === book.id ? null : book)}
                >
                  <div className="w-16 h-20 bg-gradient-to-b from-background to-muted rounded-sm shadow-lg overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-sm pointer-events-none" />
                </div>
              ))}
              {/* Empty shelf message */}
              {books.length <= 3 && (
                <div className="flex-1 flex items-center justify-center text-muted-foreground/50 text-sm">
                  <span>More books coming soon...</span>
                </div>
              )}
            </div>
            <div className="h-1 bg-gradient-to-r from-wood-600 via-wood-500 to-wood-600 rounded-b-sm" />
          </div>

          {/* Shelf 3 - For even more future books */}
          <div className="relative">
            <div className="flex gap-2 pb-3 border-b-4 border-wood-500/30 bg-gradient-to-b from-wood-200/20 to-wood-600/30 px-2 pt-2 rounded-t-sm min-h-[5rem]">
              {books.slice(6).map((book) => (
                <div
                  key={book.id}
                  className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedBook(selectedBook?.id === book.id ? null : book)}
                >
                  <div className="w-16 h-20 bg-gradient-to-b from-background to-muted rounded-sm shadow-lg overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-sm pointer-events-none" />
                </div>
              ))}
            </div>
            <div className="h-1 bg-gradient-to-r from-wood-600 via-wood-500 to-wood-600 rounded-b-sm" />
          </div>
        </div>

        {/* Book Details */}
        {selectedBook && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg animate-fade-in">
            <h4 className="font-semibold text-foreground">{selectedBook.title}</h4>
            <p className="text-muted-foreground text-sm">{selectedBook.author}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                {selectedBook.genre}
              </span>
              <span className={`text-xs ${getStatusColor(selectedBook.status)}`}>
                {getStatusText(selectedBook.status)}
              </span>
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
  );
};

export default Bookshelf;