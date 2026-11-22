import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Pin, Search, X } from "lucide-react";
import MobileTypingReveal from "@/components/MobileTypingReveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

// Existing asset imports
const briefHistoryOfTime = "/lovable-uploads/9187ac54-4777-4333-b976-3dfd06f39c82.webp";
import atomicHabits from "@/assets/books/atomic-habits.webp";
import richDadPoorDad from "@/assets/books/rich-dad-poor-dad.webp";
import originOfSpecies from "@/assets/books/origin-of-species.jpg";
import mindIsYourBusiness from "@/assets/books/mind-is-your-business.webp";
import powerOfSubconsciousMind from "@/assets/books/power-of-subconscious-mind.webp";
import dopamineDetox from "@/assets/books/dopamine-detox.webp";
import lifeLessonsBrainSurgeon from "@/assets/books/life-lessons-brain-surgeon.webp";

// New asset imports
import ikigai from "@/assets/books/ikigai.webp";
import theWhiteTiger from "@/assets/books/the-white-tiger.webp";

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

const ShelfCactus = () => (
  <svg className="library-cactus" viewBox="0 0 88 132" role="img" aria-label="A small cactus in a modern planter">
    <ellipse cx="44" cy="126" rx="25" ry="3" fill="hsl(var(--palette-deep-space) / 0.3)" />
    <path className="library-cactus-body" d="M31 90V36c0-9 6-16 14-16s14 7 14 16v54H31Z" />
    <path className="library-cactus-body" d="M32 62h-5v-9c0-6-4-10-9-10s-9 4-9 10v13c0 9 7 16 16 16h7V72h-7c-3 0-5-2-5-6V53c0-2 1-3 2-3s2 1 2 3v16h8V62Z" />
    <path className="library-cactus-body" d="M56 50h6v-8c0-6 4-10 9-10s9 4 9 10v13c0 9-7 16-16 16h-8V61h8c3 0 5-2 5-6V42c0-2-1-3-2-3s-2 1-2 3v15h-9V50Z" />
    <path className="library-cactus-rib" d="M39 31v51M47 29v55M54 36v44M17 48v13M72 39v14" />
    <path className="library-cactus-shade" d="M45 20c8 0 14 7 14 16v54H45V20Z" opacity=".2" />
    <path className="library-cactus-pot" d="M25 92h38l-4 30H29l-4-30Z" />
    <rect className="library-cactus-rim" x="22" y="88" width="44" height="7" rx="2" />
    <path d="M32 101h24" stroke="hsl(var(--palette-cloud) / 0.24)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const libraryNotes = [
  {
    book: "A Brief History of Time",
    line: "The universe is strange enough to make curiosity a daily habit.",
    tone: "gold",
  },
  {
    book: "Atomic Habits",
    line: "Tiny habits are votes cast for the person you are becoming.",
    tone: "cyan",
  },
  {
    book: "Ikigai",
    line: "A meaningful life can begin with one useful thing, done with care.",
    tone: "coral",
  },
  {
    book: "Life Lessons from a Brain Surgeon",
    line: "Your brain is not a statue; it is a city that keeps rebuilding itself.",
    tone: "mint",
  },
  {
    book: "Dopamine Detox",
    line: "When every ping feels urgent, silence becomes a superpower.",
    tone: "lavender",
  },
  {
    book: "The White Tiger",
    line: "Ambition can be a ladder, a trap, or a very strange car ride.",
    tone: "peach",
  },
  {
    book: "Rich Dad Poor Dad",
    line: "Assets pay you while you sleep; liabilities just look great in photos.",
    tone: "coral",
  },
  {
    book: "The Origin of Species",
    line: "It was never survival of the strongest — it is survival of the most adaptable.",
    tone: "mint",
  },
  {
    book: "Mind is Your Business",
    line: "Your mind is not a monkey. It is a supercomputer nobody has trained yet.",
    tone: "cyan",
  },
  {
    book: "The Power of Your Subconscious Mind",
    line: "Your subconscious takes orders literally and works the night shift — choose your words.",
    tone: "peach",
  },
  {
    book: "A Brief History of Time",
    line: "Hawking joked every equation halves your readers. This note contains zero.",
    tone: "lavender",
  },
  {
    book: "Atomic Habits",
    line: "You do not rise to the level of your goals; you fall to the level of your systems.",
    tone: "gold",
  },
  {
    book: "Ikigai",
    line: "Purpose is less a lightning bolt and more a lamp you remember to switch on.",
    tone: "cyan",
  },
  {
    book: "The White Tiger",
    line: "A sharp story can make the familiar world look newly strange.",
    tone: "mint",
  },
  {
    book: "Life Lessons from a Brain Surgeon",
    line: "Rest is not a software update you can keep postponing forever.",
    tone: "coral",
  },
  {
    book: "Dopamine Detox",
    line: "If your phone is always in your hand, your attention has a roommate.",
    tone: "lavender",
  },
];

