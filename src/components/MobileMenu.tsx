import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface MobileMenuProps {
  isAdminMode?: boolean;
}

export default function MobileMenu({ isAdminMode }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Work', id: 'work' },
    { name: 'About', id: 'about' },
    { name: 'Shop', id: 'shop' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-foreground hover:text-primary transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 h-full w-80 bg-card border-l border-border shadow-xl z-50 p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="text-2xl font-bold glow-text">AB</div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-3 px-4 text-lg font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>

              {isAdminMode && (
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-primary/20 px-4 py-3 rounded-lg text-center border border-primary/30">
                    <div className="text-sm font-medium text-primary">Edit Mode Active</div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}