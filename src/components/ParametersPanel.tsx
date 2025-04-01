import React from 'react';
import { Sliders } from 'lucide-react';
import ParameterSlider from './ParameterSlider';
import PromptSelector from './PromptSelector';
import { PromptOption } from '../utils/tokenUtils';

interface ParametersPanelProps {
  promptOptions: PromptOption[];
  selectedPromptIndex: number;
  temperature: number;
  topK: number;
  topP: number;
  onSelectPrompt: (index: number) => void;
  onTemperatureChange: (value: number) => void;
  onTopKChange: (value: number) => void;
  onTopPChange: (value: number) => void;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({
  promptOptions,
  selectedPromptIndex,
  temperature,
  topK,
  topP,
  onSelectPrompt,
  onTemperatureChange,
  onTopKChange,
  onTopPChange
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="w-5 h-5 text-gray-700" />
        <h2 className="text-xl font-semibold text-gray-800">Parameters</h2>
      </div>

      <PromptSelector
        promptOptions={promptOptions}
        selectedPromptIndex={selectedPromptIndex}
        onSelectPrompt={onSelectPrompt}
      />

      <div className="space-y-6">
        <ParameterSlider
          label="Temperature"
          value={temperature}
          min={0}
          max={2}
          step={0.01}
          tooltip="Mengatur seberapa random hasil prediksi. Makin tinggi nilainya, makin beragam outputnya."
          onChange={onTemperatureChange}
          formatValue={(val) => val.toFixed(2)}
        />

        <ParameterSlider
          label="Top-K"
          value={topK}
          min={1}
          max={10}
          step={1}
          tooltip="Ngebatasin distribusi probabilitas kumulatif ke top K token aja."
          onChange={onTopKChange}
        />

        <ParameterSlider
          label="Top-P"
          value={topP}
          min={0}
          max={1}
          step={0.01}
          tooltip="Nucleus sampling: Milih token yang probabilitas kumulatifnya melewati nilai P."
          onChange={onTopPChange}
          formatValue={(val) => val.toFixed(2)}
        />
      </div>
    </div>
  );
};

export default ParametersPanel;