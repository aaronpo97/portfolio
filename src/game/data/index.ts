import Card from '../types/Card';

export const funFacts = [
  'My favorite color is #81D8D0',
  'I can speak French (although not very well, but I try my best).',
  'Maangchi is my favorite cooking YouTuber.',
  'Exploring new places is a passion of mine; recently, I traveled to the Pacific Northwest (Oregon, Washington).',
  'Oranges are my favorite fruit.',
  'I have a soft spot for orange tabby cats; they are just too cute.',
];
export const cardContent: Card[] = ['🍍', '🥝', '🍉', '🍎', '🍑', '🍓', '🍌', '🍇'].map(
  (emoji) => ({
    emoji,
    matched: false,
  }),
);
