import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import heroImage from '@/assets/hero-bg.jpg';
import ThreeBackground from './ThreeBackground';

interface HeroSectionProps {
  isAdminMode?: boolean;
  onEditText?: (element: HTMLElement) => void;
  onEditImage?: (currentSrc: string) => void;
}

export default function HeroSection({ isAdminMode, onEditText, onEditImage }: HeroSectionProps) {
  const isMobile = useIsMobile();

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTextEdit = (e: React.MouseEvent<HTMLElement>) => {
    if (isAdminMode && onEditText) {
      e.preventDefault();
      e.stopPropagation();
      onEditText(e.currentTarget);
    }
  };

  const handleImageEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAdminMode && onEditImage) {
      e.preventDefault();
      e.stopPropagation();
      onEditImage(heroImage);
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.7), rgba(34, 34, 34, 0.7)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {!isMobile && <ThreeBackground />}
      
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-transparent ${
          isAdminMode ? 'cursor-pointer hover:bg-primary/10 transition-colors' : ''
        }`}
        onDoubleClick={handleImageEdit}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className={`text-6xl md:text-8xl font-bold mb-6 glow-text text-foreground ${
              isAdminMode ? 'editable' : ''
            }`}
            whileHover={isAdminMode ? { scale: 1.02 } : {}}
            onDoubleClick={handleTextEdit}
            data-editable="true"
            data-content-id="hero-title"
          >
            Arshma Batool
          </motion.h1>
          
          <motion.h2
            className={`text-4xl md:text-6xl font-bold mb-8 text-primary glow-text ${
              isAdminMode ? 'editable' : ''
            }`}
            whileHover={isAdminMode ? { scale: 1.02 } : {}}
            onDoubleClick={handleTextEdit}
            data-editable="true"
            data-content-id="hero-subtitle"
          >
            I am Fashion Designer
          </motion.h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed ${
            isAdminMode ? 'editable' : ''
          }`}
          whileHover={isAdminMode ? { scale: 1.01 } : {}}
          onDoubleClick={handleTextEdit}
          data-editable="true"
          data-content-id="hero-description"
        >
          I am a visionary fashion designer creating innovative designs that blend contemporary style with timeless elegance. 
          My work spans from haute couture to ready-to-wear collections, each piece telling a unique story through fabric, 
          color, and form. Welcome to my creative universe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <motion.button
            onClick={scrollToWork}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="animate-bounce cursor-pointer p-4 rounded-full bg-primary/20 hover:bg-primary/30 transition-all duration-300 glow-border"
          >
            <ChevronDown className="w-8 h-8 text-primary" />
          </motion.button>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/30 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-secondary/30 rounded-full"
        />
      </div>
    </section>
  );
}