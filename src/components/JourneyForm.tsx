import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Send, Smile } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JourneyEntry } from '../types';

interface JourneyFormProps {
  entry?: JourneyEntry;
  onClose?: () => void;
}

const JourneyForm: React.FC<JourneyFormProps> = ({ entry, onClose }) => {
  const { addEntry, updateEntry } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: '',
    mood: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  // Load entry data if editing
  useEffect(() => {
    if (entry) {
      setFormData({
        title: entry.title,
        content: entry.content,
        location: entry.location || '',
        mood: entry.mood || '',
      });
    }
  }, [entry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      if (entry) {
        updateEntry({
          ...entry,
          ...formData
        });
      } else {
        addEntry(formData);
        setFormData({
          title: '',
          content: '',
          location: '',
          mood: '',
        });
      }
      setIsSaving(false);
      if (onClose) onClose();
    }, 500);
  };

  const moodOptions = ['Happy', 'Relaxed', 'Excited', 'Nostalgic', 'Grateful', 'Peaceful', 'Adventurous'];

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/20 dark:border-gray-700/30 transition-all duration-500"
    >
      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title your journey..."
            required
            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 text-lg font-medium text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        <div>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="What's your story? Describe your journey, feelings, and experiences..."
            required
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 text-gray-700 dark:text-gray-200"
            />
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Smile className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="mood"
              value={formData.mood}
              onChange={(e) => setFormData((prev) => ({ ...prev, mood: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 text-gray-700 dark:text-gray-200 appearance-none"
            >
              <option value="">Select mood</option>
              {moodOptions.map((mood) => (
                <option key={mood} value={mood}>{mood}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-2 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-300 ${
                isSaving
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isSaving ? (
                <div className="h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{entry ? 'Update' : 'Save'}</span>
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default JourneyForm;