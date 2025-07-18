import { motion } from 'framer-motion';
import { useState } from 'react';

interface WorkSectionProps {
  isAdminMode?: boolean;
  onEditText?: (element: HTMLElement) => void;
  onEditImage?: (currentSrc: string) => void;
}

export default function WorkSection({ isAdminMode, onEditText, onEditImage }: WorkSectionProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const workItems = [
    {
      title: "Spring Collection 2024",
      description: "Vibrant florals meet minimalist cuts in this season's most anticipated collection.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop",
      category: "Ready-to-Wear"
    },
    {
      title: "Ethereal Evenings",
      description: "Luxurious evening wear that captures the magic of twilight hours.",
      image: "https://images.unsplash.com/photo-1566479179817-c0092b67b3e1?w=600&h=400&fit=crop",
      category: "Haute Couture"
    },
    {
      title: "Urban Nomad",
      description: "Functional fashion for the modern traveler, blending comfort with style.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
      category: "Streetwear"
    },
    {
      title: "Sustainable Chic",
      description: "Eco-conscious designs proving that sustainability and style go hand in hand.",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=400&fit=crop",
      category: "Sustainable"
    }
  ];

  const handleTextEdit = (e: React.MouseEvent<HTMLElement>) => {
    if (isAdminMode && onEditText) {
      e.preventDefault();
      e.stopPropagation();
      onEditText(e.currentTarget);
    }
  };

  const handleImageEdit = (e: React.MouseEvent<HTMLDivElement>, imageSrc: string) => {
    if (isAdminMode && onEditImage) {
      e.preventDefault();
      e.stopPropagation();
      onEditImage(imageSrc);
    }
  };

  return (
    <section id="work" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${
              isAdminMode ? 'editable' : ''
            }`}
            onDoubleClick={handleTextEdit}
            data-editable="true"
          >
            My Work
          </h2>
          <p 
            className={`text-xl text-muted-foreground max-w-2xl mx-auto ${
              isAdminMode ? 'editable' : ''
            }`}
            onDoubleClick={handleTextEdit}
            data-editable="true"
          >
            Explore my latest collections that showcase the intersection of art, 
            innovation, and timeless fashion design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-card"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div 
                className={`relative h-80 overflow-hidden ${
                  isAdminMode ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
                }`}
                onDoubleClick={(e) => handleImageEdit(e, item.image)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredItem === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4"
                >
                  <span className="px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-primary/30">
                    {item.category}
                  </span>
                </motion.div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 
                  className={`text-2xl font-bold mb-2 text-foreground ${
                    isAdminMode ? 'editable' : ''
                  }`}
                  onDoubleClick={handleTextEdit}
                  data-editable="true"
                >
                  {item.title}
                </h3>
                <p 
                  className={`text-muted-foreground ${
                    isAdminMode ? 'editable' : ''
                  }`}
                  onDoubleClick={handleTextEdit}
                  data-editable="true"
                >
                  {item.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredItem === index ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                  className="h-0.5 bg-gradient-to-r from-primary to-secondary mt-4"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}