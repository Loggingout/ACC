//Menu file for JavaScript functions related to menu interactions

//Coffee menu
const coffeeMenu = [
  {
    id: 'coffee',
    name: 'Coffee',
    category: 'Brewed Coffee',
    description: 'Freshly brewed coffee made from specialty beans.',
    prices: {
      small: 3.00,
      medium: 3.25,
      large: 3.50
    },
    seasonal: false,
    image: '/Assets/coffee.jpg'
  },
  {
    id: 'cafe-au-lait',
    name: 'Café Au Lait',
    category: 'Brewed Coffee',
    description: 'Coffee blended with steamed milk.',
    prices: {
      small: 3.25,
      medium: 3.50,
      large: 4.50
    },
    seasonal: false,
    image: '/Assets/cafe-au-lait.jpg'
  },

  {
    id: 'red-eye',
    name: 'Red Eye',
    category: 'Espresso',
    description: 'Brewed coffee with a shot of espresso.',
    prices: {
      small: 3.50,
      medium: 4.00,
      large: 4.50
    },
    seasonal: false,
    image: '/Assets/red-eye.jpg'
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'Espresso',
    description: 'Espresso diluted with hot water.',
    prices: {
      small: 4.00,
      medium: 4.50,
      large: 5.00
    },
    seasonal: false,
    image: '/Assets/americano.jpg'
  },
  {
    id: 'latte',
    name: 'Cappuccino / Latte',
    category: 'Espresso',
    description: 'Espresso with steamed milk and light foam.',
    prices: {
      small: 4.00,
      medium: 5.00,
      large: 6.00
    },
    seasonal: false,
    image: '/Assets/cappuccino-latte.jpg'
  },
  {
    id: 'mocha',
    name: 'Mocha',
    category: 'Espresso',
    description: 'Chocolate espresso with steamed milk.',
    prices: {
      small: 4.50,
      medium: 5.50,
      large: 6.50
    },
    seasonal: false,
    image: '/Assets/mocha.jpg'
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    category: 'Espresso',
    description: 'Espresso layered with milk and caramel.',
    prices: {
      small: 4.50,
      medium: 5.50,
      large: 6.50
    },
    seasonal: false,
    image: '/Assets/caramel-macchiato.jpg'
  },
  {
    id: 'chai-latte',
    name: 'Chai Latte',
    category: 'Espresso',
    description: 'Spiced chai blended with steamed milk.',
    prices: {
      small: 4.50,
      medium: 5.50,
      large: 6.50
    },
    seasonal: false,
    image: '/Assets/chai-latte.jpeg'
  },

  {
    id: 'italian-soda',
    name: 'Italian Soda',
    category: 'Iced Beverages',
    description: 'Sparkling soda flavored with syrup.',
    prices: {
      medium: 4.00,
      large: 4.50
    },
    seasonal: false,
    image: '/Assets/italian-soda.jpg'
  },
  {
    id: 'caramel-frappe',
    name: 'Caramel Frappe',
    category: 'Iced Beverages',
    description: 'Blended iced caramel coffee.',
    prices: {
      medium: 5.50,
      large: 6.00
    },
    seasonal: false,
    image: '/Assets/caramel-frappe.jpg'
  },
  {
    id: 'green-tea-frappe',
    name: 'Green Tea Frappe',
    category: 'Iced Beverages',
    description: 'Refreshing blended green tea.',
    prices: {
      medium: 5.50,
      large: 6.00
    },
    seasonal: false,
    image: '/Assets/green-tea-frappe.jpg'
  },
  {
    id: 'fruit-smoothie',
    name: 'Fruit Smoothie',
    category: 'Iced Beverages',
    description: 'Blended fruit smoothie.',
    prices: {
      medium: 5.50,
      large: 6.00
    },
    seasonal: false,
    image: '/Assets/fruit-smoothie.jpg'
  },

  {
    id: 'hot-apple-cider',
    name: 'Hot Spiced Apple Cider',
    category: 'Specialty Drinks',
    description: 'Warm spiced apple cider.',
    prices: {
      small: 4.00,
      medium: 4.50,
      large: 5.00
    },
    seasonal: true,
    image: '/Assets/hot-spiced-apple-cider.jpeg'
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    category: 'Specialty Drinks',
    description: 'Classic rich hot chocolate.',
    prices: {
      small: 4.00,
      medium: 4.50,
      large: 5.00
    },
    seasonal: true,
    image: '/Assets/hot-chocolate.jpg'
  },
  {
    id: 'joe-to-go',
    name: 'Joe To Go',
    category: 'Specialty Drinks',
    description: 'Perfect for meetings and events.',
    prices: {
      oneSize: 20.00
    },
    seasonal: false,
    image: '/Assets/joe-to-go.jpg'
  }
];


