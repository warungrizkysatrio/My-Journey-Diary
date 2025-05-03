import React, { createContext, useContext, ReactNode } from 'react';
import { AppState, JourneyEntry } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { wallpapers } from '../data/wallpapers';
import { musicTracks } from '../data/music';

type AppContextType = {
  state: AppState;
  addEntry: (entry: Omit<JourneyEntry, 'id' | 'date'>) => void;
  updateEntry: (entry: JourneyEntry) => void;
  deleteEntry: (id: string) => void;
  setWallpaper: (wallpaperId: number) => void;
  togglePlayPause: () => void;
  setCurrentTrack: (trackId: number) => void;
  toggleDarkMode: () => void;
};

const initialState: AppState = {
  entries: [],
  currentWallpaper: wallpapers[0].url,
  isPlaying: false,
  currentTrack: 0,
  isDarkMode: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useLocalStorage<AppState>('journeyDiary', initialState);

  const addEntry = (entry: Omit<JourneyEntry, 'id' | 'date'>) => {
    const newEntry: JourneyEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      entries: [newEntry, ...prev.entries],
    }));
  };

  const updateEntry = (updatedEntry: JourneyEntry) => {
    setState((prev) => ({
      ...prev,
      entries: prev.entries.map((entry) => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      ),
    }));
  };

  const deleteEntry = (id: string) => {
    setState((prev) => ({
      ...prev,
      entries: prev.entries.filter((entry) => entry.id !== id),
    }));
  };

  const setWallpaper = (wallpaperId: number) => {
    const wallpaper = wallpapers.find((w) => w.id === wallpaperId);
    if (wallpaper) {
      setState((prev) => ({
        ...prev,
        currentWallpaper: wallpaper.url,
      }));
    }
  };

  const togglePlayPause = () => {
    setState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  const setCurrentTrack = (trackId: number) => {
    setState((prev) => ({
      ...prev,
      currentTrack: trackId,
      isPlaying: true,
    }));
  };

  const toggleDarkMode = () => {
    setState((prev) => ({
      ...prev,
      isDarkMode: !prev.isDarkMode,
    }));
  };

  const value = {
    state,
    addEntry,
    updateEntry,
    deleteEntry,
    setWallpaper,
    togglePlayPause,
    setCurrentTrack,
    toggleDarkMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};