import React, { useState } from 'react';

interface ApiKeyManagerProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ apiKey, setApiKey }) => {
  const [localApiKey, setLocalApiKey] = useState('');
  const isKeySet = apiKey.length > 0;

  const handleSetKey = () => {
    setApiKey(localApiKey.trim());
  };

  const handleClearKey = () => {
    setApiKey('');
    setLocalApiKey('');
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        handleSetKey();
    }
  }

  if (isKeySet) {
    return (
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">API Key</h2>
        <div className="flex items-center justify-between bg-green-100 p-3 rounded-md">
          <p className="text-sm text-green-800 font-medium">API Key is set.</p>
          <button 
            onClick={handleClearKey}
            className="text-sm text-red-600 hover:text-red-800 font-semibold"
          >
            Change Key
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Enter Your Gemini API Key</h2>
      <div className="space-y-2">
        <p className="text-xs text-gray-500">
          You can get your own API key from{' '}
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
            Google AI Studio
          </a>.
        </p>
        <div className="flex space-x-2">
          <input
            type="password"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your API key"
            className="flex-grow block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="Gemini API Key"
          />
          <button
            onClick={handleSetKey}
            disabled={!localApiKey.trim()}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            Set Key
          </button>
        </div>
      </div>
    </div>
  );
};
