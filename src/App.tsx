import React, { useState } from 'react';
import JWTParser from './components/JWTParser';
import JWTGenerator from './components/JWTGenerator';

const App: React.FC = () => {
  const [view, setView] = useState<'parse' | 'generate'>('parse');

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${view === 'parse' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('parse')}
        >
          Parse Token
        </button>
        <button
          className={`px-4 py-2 rounded ${view === 'generate' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('generate')}
        >
          Generate Token
        </button>
      </div>
      {view === 'parse' ? <JWTParser /> : <JWTGenerator />}
    </div>
  );
};

export default App;