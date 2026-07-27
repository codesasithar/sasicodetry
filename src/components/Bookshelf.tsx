import { useEffect, useRef, useState } from "react";
import { BookOpen, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Existing asset imports
const briefHistoryOfTime = "/lovable-uploads/9187ac54-4777-4333-b976-3dfd06f39c82.png";
import atomicHabits from "@/assets/books/atomic-habits.jpg";
import richDadPoorDad from "@/assets/books/rich-dad-poor-dad.jpg";
import originOfSpecies from "@/assets/books/origin-of-species.jpg";
import mindIsYourBusiness from "@/assets/books/mind-is-your-business.jpg";
import powerOfSubconsciousMind from "@/assets/books/power-of-subconscious-mind.jpg";
import dopamineDetox from "@/assets/books/dopamine-detox.jpg";
import lifeLessonsBrainSurgeon from "@/assets/books/life-lessons-brain-surgeon.jpg";

// New asset imports
import ikigai from "@/assets/books/ikigai.jpg";
import theWhiteTiger from "@/assets/books/the-white-tiger.jpg";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  status: "read" | "reading" | "to-read";
  summary: string;
}

const books: Book[] = [
  {
    id: "1",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    cover: briefHistoryOfTime,
    genre: "Science",
    status: "read",
    summary: "Hawking's masterpiece explores the nature of time, space, and the universe in accessible language."
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    cover: atomicHabits,
    genre: "Self-Help",
    status: "read",
    summary: "A practical guide to building good habits and breaking bad ones."
  },
  {
    id: "3",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: richDadPoorDad,
    genre: "Finance",
    status: "read",
    summary: "Kiyosaki challenges conventional wisdom about money and investing."
  },
  {
    id: "4",
    title: "The Origin of Species",
    author: "Charles Darwin",
    cover: originOfSpecies,
    genre: "Science",
    status: "read",
    summary: "Darwin's groundbreaking work that introduced the theory of evolution by natural selection."
  },
  {
    id: "5",
    title: "Mind is Your Business",
    author: "Sadhguru",
    cover: mindIsYourBusiness,
    genre: "Philosophy",
    status: "read",
    summary: "Sadhguru explores the nature of the mind and consciousness."
  },
  {
    id: "6",
    title: "The Power of Your Subconscious Mind",
    author: "Joseph Murphy",
    cover: powerOfSubconsciousMind,
    genre: "Self-Help",
    status: "read",
    summary: "Murphy reveals how to harness the incredible power of your subconscious mind."
  },
  {
    id: "7",
    title: "Dopamine Detox",
    author: "Thibaut Meurisse",
    cover: dopamineDetox,
    genre: "Self-Help",
    status: "read",
    summary: "A practical guide to removing distractions and training your brain to focus."
  },
  {
    id: "8",
    title: "Life Lessons from a Brain Surgeon",
    author: "Rahul Jandial",
    cover: lifeLessonsBrainSurgeon,
    genre: "Science",
    status: "read",
    summary: "Neurosurgeon Rahul Jandial draws on cutting-edge research to reveal the new science of the brain."
  },
  {
    id: "9",
    title: "Ikigai",
    author: "Héctor García and Francesc Miralles",
    cover: ikigai,
    genre: "Philosophy",
    status: "read",
    summary: "An investigation into the Japanese secret to a long, purposeful, and joyful life."
  },
  {
    id: "10",
    title: "The White Tiger",
    author: "Aravind Adiga",
    cover: theWhiteTiger,
    genre: "Fiction",
    status: "read",
    summary: "A compelling, darkly humorous story tracking a driver's journey through modern India's rigid class struggles."
  }
];

