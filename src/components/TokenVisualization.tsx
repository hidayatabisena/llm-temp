import React from 'react';
import { TokenProbability } from '../utils/tokenUtils';

interface TokenVisualizationProps {
  tokens: TokenProbability[];
}

const TokenVisualization: React.FC<TokenVisualizationProps> = ({ tokens }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Next Token Probabilities</h2>
      <div className="space-y-3">
        {tokens.map((token, index) => (
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
  );
};

export default TokenVisualization;