//Flavor Types
const flavorTypes = [
    {
        name: 'Caramel',
        sugar_type: 'Regular / Sugar Free'
    },
    {
        name: 'Chocolate',
        sugar_type: ''
    },
    {
        name: 'English Toffee',
        sugar_type: ''
    },
    {
        name: 'Hazelnut',
        sugar_type: 'Regular / Sugar Free'
    },
    {
        name: 'Irish Cream',
        sugar_type: ''
    },
    {
        name: 'Mint',
        sugar_type: ''
    },
    {
        name: 'Salted Caramel',
        sugar_type: ''
    },
    {
        name: 'Toasted Marshmallow',
        sugar_type: ''
    },
    {
        name: 'French Vanilla',
        sugar_type: 'Regular / Sugar Free'
    },
    {
        name: 'White Chocolate',
        sugar_type: ''
    },
]

//Lunch Menu

const lunchMenu = [
    {
        name: 'Breakfast Burritos',
        description: 'A warm flour tortilla wrapped around fluffy eggs, melted cheese, and a savory filling of green chili creating a hearty, handheld breakfast that fuels your morning with comfort and flavor.',
        price: '$5.00'
    },
    {
        name: 'Hot Dogs',
        description: 'A classic grilled hot dog nestled in a soft bun, topped with your favorite condiments for a simple, satisfying bite that never goes out of style.',
        price: null
    },
    {
        name: 'Tamales',
        description: 'Soft, steamed masa filled with savory meats or sweet traditional flavors, wrapped in a corn husk for a comforting, handcrafted taste of tradition.',
        price: null
    },
    {
        name: 'Chicken Tortilla Soup',
        description: 'A hearty bowl of tender chicken, fire‑roasted tomatoes, and warm spices simmered to perfection, topped with crisp tortilla strips for a comforting, Southwest‑inspired classic.',
        availability: 'seasonal',
        price: null
    },
    {
        name: 'Baked Potato Soup',
        description: 'A rich and creamy blend of tender potatoes, smoky bacon, and melted cheese, finished with a touch of green onion for the perfect cozy, homestyle bowl.',
        availability: 'seasonal',
        price: null
    },
]

//Fridge Menu items

const fridgeMenu = [
    {
        name: 'Ceasar Salad',
        price: '$5.25'
    },
    {
        name: 'Salami Plates',
        price: '$4.00'
    },
    {
        name: 'Balance Breaks',
        price: '$2.00'
    },
    {
        name: 'Chobani Yogurt',
        price: '$2.00'
    },
    {
        name: 'Red Bull',
        price: '$3.00',
        type: 'Regular / Sugar Free'
    },
    {
        name: 'Hard Boiled Egg',
        price: '$1.50'
    },
    {
        name: 'Jumex',
        price: '$1.00'
    },
    {
        name: 'Water',
        price: '$1.00'
    },
    {
        name: 'Arizona-Tea',
        price: '$1.00'
    },
    {
        name: 'Apple Juice',
        price: '$1.00'
    },
    {
        name: 'Nesquik',
        price: '$1.00'
    },
    {
        name: 'Naked Juice',
        price: '$2.50'
    },
    {
        name: 'Cranberry Juice',
        price: '$2.50'
    },
    {
        name: 'Monster',
        price: '$3.00'
    },
    {
        name: 'Alani',
        price: '$2.50'
    },
    {
        name: 'Ice Sparkling Water',
        price: '$2.50'
    },
    {
        name: 'V8 Energy Drink',
        price: '$2.50'
    },
    {
        name: 'Pure Leaf Tea',
        price: '$2.50'
    },
    {
        name: 'Ham Sandwiches',
        price: '$8.25'
    },
    {
        name: 'Celsius',
        price: '$2.50'
    },
    {
        name: 'Sabra Smart Snackers',
        price: '$2.50'
    }
]