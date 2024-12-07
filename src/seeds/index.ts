import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandomName, getRandomThoughts, getRandomReaction } from './data.js';

const seedDatabase = async () => {
  try {
    await db(); // Connect to the database
    await cleanDB(); // Clean the database

    // Create empty arrays to hold users and thoughts
    const users = [];
    const thoughts = [];

    // Loop to create users
    for (let i = 0; i < 20; i++) {
      const fullName = getRandomName();
      const first = fullName.split(' ')[0];
      const last = fullName.split(' ')[1];
      const username = `${first.toLowerCase()}${Math.floor(Math.random() * 1000)}`;

      users.push({
        firstName: first,
        lastName: last,
        username,
        email: `${username}@example.com`,
        friends: [], // Initially no friends
      });
    }

    // Add users to the collection and await the results
    const userData = await User.create(users);

    // Loop to create thoughts
    for (let i = 0; i < 20; i++) {
      const thoughtText = getRandomThoughts();
      const randomUser = userData[Math.floor(Math.random() * userData.length)];

      // Check if randomUser is defined
      if (randomUser) {
        const userId = randomUser._id;

        // Create a random number of reactions for each thought
        const reactions = [];
        const numReactions = Math.floor(Math.random() * 5); // Randomly create 0 to 4 reactions

        for (let j = 0; j < numReactions; j++) {
          const reactionBody = getRandomReaction();
          const reactionUser = userData[Math.floor(Math.random() * userData.length)];

          reactions.push({
            reactionBody,
            username: reactionUser.username, // Use a random user's username
            createdAt: new Date(), // Set the current timestamp
          });
        }

        thoughts.push({
          thoughtText,
          username: randomUser.username,
          userId,
          reactions, // Include the generated reactions
        });
      }
    }

    // Add thoughts to the collection and await the results
    await Thought.create(thoughts);

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Export the seedDatabase function
export default seedDatabase;