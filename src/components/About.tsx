
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const statItems = [
    { value: "5+", label: "Years Experience" },
    { value: "20+", label: "Projects Completed" },
    { value: "15+", label: "Happy Clients" },
    { value: "3", label: "Awards" },
  ];

  return (
    <section id="about" ref={ref} className="section py-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gradient text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-square relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-portfolio-primary/20 tilt-card hover:shadow-portfolio-accent/20 transition-all duration-500">
              <div className="w-full h-full p-2 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-portfolio-primary/80 via-portfolio-secondary/80 to-portfolio-accent/80 group-hover:opacity-90 transition-opacity duration-500"></div>
                <div className="absolute inset-2 bg-portfolio-dark/90 rounded-xl flex items-center justify-center p-8">
                  <div className="text-center relative z-10">
                    <h3 className="font-lobster text-4xl lg:text-5xl text-gradient mb-2 shine-effect">Who I Am</h3>
                    <p className="font-rowdies font-light text-gray-300">
                      A passionate full stack developer with a strong design sense and a deep understanding of both frontend and backend technologies.
                    </p>
                    
                    <motion.div 
                      className="absolute -z-10 inset-0 blur-3xl opacity-30"
                      animate={{ 
                        background: [
                          'radial-gradient(circle at 30% 30%, rgba(114, 9, 183, 0.5), transparent 70%)',
                          'radial-gradient(circle at 70% 70%, rgba(114, 9, 183, 0.5), transparent 70%)',
                          'radial-gradient(circle at 30% 70%, rgba(114, 9, 183, 0.5), transparent 70%)',
                          'radial-gradient(circle at 70% 30%, rgba(114, 9, 183, 0.5), transparent 70%)',
                          'radial-gradient(circle at 30% 30%, rgba(114, 9, 183, 0.5), transparent 70%)',
                        ]
                      }}
                      transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-8 -left-8 w-32 h-32 border-2 border-portfolio-accent rounded-xl -z-10 hover-glow"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 border-2 border-portfolio-primary rounded-xl -z-10"></div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-portfolio-accent/20 rounded-full -z-10 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-portfolio-primary/20 rounded-full -z-10 blur-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-cinzel font-semibold mb-6 relative inline-block">
              Turning Vision Into Reality
              <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-portfolio-accent"></div>
            </h3>
            <p className="text-gray-300 mb-6 font-rowdies font-light">
              I'm a Full Stack Developer based in Nairobi, specializing in building exceptional digital experiences. With 5+ years of experience in web development, I enjoy creating responsive and interactive applications with clean, efficient, and maintainable code.
            </p>
            <p className="text-gray-300 mb-8 font-rowdies font-light">
              My approach combines technical expertise with creative problem-solving. I'm passionate about leveraging cutting-edge technologies to build applications that are not only functional but also provide intuitive, seamless user experiences.
            </p>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              {statItems.map((stat, index) => (
                <motion.div
                  key={index}
                  className="card-effect p-4 text-center group hover:shadow-portfolio-accent/20 transition-all duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <h4 className="text-3xl md:text-4xl font-lobster text-portfolio-accent mb-1 group-hover:text-gradient transition-all duration-300">{stat.value}</h4>
                    <p className="text-sm text-gray-400 font-rowdies group-hover:text-gray-300 transition-colors duration-300">{stat.label}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="#contact"
              className="group relative px-8 py-3 overflow-hidden rounded-full font-rowdies text-white shadow-lg inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-portfolio-primary to-portfolio-secondary"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-portfolio-secondary to-portfolio-accent transition-all duration-300 ease-out scale-0 group-hover:scale-100"></span>
              <span className="relative z-10">Let's Talk</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
