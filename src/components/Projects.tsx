import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code, MonitorSmartphone } from "lucide-react";
import { useProjects } from "../hooks/useProjects";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const { data: projects = [], isLoading, error } = useProjects();

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

  const filteredProjects = useMemo(() => {
    return filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);
  }, [projects, filter]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * projectsPerPage;
    return filteredProjects.slice(start, start + projectsPerPage);
  }, [filteredProjects, currentPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);

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

        {/* Loading/Error State */}
        {isLoading && (
          <p className="text-center text-white mb-12">Loading projects...</p>
        )}
        {error && (
          <p className="text-center text-red-500 mb-12">Failed to load projects.</p>
        )}

        {/* Projects */}
        {!isLoading && !error && (
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
        )}

        {/* Pagination */}
        {totalPages > 1 && !isLoading && !error && (
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
