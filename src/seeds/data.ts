const names = [
  'John Doe', 'Jane Smith', 'Alice Johnson', 'Michael Brown', 
  'Emily Davis', 'Chris Wilson', 'Jessica Taylor', 'David Anderson'
];

const thoughts = [
  'This is a great day!',
  'I love coding!',
  'JavaScript is awesome!',
  'I need coffee to function.',
  'Learning new things is fun!',
  'I enjoy solving problems.',
  'What a beautiful sunset!',
  'Excited for the weekend!'
];

// New array for reactions
const reactions = [
  'Great thought!',
  'I totally agree!',
  'This is interesting.',
  'Can you elaborate more?',
  'I have a different perspective.',
  'Thanks for sharing!',
  'This resonates with me!',
  'I love this!'
];

export function getRandomName() {
  return names[Math.floor(Math.random() * names.length)];
}

export function getRandomThoughts() {
  return thoughts[Math.floor(Math.random() * thoughts.length)];
}

// New function to get random reactions
export function getRandomReaction() {
  return reactions[Math.floor(Math.random() * reactions.length)];
}