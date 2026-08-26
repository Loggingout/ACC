// seedReviews.js — one-off script to populate the initial customer reviews.
// Usage: npm run seed:reviews
require('dotenv').config();
const mongoose = require('mongoose');
const env = require('../src/config/env');
const Review = require('../src/models/Review');

const REVIEWS = [
  {
    author: 'Katt B.',
    rating: 5,
    comment:
      'Sheila is as wonderful a business owner as they come! She is always cheerful, she remembers peoples names, and she makes damn good coffee every time! Specialty beans!!',
    source: 'Yelp',
  },
  {
    author: 'Matthew Overstreet',
    rating: 5,
    comment:
      'For those wondering, yes this place is inside the office building, and yes it is well worth your time to find it...',
    source: 'Google',
  },
  {
    author: 'Bri W.',
    rating: 5,
    comment: 'Great place to stop in for a delicious cup of coffee and a quick snack!',
    source: 'Google',
  },
];

async function run() {
  await mongoose.connect(env.mongoUri);

  for (const review of REVIEWS) {
    await Review.findOneAndUpdate({ author: review.author, comment: review.comment }, review, {
      upsert: true,
    });
  }

  console.log('Reviews seeded successfully.');
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
