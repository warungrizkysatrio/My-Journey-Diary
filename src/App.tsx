import React from 'react';
import Layout from './components/Layout';
import JourneyForm from './components/JourneyForm';
import JourneyList from './components/JourneyList';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Layout>
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
              Capture Your Journey
            </h2>
            <JourneyForm />
          </div>
          <JourneyList />
        </div>
      </Layout>
    </AppProvider>
  );
}

export default App;