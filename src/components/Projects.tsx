import { ExternalLink, Github, Smartphone, Database, Eye, Gamepad2, Headset, ArrowRight } from "lucide-react";

const Projects = () => {
const projects = [
{
title: "Forex Transaction API Integration",
description: "Developed MuleSoft APIs enabling online forex transactions for mobile apps. Enhanced client systems with seamless API communication.",
icon: Database,
technologies: ["MuleSoft", "API Design", "Integration"],
category: "Backend"
},
{
title: "ExcelPro Android Application",
description: "OCR-powered app for converting Excel data to student-specific formats. Integrated Firebase for backend support.",
icon: Smartphone,
technologies: ["Android", "OCR", "Firebase", "Java"],
category: "Mobile"
},
{
title: "Angel Eyes – AR Road Safety App",
description: "Created during a hackathon using Unity and Spark AR. Provides immersive AR experiences for road safety education.",
icon: Eye,
technologies: ["Unity", "Spark AR", "C#", "AR"],
category: "AR/VR"
},
{
title: "Indian Roads – Android Game",
description: "Designed an engaging mobile game using Unity with intuitive controls and user-friendly UI.",
icon: Gamepad2,
technologies: ["Unity", "C#", "Game Design", "Android"],
category: "Gaming"
},
{
title: "Oculus VR Projects",
description: "Contributed to immersive VR apps built in Unity, pushing the boundaries of user interaction.",
icon: Headset,
technologies: ["Unity", "Oculus SDK", "VR", "C#"],
category: "AR/VR"
}
];

return (
<section id="projects" className="section-container">
<div className="max-w-7xl mx-auto">
{/* Section Header */}
<div className="text-center mb-16">
<h2 className="text-4xl md:text-5xl font-bold mb-6">
Featured <span className="text-primary">Projects</span>
</h2>
<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
Showcasing innovative solutions across mobile, web, AR/VR, and backend development
</p>
</div>

{/* Projects Grid */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
{projects.map((project, index) => (
<div
key={project.title}
className="tech-card group h-full flex flex-col"
style={{animationDelay: `${index * 0.2}s`}}
>
{/* Project Icon */}
<div className="flex items-center mb-4">
<div className="p-3 bg-primary/10 rounded-lg mr-4">
<project.icon className="h-8 w-8 text-primary" />
</div>
<span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
{project.category}
</span>
</div>

{/* Project Content */}
<div className="flex-1">
<h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
{project.title}
</h3>
<p className="text-muted-foreground mb-4 leading-relaxed">
{project.description}
</p>
</div>

{/* Technologies */}
<div className="mb-6">
<div className="flex flex-wrap gap-2">
{project.technologies.map((tech) => (
<span
key={tech}
className="text-xs bg-secondary px-3 py-1 rounded-full text-secondary-foreground"
>
{tech}
</span>
))}
</div>
</div>

{/* Project Links */}
<div className="flex space-x-4 pt-4 border-t border-border">
<button className="flex items-center text-primary hover:text-primary-glow transition-colors">
<ExternalLink className="h-4 w-4 mr-2" />
<span className="text-sm">View Details</span>
</button>
<button className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
<Github className="h-4 w-4 mr-2" />
<span className="text-sm">Source</span>
</button>
</div>
</div>
))}
</div>

{/* View More Projects */}
<div className="text-center mt-12">
<a
href="https://github.com/codesasithar/Projects"
target="_blank"
rel="noopener noreferrer"
className="btn-tech group"
>
GitHub
<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
</a>
</div>
</div>
</section>
);
};

export default Projects;
