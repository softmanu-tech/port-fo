
import { useEffect, useRef, useState } from "react";
import { motion, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Hero = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isInView, setIsInView] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  const rotateX = useTransform(mouseY, [0, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 300], [-5, 5]);

  useEffect(() => {
    if (!textRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-pulse-glow");
            setIsInView(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    observer.observe(textRef.current);
    
    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const title = "Full Stack Developer";
  
  const [typedText, setTypedText] = useState("");
  const phrases = [
    "Building modern web apps",
    "Creating responsive designs",
    "Crafting elegant UI/UX",
    "Developing scalable systems"
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
        setTypingSpeed(100);
        
        if (typedText.length === currentPhrase.length) {
          setIsDeleting(true);
          setTypingSpeed(50);
          setTimeout(() => {
            setTypingSpeed(30);
          }, 1000);
        }
      } else {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
        
        if (typedText.length === 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [typedText, currentPhraseIndex, isDeleting, typingSpeed, phrases]);
  
  return (
    <section id="home" className="section min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 bg-portfolio-dark">
        <div className="absolute inset-0 bg-gradient-radial from-portfolio-primary/20 via-transparent to-transparent mask-radial" />
        
        {/* Code matrix background effect */}
        <motion.div 
          className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          <div className="code-rain"></div>
        </motion.div>
      </div>
      
      {/* Enhanced background elements */}
      <motion.div
        className="absolute top-20 right-10 w-40 h-40 bg-portfolio-primary/30 rounded-full blur-3xl"
        animate={{ 
          x: [0, 30, 0], 
          y: [0, -30, 0],
          opacity: [0.6, 0.3, 0.6],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8, 
          ease: "easeInOut", 
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-20 w-56 h-56 bg-portfolio-accent/20 rounded-full blur-3xl"
        animate={{ 
          x: [0, -40, 0], 
          y: [0, 40, 0],
          opacity: [0.5, 0.2, 0.5],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 10, 
          ease: "easeInOut", 
          repeat: Infinity,
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute top-1/3 left-1/4 w-24 h-24 bg-portfolio-light/10 rounded-full blur-2xl"
        animate={{ 
          x: [0, 20, 0], 
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 5, 
          ease: "easeInOut", 
          repeat: Infinity,
          delay: 0.5
        }}
      />

      <div className="text-center z-10 max-w-4xl px-4">
        <motion.div 
          className="mb-12 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-light rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <motion.div 
            className="relative backdrop-blur-sm bg-portfolio-dark/30 border border-white/10 rounded-lg p-4 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-7 gap-8 items-center"
            style={{ 
              transformStyle: "preserve-3d",
              rotateX: rotateX,
              rotateY: rotateY
            }}
            onMouseMove={handleMouseMove}
          >
            {/* Profile Avatar - Column 1-2 on medium screens */}
            <motion.div 
              className="md:col-span-2 flex justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            >
              <div className="relative">
                <motion.div 
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-light opacity-70 blur-md"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 0.9, 0.7]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <Avatar className="h-40 w-40 border-2 border-white/20">
                  <AvatarImage src="/imani.jpeg" alt="EM" />
                  <AvatarFallback className="bg-portfolio-primary text-3xl"></AvatarFallback>
                </Avatar>
              </div>
            </motion.div>
            
            
            {/* Text Content - Column 3-7 on medium screens */}
            <div className="md:col-span-5 text-left">
              <motion.p
                className="text-lg md:text-xl font-rowdies text-portfolio-light mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hello, I'm
              </motion.p>
              
              <motion.h1
                ref={textRef}
                className="text-5xl md:text-7xl lg:text-8xl items-center font-lobster mb-12 text-gradient relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                Emmanuel     Imani Walela
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </motion.h1>
              
              <div className="overflow-hidden">
                <motion.h2 
                  className="text-2xl md:text-4xl font-cinzel font-bold mb-8"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  {title.split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {letter === " " ? <span>&nbsp;</span> : letter}
                    </motion.span>
                  ))}
                </motion.h2>
              </div>
              
              <motion.div
                className="text-lg md:text-xl text-gray-300 mb-10 h-8 font-rowdies font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-portfolio-light">{typedText}</span>
                <span className="animate-pulse">|</span>
              </motion.div>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <motion.a
                  href="#projects"
                  className="group relative px-8 py-3 overflow-hidden rounded-full font-rowdies text-white shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-portfolio-primary to-portfolio-secondary"></span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-portfolio-secondary to-portfolio-accent transition-all duration-300 ease-out scale-0 group-hover:scale-100"></span>
                  <span className="relative z-10">View My Work</span>
                </motion.a>
                
                <motion.a
                  href="#contact"
                  className="group relative px-8 py-3 overflow-hidden rounded-full font-rowdies text-portfolio-light shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 w-full h-full border-2 border-portfolio-light rounded-full"></span>
                  <span className="absolute inset-0 w-full h-full bg-portfolio-light/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10">Contact Me</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.a
          href="#about"
          aria-label="Scroll down"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="group"
        >
          <ArrowDownCircle className="text-portfolio-accent w-10 h-10 group-hover:text-portfolio-light transition-colors duration-300" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
