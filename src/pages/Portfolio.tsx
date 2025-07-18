import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WorkSection from '@/components/WorkSection';
import AboutSection from '@/components/AboutSection';
import ShopSection from '@/components/ShopSection';
import ContactSection from '@/components/ContactSection';
import SectionDivider from '@/components/SectionDivider';
import ImageUploader from '@/components/ImageUploader';
import { useToast } from '@/hooks/use-toast';

export default function Portfolio() {
  const location = useLocation();
  const isAdminMode = location.pathname === '/admin';
  const [imageUploader, setImageUploader] = useState<{ show: boolean; currentSrc: string }>({ 
    show: false, 
    currentSrc: '' 
  });
  const { toast } = useToast();

  const handleTextEdit = (element: HTMLElement) => {
    if (!isAdminMode) return;
    
    element.contentEditable = 'true';
    element.focus();
    
    // Select all text
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    const handleSave = () => {
      element.contentEditable = 'false';
      element.removeEventListener('blur', handleSave);
      element.removeEventListener('keydown', handleKeyDown);
      
      toast({
        title: "Text Updated",
        description: "Your changes have been saved.",
        duration: 2000,
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      } else if (e.key === 'Escape') {
        element.innerHTML = element.textContent || '';
        handleSave();
      }
    };

    element.addEventListener('blur', handleSave);
    element.addEventListener('keydown', handleKeyDown);
  };

  const handleImageEdit = (currentSrc: string) => {
    if (!isAdminMode) return;
    setImageUploader({ show: true, currentSrc });
  };

  const handleImageChange = (newImageUrl: string) => {
    // In a real app, this would update the image in your content management system
    toast({
      title: "Image Updated",
      description: "The image has been successfully changed.",
      duration: 2000,
    });
  };

  const handleAddSection = (sectionType: string) => {
    // In a real app, this would add a new section to your content management system
    toast({
      title: "Section Added",
      description: `New ${sectionType} section has been added.`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAdminMode={isAdminMode} />
      
      <main>
        <HeroSection 
          isAdminMode={isAdminMode} 
          onEditText={handleTextEdit}
          onEditImage={handleImageEdit}
        />
        
        {isAdminMode && (
          <SectionDivider 
            isAdminMode={isAdminMode} 
            onAddSection={handleAddSection}
          />
        )}
        
        <WorkSection 
          isAdminMode={isAdminMode} 
          onEditText={handleTextEdit}
          onEditImage={handleImageEdit}
        />
        
        {isAdminMode && (
          <SectionDivider 
            isAdminMode={isAdminMode} 
            onAddSection={handleAddSection}
          />
        )}
        
        <AboutSection 
          isAdminMode={isAdminMode} 
          onEditText={handleTextEdit}
          onEditImage={handleImageEdit}
        />
        
        {isAdminMode && (
          <SectionDivider 
            isAdminMode={isAdminMode} 
            onAddSection={handleAddSection}
          />
        )}
        
        <ShopSection 
          isAdminMode={isAdminMode} 
          onEditText={handleTextEdit}
          onEditImage={handleImageEdit}
        />
        
        {isAdminMode && (
          <SectionDivider 
            isAdminMode={isAdminMode} 
            onAddSection={handleAddSection}
          />
        )}
        
        <ContactSection 
          isAdminMode={isAdminMode} 
          onEditText={handleTextEdit}
        />
      </main>

      {/* Admin Tools */}
      {isAdminMode && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-card border border-primary/30 rounded-xl p-4 shadow-lg backdrop-blur-sm z-40"
        >
          <div className="text-sm space-y-2">
            <div className="font-semibold text-primary">Admin Mode Active</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Double-click text to edit</p>
              <p>• Double-click images to replace</p>
              <p>• Use + buttons to add sections</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Image Uploader Modal */}
      <AnimatePresence>
        {imageUploader.show && (
          <ImageUploader
            currentImage={imageUploader.currentSrc}
            onImageChange={handleImageChange}
            onClose={() => setImageUploader({ show: false, currentSrc: '' })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}