import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AppGalleryProps {
  screenshots: string[];
  className?: string;
}

export function AppGallery({ screenshots, className }: AppGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleFullscreenClick = () => {
    setFullscreenImage(screenshots[activeIndex]);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video group">
        <img 
          src={screenshots[activeIndex]} 
          alt={`Screenshot ${activeIndex + 1}`}
          className="w-full h-full object-contain"
        />
        
        {screenshots.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next screenshot"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        
        <button 
          onClick={handleFullscreenClick}
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="View fullscreen"
        >
          <Maximize className="h-4 w-4" />
        </button>
      </div>
      
      {screenshots.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {screenshots.map((screenshot, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "flex-shrink-0 w-20 h-12 rounded-md overflow-hidden border-2",
                activeIndex === index ? "border-primary" : "border-transparent hover:border-gray-300"
              )}
            >
              <img 
                src={screenshot} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      <Dialog open={!!fullscreenImage} onOpenChange={() => setFullscreenImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-black/90">
          <div className="relative h-[80vh] flex items-center justify-center p-4">
            {fullscreenImage && (
              <img 
                src={fullscreenImage} 
                alt="Fullscreen screenshot" 
                className="max-h-full max-w-full object-contain"
              />
            )}
            
            {screenshots.length > 1 && (
              <>
                <button 
                  onClick={() => {
                    const newIndex = activeIndex === 0 ? screenshots.length - 1 : activeIndex - 1;
                    setActiveIndex(newIndex);
                    setFullscreenImage(screenshots[newIndex]);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button 
                  onClick={() => {
                    const newIndex = (activeIndex + 1) % screenshots.length;
                    setActiveIndex(newIndex);
                    setFullscreenImage(screenshots[newIndex]);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
