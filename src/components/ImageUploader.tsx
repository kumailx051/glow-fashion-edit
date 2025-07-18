import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  onClose: () => void;
}

export default function ImageUploader({ currentImage, onImageChange, onClose }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get('imageUrl') as string;
    if (url) {
      onImageChange(url);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-card border border-border rounded-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-foreground">Change Image</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Current Image Preview */}
          <div className="text-center">
            <img
              src={currentImage}
              alt="Current"
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <p className="text-sm text-muted-foreground">Current Image</p>
          </div>

          {/* Upload from File */}
          <div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 border-2 border-dashed border-border hover:border-primary/50 rounded-lg transition-colors duration-300 group"
            >
              <div className="flex flex-col items-center space-y-2">
                <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-foreground">Upload from Computer</span>
                <span className="text-xs text-muted-foreground">Click to select a file</span>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* URL Input */}
          <div>
            <form onSubmit={handleUrlSubmit} className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Or enter image URL:
              </label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300"
              >
                Use URL
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}