const Bookshelf = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const booksContainerRef = useRef<HTMLDivElement>(null);
  const detailsPaneRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [spotlightActive, setSpotlightActive] = useState(false);

  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!selectedBook) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      const inBooks = booksContainerRef.current?.contains(target);
      const inDetails = detailsPaneRef.current?.contains(target);
      if (!inBooks && !inDetails) {
        setSelectedBook(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [selectedBook]);

  const scheduleSpotlight = (clientX: number, clientY: number) => {
    const card = cardRef.current;
    const spot = spotlightRef.current;
    if (!card || !spot) return;
    const rect = card.getBoundingClientRect();
    pendingRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const p = pendingRef.current;
      const s = spotlightRef.current;
      if (!p || !s) return;
      s.style.setProperty("--spot-x", `${p.x}px`);
      s.style.setProperty("--spot-y", `${p.y}px`);
    });
  };

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

  const AnimatedBook = ({ book, sizeClasses }: { book: Book; sizeClasses: string }) => {
    const isOpen = selectedBook?.id === book.id;

    return (
      <div
        className={`relative group cursor-pointer ${sizeClasses}`}
        style={{ perspective: "1000px" }}
        onClick={() => setSelectedBook(isOpen ? null : book)}
      >
        <div
          className="relative w-full h-full transition-all duration-500 ease-out combine-3d-transforms"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "left center",
            transform: isOpen 
              ? "rotateY(-140deg) scale(1.05)" 
              : "rotateY(0deg) translateZ(0px) rotateX(0deg)"
          }}
          data-is-open={isOpen}
        >
          <div 
            className="w-full h-full transition-transform duration-300 ease-out group-hover:[transform:rotateY(-10deg)_translateZ(15px)] group-data-[is-open=true]:[transform:none]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Cover Layer */}
            <div
              className="absolute inset-0 w-full h-full rounded-r shadow-lg overflow-hidden border border-border/20 z-20 bg-gradient-to-b from-background to-muted transition-shadow duration-300 group-hover:shadow-xl"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
            </div>

            {/* Inside Page Layer */}
            <div
              className="absolute inset-0 w-full h-full bg-amber-50 rounded-r shadow-inner p-2 border border-amber-200/60 z-10 flex flex-col"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {isOpen ? (
                <div className="flex-1 flex flex-col text-amber-900 font-serif overflow-hidden animate-fade-in">
                  <div className="text-[9px] md:text-[10px] font-bold leading-tight line-clamp-2">
                    {book.title}
                  </div>
                  <div className="text-[7px] md:text-[8px] italic opacity-80 mb-1 truncate">
                    {book.author}
                  </div>
                  <div className="text-[6px] md:text-[7px] uppercase tracking-wide opacity-70 mb-1">
                    {book.genre}
                  </div>
                  <p className="text-[6px] md:text-[7px] leading-snug opacity-90 line-clamp-6 md:line-clamp-[8]">
                    {book.summary}
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-1.5 opacity-60">
                    <div className="h-2 bg-amber-900/20 rounded w-5/6" />
                    <div className="h-2 bg-amber-900/20 rounded w-full" />
                    <div className="h-2 bg-amber-900/20 rounded w-4/5" />
                    <div className="h-2 bg-amber-900/20 rounded w-11/12" />
                    <div className="h-2 bg-amber-900/20 rounded w-3/4" />
                  </div>
                  <div className="mt-auto text-[10px] text-amber-800 font-serif font-semibold truncate text-center select-none">
                    {book.title}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Outer Glow Highlight Effect on Hover */}
        <div className="absolute -inset-2 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md pointer-events-none" />
        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 z-30 pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
      </div>
    );
  };

  // Dynamically divide the books array into equal subsets for even shelf distribution
  const half = Math.ceil(books.length / 2);
  const shelfOneBooks = books.slice(0, half);
  const shelfTwoBooks = books.slice(half);

  return (
    <section id="bookshelf" className="py-16 sm:py-20 bg-background px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">My Library</h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto glass-bg inline-block">
            A curated collection of books that have shaped my thinking and inspired my journey
          </p>
        </div>
        
        <div className="w-full max-w-4xl mx-auto">
          <Card
            ref={cardRef}
            onPointerEnter={(e) => { scheduleSpotlight(e.clientX, e.clientY); setSpotlightActive(true); }}
            onPointerMove={(e) => scheduleSpotlight(e.clientX, e.clientY)}
            onPointerDown={(e) => {
              (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
              scheduleSpotlight(e.clientX, e.clientY);
              setSpotlightActive(true);
            }}
            onPointerUp={(e) => {
              (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
              if (e.pointerType !== "mouse") setSpotlightActive(false);
            }}
            onPointerCancel={() => setSpotlightActive(false)}
            onPointerLeave={(e) => { if (e.pointerType === "mouse") setSpotlightActive(false); }}
            style={{ touchAction: "pan-y" }}
            className="relative bg-background/90 backdrop-blur-sm border-primary/20 p-3 sm:p-4 md:p-6 overflow-hidden"
          >
            {/* Cursor-following spotlight */}
            <div
              ref={spotlightRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-500 mix-blend-screen"
              style={{
                opacity: spotlightActive ? 1 : 0,
                background:
                  "radial-gradient(260px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255, 214, 145, 0.35), rgba(255, 180, 90, 0.15) 35%, rgba(0,0,0,0) 65%)",
              }}
            />
            {/* Reading light glow animation above the bookshelf */}
            <div className="reading-light-bar">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="reading-light" style={{ animationDelay: `${i * 0.6}s` }}>
                  <div className="reading-light-housing" />
                  <div className="flex justify-center -mt-1">
                    <div className="reading-light-bulb" style={{ animationDelay: `${i * 0.4}s` }} />
                  </div>
                  <div className="reading-light-beam" style={{ animationDelay: `${i * 0.8}s` }} />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Button size="sm" variant="outline" className="ml-auto">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Books container (listens for outside clicks to close a book) */}
            <div ref={booksContainerRef}>
              {/* Mobile Layout */}
              <div className="block md:hidden">
                <div className="grid grid-cols-3 gap-y-6 gap-x-4 mb-4 sm:mb-6 px-2">
                  {books.map((book) => (
                    <AnimatedBook 
                      key={book.id} 
                      book={book} 
                      sizeClasses="aspect-[2/3] w-full" 
                    />
                  ))}
                </div>
              </div>

              {/* Desktop: Bookshelf Layout */}
              <div className="hidden md:block space-y-12 pt-4">
                {/* Shelf 1 */}
                <div className="relative">
                  <div className="flex gap-8 pb-4 border-b-4 border-wood-500/30 bg-gradient-to-b from-wood-200/20 to-wood-400/30 px-6 pt-4 rounded-t-sm">
                    {shelfOneBooks.map((book) => (
                      <AnimatedBook 
                        key={book.id} 
                        book={book} 
                        sizeClasses="w-20 lg:w-24 h-28 lg:h-32" 
                      />
                    ))}
                  </div>
                  <div className="h-2 bg-gradient-to-r from-wood-600 via-wood-500 to-wood-600 rounded-b-sm" />
                </div>

                {/* Shelf 2 */}
                <div className="relative">
                  <div className="flex gap-8 pb-4 border-b-4 border-wood-500/30 bg-gradient-to-b from-wood-200/20 to-wood-600/30 px-6 pt-4 rounded-t-sm min-h-[8rem]">
                    {shelfTwoBooks.map((book) => (
                      <AnimatedBook 
                        key={book.id} 
                        book={book} 
                        sizeClasses="w-20 lg:w-24 h-28 lg:h-32" 
                      />
                    ))}
                  </div>
                  <div className="h-2 bg-gradient-to-r from-wood-600 via-wood-500 to-wood-600 rounded-b-sm" />
                </div>
              </div>
            </div>

            {/* Book Details Pane */}
            {selectedBook && (
              <div className="mt-8 p-4 bg-muted/50 rounded-lg animate-fade-in transition-all duration-300 border border-border/30">
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

            {/* Stats Footer */}
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
