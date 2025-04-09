
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine active section
      const sections = menuItems.map(item => item.href.substring(1));
      let currentSection = "home";
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 py-4 px-6 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-lg backdrop-blur-md bg-portfolio-dark/70" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.a
          href="#home"
          className="text-3xl font-lobster text-gradient relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute -inset-1 rounded-full blur opacity-0 group-hover:opacity-25 transition duration-300 group-hover:duration-200 bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-light"></span>
          DevPortfolio
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              className="relative"
              whileHover={{ scale: 1.1, y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={item.href}
                className={`font-rowdies transition-colors duration-300 ${
                  activeSection === item.href.substring(1) 
                    ? "text-portfolio-accent" 
                    : "text-white hover:text-portfolio-light"
                }`}
              >
                {item.name}
              </a>
              {activeSection === item.href.substring(1) && (
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-portfolio-accent" 
                  layoutId="activeSection"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <motion.button
            onClick={toggleMenu}
            className="text-white p-2 focus:outline-none"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden glass-effect border-t border-white/10 mt-4"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col py-4 space-y-4">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`font-rowdies px-6 py-2 transition-colors relative ${
                    activeSection === item.href.substring(1) 
                      ? "text-portfolio-accent" 
                      : "text-white hover:text-portfolio-light"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.div 
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-5 bg-portfolio-accent rounded-full" 
                      layoutId="activeMobileSection"
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
