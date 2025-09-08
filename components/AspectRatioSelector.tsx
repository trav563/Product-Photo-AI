
import React from 'react';

interface AspectRatioSelectorProps {
  selectedRatio: string;
  onSelectRatio: (ratio: string) => void;
}

const RATIOS = [
  { label: '1:1', value: '1:1', icon: <div className="w-8 h-8 bg-gray-300 rounded-sm" /> },
  { label: '4:5', value: '4:5', icon: <div className="w-7 h-9 bg-gray-300 rounded-sm" /> },
  { label: '9:16', value: '9:16', icon: <div className="w-5 h-9 bg-gray-300 rounded-sm" /> },
  { label: '16:9', value: '16:9', icon: <div className="w-9 h-5 bg-gray-300 rounded-sm" /> },
];

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onSelectRatio }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">3. Choose Aspect Ratio</h2>
      <div className="grid grid-cols-4 gap-2">
        {RATIOS.map(ratio => (
          <button
            key={ratio.value}
            onClick={() => onSelectRatio(ratio.value)}
            className={`flex flex-col items-center justify-center space-y-2 p-2 rounded-lg transition-all duration-200 ${
              selectedRatio === ratio.value 
                ? 'bg-indigo-100 ring-2 ring-indigo-500' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-center h-10">{ratio.icon}</div>
            <span className={`text-xs font-medium ${selectedRatio === ratio.value ? 'text-indigo-700' : 'text-gray-600'}`}>
              {ratio.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
