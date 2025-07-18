import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface SectionDividerProps {
  isAdminMode?: boolean;
  onAddSection?: (type: string) => void;
}

export default function SectionDivider({ isAdminMode, onAddSection }: SectionDividerProps) {
  const [showMenu, setShowMenu] = useState(false);

  const sectionTypes = [
    { id: 'text', label: 'Text Block', icon: '📝' },
    { id: 'heading', label: 'Heading', icon: '📖' },
    { id: 'image', label: 'Image', icon: '🖼️' },
    { id: 'two-column', label: 'Two Columns', icon: '📐' },
    { id: 'gallery', label: 'Gallery', icon: '🎨' },
    { id: 'contact-form', label: 'Contact Form', icon: '📧' },
  ];

  if (!isAdminMode) return null;

  return (
    <div className="section-divider relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowMenu(!showMenu)}
        className="w-12 h-12 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
      >
        <Plus className="w-6 h-6 text-primary" />
      </motion.button>

      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg shadow-lg p-4 min-w-64 z-50"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">Add New Section</h3>
          <div className="grid grid-cols-2 gap-2">
            {sectionTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--primary) / 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onAddSection?.(type.id);
                  setShowMenu(false);
                }}
                className="flex items-center space-x-2 p-3 rounded-lg text-left hover:bg-primary/10 transition-colors duration-200"
              >
                <span className="text-lg">{type.icon}</span>
                <span className="text-sm font-medium text-foreground">{type.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}