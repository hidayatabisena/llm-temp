import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PromptOption } from '../utils/tokenUtils';

interface PromptSelectorProps {
  promptOptions: PromptOption[];
  selectedPromptIndex: number;
  onSelectPrompt: (index: number) => void;
}

const PromptSelector: React.FC<PromptSelectorProps> = ({
  promptOptions,
  selectedPromptIndex,
  onSelectPrompt
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Prompt
      </label>
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-left flex justify-between items-center bg-white"
        >
          <span>{promptOptions[selectedPromptIndex].text}</span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {promptOptions.map((option, index) => (
              <button
                key={index}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                  index === selectedPromptIndex ? 'bg-gray-50' : ''
                }`}
                onClick={() => {
                  onSelectPrompt(index);
                  setIsDropdownOpen(false);
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptSelector;