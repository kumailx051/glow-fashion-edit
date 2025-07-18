import { motion } from 'framer-motion';
import designerImage from '@/assets/designer-portrait.jpg';

interface AboutSectionProps {
  isAdminMode?: boolean;
  onEditText?: (element: HTMLElement) => void;
  onEditImage?: (currentSrc: string) => void;
}

export default function AboutSection({ isAdminMode, onEditText, onEditImage }: AboutSectionProps) {
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
      onEditImage(designerImage);
    }
  };

  return (
    <section id="about" className="py-20 px-6 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 
              className={`text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent ${
                isAdminMode ? 'editable' : ''
              }`}
              onDoubleClick={handleTextEdit}
              data-editable="true"
            >
              About Me
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p 
                className={isAdminMode ? 'editable' : ''}
                onDoubleClick={handleTextEdit}
                data-editable="true"
              >
                With over a decade of experience in the fashion industry, I've dedicated my career to 
                pushing the boundaries of conventional design while honoring the timeless principles 
                of craftsmanship and elegance.
              </p>
              
              <p 
                className={isAdminMode ? 'editable' : ''}
                onDoubleClick={handleTextEdit}
                data-editable="true"
              >
                My journey began with a deep fascination for textiles and their transformative power. 
                From sketching my first designs as a child to showcasing at international fashion weeks, 
                every step has been guided by an unwavering passion for creating pieces that empower 
                and inspire.
              </p>
              
              <p 
                className={isAdminMode ? 'editable' : ''}
                onDoubleClick={handleTextEdit}
                data-editable="true"
              >
                Today, my studio serves as a creative sanctuary where traditional techniques meet 
                cutting-edge innovation. I believe fashion should be a celebration of individuality, 
                sustainability, and the art of storytelling through fabric.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8 mt-12"
            >
              <div className="text-center">
                <h3 
                  className={`text-3xl font-bold text-primary glow-text mb-2 ${
                    isAdminMode ? 'editable' : ''
                  }`}
                  onDoubleClick={handleTextEdit}
                  data-editable="true"
                >
                  10+
                </h3>
                <p 
                  className={`text-muted-foreground ${
                    isAdminMode ? 'editable' : ''
                  }`}
                  onDoubleClick={handleTextEdit}
                  data-editable="true"
                >
                  Years Experience
                </p>
              </div>
              <div className="text-center">
                <h3 
                  className={`text-3xl font-bold text-secondary glow-text mb-2 ${
                    isAdminMode ? 'editable' : ''
                  }`}
                  onDoubleClick={handleTextEdit}
                  data-editable="true"
                >
                  500+
                </h3>
                <p 
                  className={`text-muted-foreground ${
                    isAdminMode ? 'editable' : ''
                  }`}
                  onDoubleClick={handleTextEdit}
                  data-editable="true"
                >
                  Designs Created
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div 
              className={`relative ${
                isAdminMode ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
              }`}
              onDoubleClick={handleImageEdit}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src={designerImage}
                  alt="Arshma Batool"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover h-96"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20"></div>
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-70 animate-pulse"></div>
              </motion.div>
              
              {/* Floating design elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full opacity-70"
              />
              
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full opacity-70"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}