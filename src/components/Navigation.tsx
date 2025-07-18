import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MobileMenu from './MobileMenu';

interface NavigationProps {
  isAdminMode?: boolean;
}

export default function Navigation({ isAdminMode }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Work', id: 'work' },
    { name: 'About', id: 'about' },
    { name: 'Shop', id: 'shop' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold glow-text cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            AB
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          {isAdminMode && (
            <div className="bg-primary/20 px-3 py-1 rounded-full text-sm font-medium border border-primary/30">
              Edit Mode
            </div>
          )}

          {/* Mobile menu */}
          <MobileMenu isAdminMode={isAdminMode} />
        </div>
      </div>
    </motion.nav>
  );
}