const Bookshelf = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [featuredBookId, setFeaturedBookId] = useState(books[0]?.id ?? "");
  const [isShelfPaused, setIsShelfPaused] = useState(false);
  const [isShelfPointerOver, setIsShelfPointerOver] = useState(false);
  const shelfTrackRef = useRef<HTMLDivElement>(null);
  const featuredCoverRef = useRef<HTMLButtonElement>(null);
  const [readerOrigin, setReaderOrigin] = useState({ x: 0, y: 0, scaleX: 0.25, scaleY: 0.35 });
  const readerSpreadRef = useRef<HTMLDivElement>(null);
  const readerSourceRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const genres = ["All", ...Array.from(new Set(books.map((book) => book.genre)))];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleBooks = books.filter((book) => {
    const matchesGenre = activeGenre === "All" || book.genre === activeGenre;
    const matchesQuery = !normalizedQuery ||
      `${book.title} ${book.author} ${book.genre} ${book.summary}`.toLowerCase().includes(normalizedQuery);
    return matchesGenre && matchesQuery;
  });
  const visibleBookKey = visibleBooks.map((book) => book.id).join("|");
  const activeFeaturedBookId = visibleBooks.some((book) => book.id === featuredBookId)
    ? featuredBookId
    : visibleBooks[0]?.id ?? "";
  const activeBook = visibleBooks.find((book) => book.id === activeFeaturedBookId) ?? null;
  const activeBookIndex = activeBook ? visibleBooks.findIndex((book) => book.id === activeBook.id) : -1;

  useEffect(() => {
    if (
      isShelfPaused
      || isShelfPointerOver
      || selectedBook
      || visibleBooks.length < 2
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const shelfBookIds = visibleBooks.map((book) => book.id);
    const timer = window.setInterval(() => {
      setFeaturedBookId((currentId) => {
        const currentIndex = shelfBookIds.indexOf(currentId);
        return shelfBookIds[(currentIndex + 1 + shelfBookIds.length) % shelfBookIds.length];
      });
    }, 5200);

    return () => window.clearInterval(timer);
  }, [visibleBookKey, isShelfPaused, isShelfPointerOver, selectedBook]);

  useEffect(() => {
    if (!activeFeaturedBookId) return;
    const selectedVolume = Array.from(shelfTrackRef.current?.querySelectorAll<HTMLElement>("[data-book-id]") ?? [])
      .find((volume) => volume.dataset.bookId === activeFeaturedBookId);
    const shelf = shelfTrackRef.current;
    if (!selectedVolume || !shelf) return;
    const volumeOffset = selectedVolume.getBoundingClientRect().left - shelf.getBoundingClientRect().left + shelf.scrollLeft;
    shelf.scrollTo({
      left: volumeOffset - (shelf.clientWidth - selectedVolume.offsetWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [activeFeaturedBookId]);

  const moveFeaturedBook = (offset: number) => {
    if (!visibleBooks.length) return;
    const nextIndex = (activeBookIndex + offset + visibleBooks.length) % visibleBooks.length;
    setFeaturedBookId(visibleBooks[nextIndex].id);
  };

  const selectBook = (book: Book, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    readerSourceRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    setSelectedBook(book);
  };

  useLayoutEffect(() => {
    const source = readerSourceRef.current;
    const spread = readerSpreadRef.current;
    if (!selectedBook || !source || !spread) return;

    const bounds = spread.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const width = spread.offsetWidth;
    const height = spread.offsetHeight;
    if (!width || !height) return;

    setReaderOrigin({
      x: source.left - centerX,
      y: source.top + source.height / 2 - centerY,
      scaleX: (source.width * 2) / width,
      scaleY: source.height / height,
    });
  }, [selectedBook]);

  const getStatusText = (status: Book['status']) => {
    switch (status) {
      case "read": return "Completed";
      case "reading": return "Currently Reading";
      case "to-read": return "Want to Read";
      default: return "";
    }
  };

  const openFeaturedBook = () => {
    if (activeBook && featuredCoverRef.current) selectBook(activeBook, featuredCoverRef.current);
  };

  return (
    <section id="bookshelf" className="py-16 sm:py-20 bg-background px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground"><MobileTypingReveal>My Library</MobileTypingReveal></h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto glass-bg inline-block">
            <MobileTypingReveal startDelay={180}>
              A curated collection of books that have shaped my thinking and inspired my journey
            </MobileTypingReveal>
          </p>
        </div>
        
        <div className="w-full">
          <Card
            style={{ touchAction: "pan-y" }}
            className="relative border-border bg-card p-3 shadow-none sm:p-4 md:p-6 overflow-hidden"
          >
            {/* Pinned reading notes inspired by the books on the shelf */}
            <section className="library-notes" data-collapsed={!notesExpanded} aria-labelledby="library-notes-title">
              <div className="library-notes-heading">
                <div>
                  <p className="library-notes-kicker">MARGIN NOTES / {String(libraryNotes.length).padStart(2, "0")}</p>
                  <h3 id="library-notes-title" className="library-notes-title">Ideas worth pinning</h3>
                </div>
                <div className="library-notes-actions">
                  <span className="library-notes-mark" aria-hidden="true">READ / REPEAT</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    aria-expanded={notesExpanded}
                    aria-controls="library-notes-grid"
                    onClick={() => setNotesExpanded((expanded) => !expanded)}
                  >
                    {notesExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    {notesExpanded ? "Show fewer" : `Show more · ${libraryNotes.length - 6}`}
                  </Button>
                </div>
              </div>
              <div className="library-notes-grid" id="library-notes-grid">
                {(notesExpanded ? libraryNotes : libraryNotes.slice(0, 6)).map((note, index) => (
                  <article
                    key={`${note.book}-${index}`}
                    className="library-note"
                    data-tone={note.tone}
                    data-note-index={index + 1}
                    style={{ "--note-index": index } as CSSProperties}
                  >
                    <Pin className="library-note-pin" size={18} strokeWidth={1.8} aria-hidden="true" />
                    <p className="library-note-line">“{note.line}”</p>
                    <p className="library-note-source">Inspired by <span>{note.book}</span></p>
                  </article>
                ))}
              </div>
            </section>

            <div className="library-toolbar" role="search" aria-label="Find a book">
              <div className="library-search">
                <Search className="library-search-icon" size={17} aria-hidden="true" />
                <label className="sr-only" htmlFor="library-search-input">
                  Search books by title, author, genre, or idea
                </label>
                <input
                  id="library-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setSelectedBook(null);
                  }}
                  placeholder="Search your library…"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="library-search-clear"
                    aria-label="Clear search"
                    onClick={() => { setSearchQuery(""); setSelectedBook(null); }}
                  >
                    <X size={15} aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="library-filter-list" role="group" aria-label="Filter by genre">
                {genres.map((genre) => (
                  <button
                    type="button"
                    className="library-filter-chip"
                    data-active={activeGenre === genre}
                    aria-pressed={activeGenre === genre}
                    key={genre}
                    onClick={() => { setActiveGenre(genre); setSelectedBook(null); }}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              <p className="library-result-count" aria-live="polite">
                <span>{visibleBooks.length}</span> of {books.length} books
              </p>
            </div>

            {/* Focused book display and compact, browsable shelf */}
            <div>
              {visibleBooks.length === 0 ? (
                <div className="library-empty-state">
                  <BookOpen size={26} aria-hidden="true" />
                  <p>No books match these filters.</p>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(""); setActiveGenre("All"); }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : activeBook ? (
                <div
                  className="library-gallery"
                  data-paused={isShelfPaused}
                  onPointerEnter={() => setIsShelfPointerOver(true)}
                  onPointerLeave={() => setIsShelfPointerOver(false)}
                  onFocusCapture={() => setIsShelfPointerOver(true)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setIsShelfPointerOver(false);
                    }
                  }}
                >
                  <div className="library-feature">
                    <div className="library-feature-art-wrap">
                      <button
                        ref={featuredCoverRef}
                        type="button"
                        className="library-feature-cover"
                        aria-label={`Open ${activeBook.title} by ${activeBook.author}`}
                        onClick={openFeaturedBook}
                      >
                        <img src={activeBook.cover} alt="" decoding="async" />
                        <span className="library-feature-cover-edge" aria-hidden="true" />
                      </button>
                      <span className="library-feature-orbit" aria-hidden="true" />
                    </div>
                    <div className="library-feature-copy" key={activeBook.id}>
                      <p className="library-feature-kicker">
                        <span>{getStatusText(activeBook.status)}</span>
                        <i aria-hidden="true" />
                        <span>{activeBook.genre}</span>
                      </p>
                      <p className="library-feature-index">VOLUME {String(activeBookIndex + 1).padStart(2, "0")} / {String(visibleBooks.length).padStart(2, "0")}</p>
                      <h3>{activeBook.title}</h3>
                      <p className="library-feature-author">by {activeBook.author}</p>
                      <p className="library-feature-summary">{activeBook.summary}</p>
                      <button type="button" className="library-open-book" onClick={openFeaturedBook}>
                        <BookOpen size={16} aria-hidden="true" />
                        <span>Open this book</span>
                        <ChevronRight size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="library-shelf-controls-row">
                    <div className="library-shelf-label">
                      <span className="library-shelf-led" aria-hidden="true" />
                      <span>THE READING ROOM</span>
                    </div>
                    <div className="library-feature-controls" role="group" aria-label="Book carousel controls">
                      <button type="button" aria-label="Previous book" onClick={() => moveFeaturedBook(-1)}>
                        <ChevronLeft size={17} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="library-auto-toggle"
                        aria-pressed={isShelfPaused}
                        aria-label={isShelfPaused ? "Resume automatic book rotation" : "Pause automatic book rotation"}
                        onClick={() => setIsShelfPaused((paused) => !paused)}
                      >
                        <span aria-hidden="true">{isShelfPaused ? "▶" : "Ⅱ"}</span>
                        <span>{isShelfPaused ? "Play" : "Auto"}</span>
                      </button>
                      <button type="button" aria-label="Next book" onClick={() => moveFeaturedBook(1)}>
                        <ChevronRight size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div ref={shelfTrackRef} className="library-volume-track" role="group" aria-label="Browse books">
                    {visibleBooks.map((book) => (
                      <button
                        key={book.id}
                        type="button"
                        className="library-volume"
                        data-book-id={book.id}
                        data-active={book.id === activeFeaturedBookId}
                        aria-pressed={book.id === activeFeaturedBookId}
                        aria-label={`Show ${book.title} by ${book.author}`}
                        onClick={() => setFeaturedBookId(book.id)}
                      >
                        <span className="library-volume-cover"><img src={book.cover} alt="" loading="lazy" decoding="async" /></span>
                        <span className="library-volume-title">{book.title}</span>
                        <span className="library-volume-author">{book.author}</span>
                      </button>
                    ))}
                  </div>
                  <div className="library-shelf-progress" aria-hidden="true">
                    <span style={{ width: `${((activeBookIndex + 1) / visibleBooks.length) * 100}%` }} />
                  </div>
                </div>
              ) : null}
            </div>
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
      <Dialog open={!!selectedBook} onOpenChange={(open) => { if (!open) setSelectedBook(null); }}>
        {selectedBook && (
          <DialogContent
            id="book-details-pane"
            className="library-reader-dialog w-[calc(100vw-1.5rem)] max-w-[1120px] gap-0 overflow-y-auto border-0 bg-transparent p-0 text-foreground shadow-none"
            style={{
              "--reader-origin-x": `${readerOrigin.x}px`,
              "--reader-origin-y": `${readerOrigin.y}px`,
              "--reader-scale-x": readerOrigin.scaleX,
              "--reader-scale-y": readerOrigin.scaleY,
            } as CSSProperties}
          >
            <DialogTitle className="sr-only">{selectedBook.title} by {selectedBook.author}</DialogTitle>
            <DialogDescription className="sr-only">An open book with notes and a summary in the reading room.</DialogDescription>
            {(() => {
              const note = libraryNotes.find((item) => item.book === selectedBook.title);
              return (
                <div className="library-reader-shell">
                  <div className="library-reader-heading">
                    <span className="library-reader-eyebrow">THE READING HOUR</span>
                    <span className="library-reader-rule" aria-hidden="true" />
                    <span className="library-reader-edition">VOLUME {selectedBook.id.padStart(2, "0")}</span>
                  </div>
                  <div className="library-reader-layout">
                    <div className="library-reader-stage">
                      <div ref={readerSpreadRef} className="library-reader-spread" role="group" aria-label={`Open pages from ${selectedBook.title}`}>
                        <article className="library-reader-page library-reader-page-left">
                          <span className="library-page-kicker">A BOOK FROM THE SHELF</span>
                          <div className="library-page-ornament" aria-hidden="true">✳</div>
                          <h2>{selectedBook.title}</h2>
                          <p className="library-page-author">by {selectedBook.author}</p>
                          <div className="library-page-divider" aria-hidden="true"><span>✦</span></div>
                          <p className="library-page-description">{selectedBook.summary}</p>
                          <span className="library-page-number">{String(Number(selectedBook.id) * 2 - 1).padStart(2, "0")}</span>
                        </article>
                        <article className="library-reader-page library-reader-page-right">
                          <span className="library-page-kicker">A NOTE TO KEEP</span>
                          <div className="library-reader-note">
                            <span className="library-note-quote-mark" aria-hidden="true">“</span>
                            <p>{note?.line ?? selectedBook.summary}</p>
                            <span className="library-reader-note-source">{note ? `MARGIN NOTE · ${note.book}` : `${selectedBook.genre.toUpperCase()} · FROM THE LIBRARY`}</span>
                          </div>
                          <span className="library-page-number">{String(Number(selectedBook.id) * 2).padStart(2, "0")}</span>
                        </article>
                        <div className="library-reader-cover" aria-hidden="true">
                          <img src={selectedBook.cover} alt="" />
                          <span className="library-reader-cover-spine" />
                        </div>
                        <div className="library-reader-paper-edge" aria-hidden="true" />
                      </div>
                      <span className="library-reader-caption">A quiet moment between the covers</span>
                    </div>
                    <aside className="library-reader-details">
                      <span className="library-reader-status">{getStatusText(selectedBook.status)}</span>
                      <h2>{selectedBook.title}</h2>
                      <p className="library-reader-byline">{selectedBook.author}</p>
                      <div className="library-reader-tags">
                        <span>{selectedBook.genre}</span>
                        <span>{String(selectedBook.id).padStart(2, "0")} / {String(books.length).padStart(2, "0")}</span>
                      </div>
                      <div className="library-reader-summary">
                        <span>FROM THE READING JOURNAL</span>
                        <p>{selectedBook.summary}</p>
                      </div>
                      {note && <blockquote className="library-reader-quote">“{note.line}”</blockquote>}
                    </aside>
                  </div>
                  <div className="library-reader-footer"><span>READ / REFLECT / REPEAT</span><span>EST. IN CURIOSITY</span></div>
                </div>
              );
            })()}
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default Bookshelf;
