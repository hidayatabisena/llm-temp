import { PromptOption } from '../utils/tokenUtils';

export const promptOptions: PromptOption[] = [
  {
    text: "Roses are red, violets are...",
    tokens: [
      { token: "blue", probability: 0.315 },
      { token: "purple", probability: 0.1622 },
      { token: "violet", probability: 0.1374 },
      { token: "vio", probability: 0.13 },
      { token: "not", probability: 0.13 },
      { token: "red", probability: 0.1253 },
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