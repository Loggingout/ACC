// seedMenu.js — one-off script to populate categories + products in MongoDB.
// Usage: npm run seed:menu
require('dotenv').config();
const mongoose = require('mongoose');
const env = require('../src/config/env');
const Category = require('../src/models/Category');
const Product = require('../src/models/Product');

const STANDARD_MILKS = ['Whole', 'Oat', 'Almond', '2%', 'Non-Fat'];

const CATEGORIES = [
  { slug: 'coffee', title: 'Coffee', description: 'Espresso drinks, brewed coffee, and iced favorites.', sortOrder: 0 },
  { slug: 'lunch', title: 'Lunch', description: 'Burritos, hot dogs, tamales, and seasonal soups.', sortOrder: 1 },
  { slug: 'fridge', title: 'Fridge Items', description: 'Grab-and-go drinks, snacks, and salads.', sortOrder: 2 },
];

const coffeeMenu = [
  { name: 'Coffee', subCategory: 'Brewed Coffee', description: 'Freshly brewed coffee made from specialty beans.', prices: { small: 3.0, medium: 3.25, large: 3.5 }, seasonal: false, image: '/coffee.jpg' },
  { name: 'Café Au Lait', subCategory: 'Brewed Coffee', description: 'Coffee blended with steamed milk.', prices: { small: 3.25, medium: 3.5, large: 4.5 }, milkOptions: STANDARD_MILKS, seasonal: false, image: '/cafe-au-lait.jpg' },
  { name: 'Red Eye', subCategory: 'Espresso', description: 'Brewed coffee with a shot of espresso.', prices: { small: 3.5, medium: 4.0, large: 4.5 }, seasonal: false, image: '/red-eye.jpg' },
  { name: 'Americano', subCategory: 'Espresso', description: 'Espresso diluted with hot water.', prices: { small: 4.0, medium: 4.5, large: 5.0 }, seasonal: false, image: '/americano.jpg' },
  { name: 'Cappuccino / Latte', subCategory: 'Espresso', description: 'Espresso with steamed milk and light foam.', prices: { small: 4.0, medium: 5.0, large: 6.0 }, milkOptions: STANDARD_MILKS, seasonal: false, image: '/cappuccino-latte.jpg' },
  { name: 'Mocha', subCategory: 'Espresso', description: 'Chocolate espresso with steamed milk.', prices: { small: 4.5, medium: 5.5, large: 6.5 }, milkOptions: STANDARD_MILKS, seasonal: false, image: '/mocha.jpg' },
  { name: 'Caramel Macchiato', subCategory: 'Espresso', description: 'Espresso layered with milk and caramel.', prices: { small: 4.5, medium: 5.5, large: 6.5 }, milkOptions: STANDARD_MILKS, seasonal: false, image: '/caramel-macchiato.jpg' },
  { name: 'Chai Latte', subCategory: 'Espresso', description: 'Spiced chai blended with steamed milk.', prices: { small: 4.5, medium: 5.5, large: 6.5 }, milkOptions: STANDARD_MILKS, seasonal: false, image: '/chai-latte.jpeg' },
  { name: 'Italian Soda', subCategory: 'Iced Beverages', description: 'Sparkling soda flavored with syrup.', prices: { medium: 4.0, large: 4.5 }, seasonal: false, image: '/italian-soda.jpg' },
  { name: 'Caramel Frappe', subCategory: 'Iced Beverages', description: 'Blended iced caramel coffee.', prices: { medium: 5.5, large: 6.0 }, milkOptions: STANDARD_MILKS, seasonal: false, image: '/caramel-frappe.jpg' },
  { name: 'Green Tea Frappe', subCategory: 'Iced Beverages', description: 'Refreshing blended green tea.', prices: { medium: 5.5, large: 6.0 }, milkOptions: STANDARD_MILKS, seasonal: false, image: '/green-tea-frappe.jpg' },
  { name: 'Fruit Smoothie', subCategory: 'Iced Beverages', description: 'Blended fruit smoothie.', prices: { medium: 5.5, large: 6.0 }, seasonal: false, image: '/fruit-smoothie.jpg' },
  { name: 'Hot Spiced Apple Cider', subCategory: 'Specialty Drinks', description: 'Warm spiced apple cider.', prices: { small: 4.0, medium: 4.5, large: 5.0 }, seasonal: true, image: '/hot-spiced-apple-cider.jpeg' },
  { name: 'Hot Chocolate', subCategory: 'Specialty Drinks', description: 'Classic rich hot chocolate.', prices: { small: 4.0, medium: 4.5, large: 5.0 }, milkOptions: STANDARD_MILKS, seasonal: true, image: '/hot-chocolate.jpg' },
  { name: 'Joe To Go', subCategory: 'Specialty Drinks', description: 'Perfect for meetings and events.', prices: { oneSize: 20.0 }, seasonal: false, image: '/joe-to-go.jpg' },
];

