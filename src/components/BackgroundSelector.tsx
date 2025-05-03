import React, { useState } from 'react';
import { Image, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { wallpapers } from '../data/wallpapers';

const BackgroundSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setWallpaper } = useApp();

  return (
    <>
      <button 
        className="fixed right-4 top-24 z-50 p-3 rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/40 transition-all duration-300 dark:bg-black/30 dark:hover:bg-black/40"
        onClick={() => setIsOpen(true)}
        aria-label="Change background"
      >
        <Image className="h-5 w-5 text-gray-800 dark:text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl p-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Choose a background</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {wallpapers.map((wallpaper) => (
                <div 
                  key={wallpaper.id}
                  className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => {
                    setWallpaper(wallpaper.id);
                    setIsOpen(false);
                  }}
                >
                  <img 
                    src={wallpaper.url} 
                    alt={wallpaper.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-sm font-medium">{wallpaper.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BackgroundSelector;