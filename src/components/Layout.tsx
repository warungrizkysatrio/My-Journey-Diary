import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Header from './Header';
import MusicPlayer from './MusicPlayer';
import BackgroundSelector from './BackgroundSelector';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state } = useApp();
  const { currentWallpaper, isDarkMode } = state;

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${currentWallpaper})` }}
    >
      <div className="min-h-screen bg-black/30 backdrop-blur-sm transition-all duration-500">
        <Header />
        <BackgroundSelector />
        
        <main className="container mx-auto px-4 py-24 pb-32">
          {children}
        </main>
        
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Layout;