const lunchMenu = [
  { name: 'Breakfast Burritos', description: 'A warm flour tortilla wrapped around fluffy eggs, melted cheese, and a savory filling of green chili creating a hearty, handheld breakfast that fuels your morning with comfort and flavor.', price: 5.0 },
  { name: 'Hot Dogs', description: 'A classic grilled hot dog nestled in a soft bun, topped with your favorite condiments for a simple, satisfying bite that never goes out of style.', price: 4.0 },
  { name: 'Tamales', description: 'Soft, steamed masa filled with savory meats or sweet traditional flavors, wrapped in a corn husk for a comforting, handcrafted taste of tradition.' },
  { name: 'Chicken Tortilla Soup', description: 'A hearty bowl of tender chicken, fire‑roasted tomatoes, and warm spices simmered to perfection, topped with crisp tortilla strips for a comforting, Southwest‑inspired classic.', availability: 'seasonal' },
  { name: 'Baked Potato Soup', description: 'A rich and creamy blend of tender potatoes, smoky bacon, and melted cheese, finished with a touch of green onion for the perfect cozy, homestyle bowl.', availability: 'seasonal' },
];

const fridgeMenu = [
  { name: 'Salads', price: 5.75 },
  { name: 'Salami Plates', price: 4.0 },
  { name: 'Balance Breaks', price: 2.0 },
  { name: 'Chobani Yogurt', price: 2.0 },
  { name: 'Red Bull', price: 3.0, type: 'Regular / Sugar Free' },
  { name: 'Jumex', price: 1.0 },
  { name: 'Water', price: 1.0 },
  { name: 'Arizona-Tea', price: 1.0 },
  { name: 'Apple Juice', price: 1.0 },
  { name: 'Nesquik', price: 1.0 },
  { name: 'Naked Juice', price: 2.5 },
  { name: 'Cranberry Juice', price: 2.5 },
  { name: 'Monster', price: 3.0 },
  { name: 'Alani', price: 2.5 },
  { name: 'Ice Sparkling Water', price: 2.5 },
  { name: 'V8 Energy Drink', price: 2.5 },
  { name: 'Pure Leaf Tea', price: 2.5 },
  { name: 'Sandwiches', price: 8.25 },
  { name: 'Celsius', price: 2.5 },
  { name: 'Sabra Smart Snackers', price: 2.0 },
];

async function run() {
  await mongoose.connect(env.mongoUri);

  const categoryBySlug = {};
  for (const data of CATEGORIES) {
    const category = await Category.findOneAndUpdate({ slug: data.slug }, data, {
      upsert: true,
      new: true,
    });
    categoryBySlug[data.slug] = category;
  }

  const productSets = [
    { slug: 'coffee', items: coffeeMenu },
    { slug: 'lunch', items: lunchMenu },
    { slug: 'fridge', items: fridgeMenu },
  ];

  for (const { slug, items } of productSets) {
    const category = categoryBySlug[slug];
    for (const item of items) {
      await Product.findOneAndUpdate(
        { name: item.name, category: category._id },
        { ...item, category: category._id },
        { upsert: true }
      );
    }
  }

  console.log('Menu seeded successfully.');
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
