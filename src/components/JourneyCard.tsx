import React, { useState } from 'react';
import { MapPin, Calendar, Trash2, Edit, MoreVertical, Bookmark } from 'lucide-react';
import { JourneyEntry } from '../types';
import { useApp } from '../context/AppContext';
import JourneyForm from './JourneyForm';

interface JourneyCardProps {
  entry: JourneyEntry;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ entry }) => {
  const { deleteEntry } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(entry.id);
    }
  };

  if (isEditing) {
    return (
      <div className="animate-fadeIn">
        <JourneyForm entry={entry} onClose={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/20 dark:border-gray-700/30 hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 group overflow-hidden">
      <div className="relative">
        <div className="absolute right-0 top-0">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full transition-colors duration-300"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          
          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-800 py-1 z-10 animate-fadeIn">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Entry
              </button>
              <button
                onClick={handleDelete}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Entry
              </button>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white pr-8">{entry.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(entry.date)}</span>
          </div>
          
          {entry.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{entry.location}</span>
            </div>
          )}
          
          {entry.mood && (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
              {entry.mood}
            </div>
          )}
        </div>
      </div>
      
      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
        {entry.content.length > 200 
          ? `${entry.content.substring(0, 200)}...` 
          : entry.content}
      </div>
      
      {entry.content.length > 200 && (
        <button 
          className="mt-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium inline-flex items-center hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300"
          onClick={() => setIsEditing(true)}
        >
          <span>Read more</span>
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      )}
      
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-600/10 dark:bg-indigo-400/10 rounded-full transition-all duration-700 ease-in-out group-hover:scale-150"></div>
    </div>
  );
};

export default JourneyCard;