// Product.js — a single menu item, belonging to a Category
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    // optional label grouping items within a category (e.g. "Espresso", "Iced Beverages")
    subCategory: { type: String, trim: true },
    description: { type: String, trim: true },
    // Sized items use `prices` (e.g. { small: 3, medium: 3.5 }); single-price items use `price`.
    prices: { type: Map, of: Number },
    price: { type: Number },
    milkOptions: { type: [String], default: undefined },
    sugarOptions: { type: [String], default: undefined },
    flavorOptions: { type: [String], default: undefined },
    temperatureOptions: { type: [String], default: undefined },
    // condiments/ingredients (e.g. lunch/fridge items: lettuce, mustard, mayo)
    condiments: { type: [String], default: undefined },
    type: { type: String, trim: true },
    seasonal: { type: Boolean, default: false },
    limitedTime: { type: Boolean, default: false },
    availability: { type: String, trim: true },
    image: { type: String, trim: true },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
