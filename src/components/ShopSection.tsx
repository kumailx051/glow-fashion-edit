import { motion } from 'framer-motion';

interface ShopSectionProps {
  isAdminMode?: boolean;
  onEditText?: (element: HTMLElement) => void;
  onEditImage?: (currentSrc: string) => void;
}

export default function ShopSection({ isAdminMode, onEditText, onEditImage }: ShopSectionProps) {
  const products = [
    {
      id: 1,
      name: "Ethereal Silk Dress",
      price: "$1,299",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      description: "Flowing silk dress with hand-embroidered details"
    },
    {
      id: 2,
      name: "Modern Blazer",
      price: "$899",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
      description: "Tailored blazer with contemporary cut"
    },
    {
      id: 3,
      name: "Statement Accessories",
      price: "$299",
      image: "https://images.unsplash.com/photo-1506629905057-f5845fb2c34e?w=400&h=500&fit=crop",
      description: "Unique accessories to complete your look"
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
    <section id="shop" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent ${
              isAdminMode ? 'editable' : ''
            }`}
            onDoubleClick={handleTextEdit}
            data-editable="true"
          >
            Shop
          </h2>
          <p 
            className={`text-xl text-muted-foreground max-w-2xl mx-auto ${
              isAdminMode ? 'editable' : ''
            }`}
            onDoubleClick={handleTextEdit}
            data-editable="true"
          >
            Discover exclusive pieces from my latest collections. Each item is crafted with 
            meticulous attention to detail and sustainable practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div 
                className={`relative h-80 overflow-hidden ${
                  isAdminMode ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
                }`}
                onDoubleClick={(e) => handleImageEdit(e, product.image)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 
                  className={`text-xl font-bold mb-2 text-foreground ${
                    isAdminMode ? 'editable' : ''
                  }`}
                  onDoubleClick={handleTextEdit}
                  data-editable="true"
                >
                  {product.name}
                </h3>
                <p 
                  className={`text-muted-foreground mb-4 ${
                    isAdminMode ? 'editable' : ''
                  }`}
                  onDoubleClick={handleTextEdit}
                  data-editable="true"
                >
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span 
                    className={`text-2xl font-bold text-primary glow-text ${
                      isAdminMode ? 'editable' : ''
                    }`}
                    onDoubleClick={handleTextEdit}
                    data-editable="true"
                  >
                    {product.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Shop Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-border"
          >
            View Full Collection
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}