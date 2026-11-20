const screenshots = [
  {
    src: "/images/excelpro/role-selection.png",
    alt: "ExcelPro role selection screen for admin, faculty, and student users",
    label: "Role selection",
  },
  {
    src: "/images/excelpro/admin-dashboard.png",
    alt: "ExcelPro admin dashboard with notification, student list, and feedback options",
    label: "Admin tools",
  },
  {
    src: "/images/excelpro/marklist-upload.png",
    alt: "ExcelPro screen for uploading a semester marklist",
    label: "Marklist upload",
  },
  {
    src: "/images/excelpro/create-events.png",
    alt: "ExcelPro event creation screen with banner upload controls",
    label: "Event creation",
  },
  {
    src: "/images/excelpro/student-dashboard.png",
    alt: "ExcelPro student dashboard with graphs, marks, events, subjects, feedback, and notifications",
    label: "Student dashboard",
  },
  {
    src: "/images/excelpro/marks-analytics.png",
    alt: "ExcelPro semester marks analytics bar chart",
    label: "Marks analytics",
  },
];

const ExcelProGallery = () => (
  <section className="mt-5" aria-label="ExcelPro app screenshots">
    <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
      App screenshots
    </h4>
    <div className="grid grid-cols-3 gap-2">
      {screenshots.map((screenshot) => (
        <figure
          key={screenshot.src}
          className="overflow-hidden rounded-lg border border-border/60 bg-card/70"
        >
          <a
            href={screenshot.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full-size screenshot: ${screenshot.label}`}
            className="block overflow-hidden"
          >
            <img
              src={screenshot.src}
              alt={screenshot.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[1/2] w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
            />
          </a>
          <figcaption className="truncate px-1.5 py-1.5 text-center text-[10px] font-medium leading-tight text-muted-foreground sm:px-2 sm:text-xs">
            {screenshot.label}
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);

export default ExcelProGallery;
