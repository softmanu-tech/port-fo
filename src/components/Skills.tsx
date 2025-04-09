import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "CSS/SCSS", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 80 },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Bun.js", level: 85 },
        { name: "Express", level: 90 },
        { name: "Hono.js", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "Django", level: 70 },
        { name: "Java", level: 85 },
      ]
    },
  
    {
      title: "ML/AI",
      skills: [
        { name: "TensorFlow", level: 85 },
        { name: "PyTorch", level: 80 },
        { name: "Keras", level: 75 },
        { name: "Scikit-learn", level: 70 },
        { name: "OpenCV", level: 85 },
        { name: "NLTK", level: 80 },
        { name: "NLP", level: 75 },
        { name: "Speech Recognition", level: 70 },
      ],
    },
    
  ];

  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <motion.div 
      className="mb-4"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setHoveredSkill(name)}
      onHoverEnd={() => setHoveredSkill(null)}
    >
      <div className="flex justify-between items-center mb-1">
        <span className={`text-sm font-rowdies transition-colors duration-300 ${hoveredSkill === name ? 'text-portfolio-accent' : 'text-gray-300'}`}>{name}</span>
        <span className={`text-xs font-rowdies transition-colors duration-300 ${hoveredSkill === name ? 'text-portfolio-light' : 'text-portfolio-accent'}`}>{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${hoveredSkill === name 
            ? 'bg-gradient-to-r from-portfolio-light via-portfolio-accent to-portfolio-primary' 
            : 'bg-gradient-to-r from-portfolio-primary to-portfolio-accent'}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ 
            boxShadow: hoveredSkill === name 
              ? '0 0 10px rgba(76, 201, 240, 0.6)' 
              : 'none' 
          }}
        />
      </div>
    </motion.div>
  );

  return (
    <section id="skills" ref={ref} className="section py-32 bg-portfolio-dark/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gradient text-3xl md:text-5xl font-bold mb-4">My Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent mx-auto"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="card-effect p-6 hover-glow transition-all duration-500 relative group"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-portfolio-primary to-portfolio-accent rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <h3 className="text-xl font-cinzel font-bold mb-6 text-gradient relative">
                {category.title}
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-portfolio-accent"></div>
              </h3>
              <div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skillIndex} name={skill.name} level={skill.level} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 font-rowdies font-light">
            I'm always expanding my skill set and exploring new technologies. Currently, I'm focused on improving my knowledge in cloud architecture and AI integration.
          </p>
          
          <motion.a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-rowdies text-portfolio-light rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 w-full h-full border-2 border-portfolio-light rounded-full"></span>
            <span className="absolute left-0 w-0 h-full bg-portfolio-light group-hover:w-full transition-all duration-300 ease-out"></span>
            <span className="relative text-portfolio-light group-hover:text-portfolio-dark transition-colors duration-300 ease-out z-10">See My Work</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
