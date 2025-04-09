
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { MousePointer } from "lucide-react";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  useEffect(() => {
    // Smooth scroll to section when clicking on anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {
          // cleanup
        });
      });
    };
  }, []);

  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window !== 'undefined') {
        window.mouseX = e.clientX;
        window.mouseY = e.clientY;
      }
    };
    
    const handleMouseDown = () => {
      if (typeof window !== 'undefined') {
        window.mouseDown = true;
      }
    };
    
    const handleMouseUp = () => {
      if (typeof window !== 'undefined') {
        window.mouseDown = false;
      }
    };
    
    if (typeof window !== 'undefined') {
      window.mouseX = 0;
      window.mouseY = 0;
      window.mouseDown = false;
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);

  useEffect(() => {
    // Fix cursor styles to ensure visibility
    document.body.classList.add('cursor');
    
    // For mobile devices, use default cursor
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        document.body.classList.remove('cursor');
      } else {
        document.body.classList.add('cursor');
      }
    };
    
    window.addEventListener('resize', checkMobile);
    checkMobile();
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.classList.remove('cursor');
    };
  }, []);

  return (
    <div className="bg-portfolio-dark text-white">
      {/* Custom cursor with improved visibility */}
      <motion.div 
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(247, 37, 133, 0.3)",
          boxShadow: "0 0 20px rgba(76, 201, 240, 0.8), 0 0 50px rgba(114, 9, 183, 0.5)"
        }}
        animate={{
          x: (typeof window !== 'undefined') ? window.mouseX - 16 : 0,
          y: (typeof window !== 'undefined') ? window.mouseY - 16 : 0,
          scale: (typeof window !== 'undefined') ? (window.mouseDown ? 0.8 : 1) : 1
        }}
      >
        <MousePointer size={16} className="text-white" />
      </motion.div>
      
      {/* Custom pointer ring */}
      <motion.div 
        className="fixed w-12 h-12 rounded-full pointer-events-none z-50 border-2 border-portfolio-accent"
        style={{ mixBlendMode: "difference" }}
        animate={{
          x: (typeof window !== 'undefined') ? window.mouseX - 24 : 0,
          y: (typeof window !== 'undefined') ? window.mouseY - 24 : 0,
          scale: (typeof window !== 'undefined') ? (window.mouseDown ? 0.6 : 1) : 1
        }}
        transition={{ ease: "backOut", duration: 0.15 }}
      />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-light z-50 origin-left"
        style={{ scaleX }}
      />
      
      <div className="absolute inset-0 bg-hero-pattern opacity-5 z-0 pointer-events-none" />
      
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
