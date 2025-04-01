export interface TokenProbability {
  token: string;
  probability: number;
}

export interface PromptOption {
  text: string;
  tokens: TokenProbability[];
}

// Utility functions for token probability calculations
export const applyTemperature = (probability: number, temperature: number): number => {
  if (temperature === 0) return probability;
  // Apply temperature scaling using the standard formula
  const logits = Math.log(probability / (1 - probability));
  const scaledLogits = logits / temperature;
  return 1 / (1 + Math.exp(-scaledLogits));
};

export const normalizeDistribution = (probabilities: number[]): number[] => {
  const sum = probabilities.reduce((a, b) => a + b, 0);
  return probabilities.map(p => p / sum);
};

export const applyTopK = (tokens: TokenProbability[], k: number): TokenProbability[] => {
  return [...tokens]
    .sort((a, b) => b.probability - a.probability)
    .slice(0, k)
    .map((token, _, array) => ({
      ...token,
      probability: token.probability / array.reduce((sum, t) => sum + t.probability, 0)
    }));
};

export const applyTopP = (tokens: TokenProbability[], p: number): TokenProbability[] => {
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