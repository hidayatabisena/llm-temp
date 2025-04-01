import React, { useState, useMemo } from 'react';
import { Sliders, Info, ChevronDown } from 'lucide-react';

interface TokenProbability {
  token: string;
  probability: number;
}

interface PromptOption {
  text: string;
  tokens: TokenProbability[];
}

// Utility functions for token probability calculations
const applyTemperature = (probability: number, temperature: number): number => {
  if (temperature === 0) return probability;
  // Apply temperature scaling using the standard formula
  const logits = Math.log(probability / (1 - probability));
  const scaledLogits = logits / temperature;
  return 1 / (1 + Math.exp(-scaledLogits));
};

const normalizeDistribution = (probabilities: number[]): number[] => {
  const sum = probabilities.reduce((a, b) => a + b, 0);
  return probabilities.map(p => p / sum);
};

const applyTopK = (tokens: TokenProbability[], k: number): TokenProbability[] => {
  return [...tokens]
    .sort((a, b) => b.probability - a.probability)
    .slice(0, k)
    .map((token, _, array) => ({
      ...token,
      probability: token.probability / array.reduce((sum, t) => sum + t.probability, 0)
    }));
};

const applyTopP = (tokens: TokenProbability[], p: number): TokenProbability[] => {
  const sortedTokens = [...tokens].sort((a, b) => b.probability - a.probability);
  let cumulativeProb = 0;
  const selectedTokens: TokenProbability[] = [];

  for (const token of sortedTokens) {
    if (cumulativeProb >= p) break;
    selectedTokens.push(token);
    cumulativeProb += token.probability;
  }

  // Renormalize probabilities
  const totalProb = selectedTokens.reduce((sum, token) => sum + token.probability, 0);
  return selectedTokens.map(token => ({
    ...token,
    probability: token.probability / totalProb
  }));
};

function App() {
  const promptOptions: PromptOption[] = [
    {
      text: "Roses are red, violets are...",
      tokens: [
        { token: "blue", probability: 0.315 },
        { token: "purple", probability: 0.1622 },
        { token: "violet", probability: 0.1374 },
        { token: "vio", probability: 0.13 },
        { token: "not", probability: 0.13 },
        { token: "Blue", probability: 0.1253 },
        { token: "green", probability: 0 },
        { token: "gray", probability: 0 },
        { token: "grey", probability: 0 },
        { token: "black", probability: 0 }
      ]
    },
    {
      text: "Once upon a time, there was a...",
      tokens: [
        { token: "young", probability: 0.284 },
        { token: "man", probability: 0.187 },
        { token: "girl", probability: 0.156 },
        { token: "beautiful", probability: 0.142 },
        { token: "small", probability: 0.098 },
        { token: "little", probability: 0.089 },
        { token: "king", probability: 0 },
        { token: "woman", probability: 0 },
        { token: "child", probability: 0 },
        { token: "prince", probability: 0 }
      ]
    },
    {
      text: "The quick brown fox jumps over the lazy...",
      tokens: [
        { token: "dog", probability: 0.3108 },
        { token: "dogs", probability: 0.1487 },
        { token: "lazy", probability: 0.1433 },
        { token: "brown", probability: 0.1407 },
        { token: "cat", probability: 0.1283 },
        { token: "old", probability: 0.1283 },
        { token: "puppy", probability: 0 },
        { token: "snake", probability: 0 },
        { token: "rabbit", probability: 0 },
        { token: "fence", probability: 0 }
      ]
    },
    {
      text: "It was a dark and stormy night, the rain was falling and the wind was...",
      tokens: [
        { token: "howling", probability: 0.2856 },
        { token: "blowing", probability: 0.1934 },
        { token: "whipping", probability: 0.1645 },
        { token: "whistling", probability: 0.1487 },
        { token: "roaring", probability: 0.1234 },
        { token: "strong", probability: 0.0844 },
        { token: "fierce", probability: 0 },
        { token: "cold", probability: 0 },
        { token: "heavy", probability: 0 },
        { token: "wild", probability: 0 }
      ]
    },
    {
      text: "The sun was shining, the birds were singing, and the flowers were...",
      tokens: [
        { token: "blooming", probability: 0.2967 },
        { token: "beautiful", probability: 0.1834 },
        { token: "growing", probability: 0.1567 },
        { token: "bright", probability: 0.1345 },
        { token: "swaying", probability: 0.1123 },
        { token: "dancing", probability: 0.1164 },
        { token: "yellow", probability: 0 },
        { token: "red", probability: 0 },
        { token: "white", probability: 0 },
        { token: "fresh", probability: 0 }
      ]
    }
  ];

  const [temperature, setTemperature] = useState(0.68);
  const [topK, setTopK] = useState(6);
  const [topP, setTopP] = useState(1.0);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Calculate adjusted token probabilities based on parameters
  const adjustedTokens = useMemo(() => {
    let tokens = [...promptOptions[selectedPromptIndex].tokens];

    // Apply temperature
    tokens = tokens.map(token => ({
      ...token,
      probability: applyTemperature(token.probability, temperature)
    }));

    // Normalize after temperature adjustment
    const totalProb = tokens.reduce((sum, token) => sum + token.probability, 0);
    tokens = tokens.map(token => ({
      ...token,
      probability: token.probability / totalProb
    }));

    // Apply Top-K filtering
    tokens = applyTopK(tokens, topK);

    // Apply Top-P filtering
    tokens = applyTopP(tokens, topP);

    return tokens;
  }, [selectedPromptIndex, temperature, topK, topP]);

  return (
    <div className="min-h-screen bg-[#F7F6F3] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          LLM Parameter Visualization
        </h1>

        {/* Parameters Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Sliders className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-800">Parameters</h2>
          </div>

          {/* Prompt Dropdown */}
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
                        setSelectedPromptIndex(index);
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

          {/* Sliders */}
          <div className="space-y-6">
            {/* Temperature Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Temperature</label>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-gray-400" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      Controls the randomness of predictions. Higher values make the output more diverse.
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.01"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Top-K Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Top-K</label>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-gray-400" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      Limits the cumulative probability distribution to top K tokens.
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{topK}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={topK}
                onChange={(e) => setTopK(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Top-P Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Top-P</label>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-gray-400" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      Nucleus sampling: select tokens whose cumulative probability exceeds P.
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{topP.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={topP}
                onChange={(e) => setTopP(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Visualization Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Next Token Probabilities</h2>
          <div className="space-y-3">
            {adjustedTokens.map((token, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 text-sm font-mono">{token.token}</div>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{
                      width: `${token.probability * 100}%`,
                      opacity: token.probability > 0 ? 1 : 0.3
                    }}
                  />
                </div>
                <div className="w-24 text-right text-sm text-gray-600">
                  {(token.probability * 100).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-[#F1EFEB] rounded-xl p-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            This visualization shows the probabilities for the top 10 most likely next tokens for the selected prompt, 
            and how those probabilities are affected by changing the temperature and top-k parameters. The data shown 
            is from Gemma 3 1B model but is currently static for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;