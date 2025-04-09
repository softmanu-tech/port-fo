import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code, MonitorSmartphone } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with payment processing, user accounts, and inventory management built with React, Node.js, and MongoDB.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940&auto=format&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      demoLink: "#",
      codeLink: "#",
      category: "fullstack"
    },
    {
      title: "Portfolio Website",
      description: "The application focuses on helps individuals gain better control over their personal finances through tracking, budgeting, and goal-setting tools.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2955&auto=format&fit=crop",
      technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
      demoLink: "#",
      codeLink: "#",
      category: "fullstack"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management platform with real-time updates, notifications, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1565390802731-4baa47a7dd5f?q=80&w=2833&auto=format&fit=crop",
      technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
      demoLink: "#",
      codeLink: "#",
      category: "fullstack"
    },
    {
      title: "Fitness Tracker",
      description: "A mobile application for tracking workouts, nutrition, and progress with data visualization and personalized recommendations.",
      image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c76?q=80&w=2940&auto=format&fit=crop",
      technologies: ["React Native", "Node.js", "Express", "MongoDB"],
      demoLink: "#",
      codeLink: "#",
      category: "mobile"
    },
    {
      title: "Weather Dashboard",
      description: "A weather forecast application with interactive maps, real-time updates, and location-based services.",
      image: "https://images.unsplash.com/photo-1534724364196-7b3944c80d9b?q=80&w=2952&auto=format&fit=crop",
      technologies: ["React", "OpenWeather API", "ChartJS", "Tailwind CSS"],
      demoLink: "#",
      codeLink: "#",
      category: "frontend"
    },
    {
      title: "Chat Application",
      description: "A real-time messaging platform with features like group chats, file sharing, and end-to-end encryption.",
      image: "https://images.unsplash.com/photo-1587825045755-fa51a0ba79fa?q=80&w=2938&auto=format&fit=crop",
      technologies: ["React", "Socket.io", "Express", "MongoDB"],
      demoLink: "#",
      codeLink: "#",
      category: "fullstack"
    }

  ];

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "frontend", name: "Frontend" },
    { id: "fullstack", name: "Full Stack" },
    { id: "mobile", name: "Mobile Apps" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      y: 60,
      transition: { duration: 0.3 }
    }
  };

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((project) => project.category === filter);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  // Reset to page 1 when filter changes
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  return (
    <section id="projects" ref={ref} className="section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gradient text-3xl md:text-5xl font-bold mb-4">My Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto font-rowdies font-light">
            Check out some of my recent work, showcasing my skills in web and mobile development.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => handleFilterChange(category.id)}
              className={`px-4 py-2 rounded-full font-rowdies text-sm transition-all ${
                filter === category.id
                  ? "bg-gradient-to-r from-portfolio-primary to-portfolio-secondary text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {paginatedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="card-effect overflow-hidden"
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="exit"
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
              >
                {/* Image and overlay */}
                <div className="relative aspect-video overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-portfolio-dark/60 flex items-center justify-center opacity-0 transition-opacity"
                    animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                  >
                    <div className="flex gap-4">
                      <motion.a href={project.demoLink} className="bg-portfolio-primary p-3 rounded-full text-white" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <ExternalLink size={20} />
                      </motion.a>
                      <motion.a href={project.codeLink} className="bg-portfolio-accent p-3 rounded-full text-white" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <Github size={20} />
                      </motion.a>
                    </div>
                  </motion.div>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>

                {/* Description */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-portfolio-accent">
                      {project.category === "frontend" ? <Code size={18} /> :
                        project.category === "mobile" ? <MonitorSmartphone size={18} /> :
                          <Github size={18} />}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-rowdies">
                      {project.category === "fullstack" ? "Full Stack" :
                        project.category === "frontend" ? "Frontend" : "Mobile App"}
                    </span>
                  </div>
                  <h3 className="text-xl font-cinzel font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 font-rowdies font-light">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 bg-white/5 rounded font-rowdies text-portfolio-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-full font-rowdies text-sm transition-all ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-portfolio-primary to-portfolio-secondary text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="#contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary rounded-full font-rowdies text-white shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(114, 9, 183, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Work With Me
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
