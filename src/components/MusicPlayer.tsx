import React, { useRef, useEffect } from 'react';
import { Music, Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { musicTracks } from '../data/music';

const MusicPlayer: React.FC = () => {
  const { state, togglePlayPause, setCurrentTrack } = useApp();
  const { isPlaying, currentTrack } = state;
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const track = musicTracks[currentTrack];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleNext = () => {
    const nextTrack = (currentTrack + 1) % musicTracks.length;
    setCurrentTrack(nextTrack);
  };

  const handlePrevious = () => {
    const prevTrack = currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevTrack);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 border-t border-white/20 transition-all duration-500 ease-in-out">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-xl">
              <Music className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="text-sm hidden sm:block">
              <div className="font-medium dark:text-white">{track?.title || 'Select a track'}</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">{track?.artist || 'Artist'}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
              onClick={handlePrevious}
            >
              <SkipBack className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>
            
            <button 
              className="p-3 bg-indigo-600 dark:bg-indigo-500 rounded-full text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transform hover:scale-105 transition-all duration-300"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
            
            <button 
              className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
              onClick={handleNext}
            >
              <SkipForward className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Volume2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="80"
              className="w-20 sm:w-32 accent-indigo-600 h-1 bg-gray-300 dark:bg-gray-700 rounded-full appearance-none"
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.volume = Number(e.target.value) / 100;
                }
              }}
            />
          </div>
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={track?.url}
        onEnded={handleNext}
        className="hidden"
      />
    </div>
  );
};

export default MusicPlayer;