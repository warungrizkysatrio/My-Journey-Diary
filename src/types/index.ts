export interface JourneyEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  location?: string;
  mood?: string;
  tags?: string[];
}

export interface AppState {
  entries: JourneyEntry[];
  currentWallpaper: string;
  isPlaying: boolean;
  currentTrack: number;
  isDarkMode: boolean;
}

export type WallpaperType = {
  id: number;
  url: string;
  name: string;
};

export type MusicTrack = {
  id: number;
  title: string;
  artist: string;
  url: string;
};