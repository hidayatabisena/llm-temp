import React, { useState, useMemo } from 'react';
import { applyTemperature, applyTopK, applyTopP } from './utils/tokenUtils';
import { promptOptions } from './data/promptOptions';
import ParametersPanel from './components/ParametersPanel';
import TokenVisualization from './components/TokenVisualization';
import InfoCard from './components/InfoCard';

function App() {
  const [temperature, setTemperature] = useState(0.68);
  const [topK, setTopK] = useState(6);
  const [topP, setTopP] = useState(1.0);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);

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

        <ParametersPanel
          promptOptions={promptOptions}
          selectedPromptIndex={selectedPromptIndex}
          temperature={temperature}
          topK={topK}
          topP={topP}
          onSelectPrompt={setSelectedPromptIndex}
          onTemperatureChange={setTemperature}
          onTopKChange={setTopK}
          onTopPChange={setTopP}
        />

        <TokenVisualization tokens={adjustedTokens} />

        <InfoCard />
      </div>
    </div>
  );
}

export default App;