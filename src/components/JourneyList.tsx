import React from 'react';
import { useApp } from '../context/AppContext';
import JourneyCard from './JourneyCard';
import { BookOpen } from 'lucide-react';

const JourneyList: React.FC = () => {
  const { state } = useApp();
  const { entries } = state;

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/30 max-w-md mx-auto">
          <BookOpen className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Your journey begins here</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Start by adding your first entry above. Document your travels, thoughts, and experiences.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
      {entries.map((entry) => (
        <JourneyCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default JourneyList;