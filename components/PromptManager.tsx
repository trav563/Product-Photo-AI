
import React, { useState } from 'react';
import { XCircleIcon } from './icons/XCircleIcon.tsx';

interface PromptManagerProps {
  prompts: string[];
  setPrompts: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PromptManager: React.FC<PromptManagerProps> = ({ prompts, setPrompts }) => {
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleAddPrompt = () => {
    if (currentPrompt.trim() && !prompts.includes(currentPrompt.trim())) {
      setPrompts(prev => [...prev, currentPrompt.trim()]);
      setCurrentPrompt('');
    }
  };

  const handleRemovePrompt = (promptToRemove: string) => {
    setPrompts(prev => prev.filter(p => p !== promptToRemove));
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        handleAddPrompt();
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">2. Add Enhancement Prompts</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={currentPrompt}
          onChange={(e) => setCurrentPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., on a marble surface"
          className="flex-grow block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          onClick={handleAddPrompt}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {prompts.map((prompt, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
            <p className="text-sm text-gray-700 truncate">{prompt}</p>
            <button onClick={() => handleRemovePrompt(prompt)} className="text-gray-400 hover:text-gray-600">
              <XCircleIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};