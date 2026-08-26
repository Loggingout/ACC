// services.js — menu categories + products
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const { AppError } = require('../../utils/errors');

function serializeProduct(product) {
  const obj = product.toObject({ flattenMaps: true });
  return obj;
}

async function listCategories() {
  return Category.find().sort({ sortOrder: 1, title: 1 });
}

async function getCategoryBySlug(slug) {
  const category = await Category.findOne({ slug: slug.toLowerCase() });
  if (!category) throw AppError.notFound(`Unknown menu category: ${slug}`);
  return category;
}

async function createCategory(data) {
  return Category.create(data);
}

async function updateCategory(slug, data) {
  const category = await Category.findOneAndUpdate({ slug: slug.toLowerCase() }, data, { new: true });
  if (!category) throw AppError.notFound(`Unknown menu category: ${slug}`);
  return category;
}

async function deleteCategory(slug) {
  const category = await getCategoryBySlug(slug);
  const productCount = await Product.countDocuments({ category: category._id });
  if (productCount > 0) {
    throw AppError.conflict('Move or delete this category\'s products before deleting it.');
  }
  await Category.deleteOne({ _id: category._id });
}

async function listProductsByCategory(slug) {
  const category = await getCategoryBySlug(slug);
  const products = await Product.find({ category: category._id, active: true }).sort({
    sortOrder: 1,
    name: 1,
  });
  return { category, products: products.map(serializeProduct) };
}

async function getProduct(id) {
  const product = await Product.findById(id);
  if (!product) throw AppError.notFound('Product not found');
  return serializeProduct(product);
}

async function listAllProductsForAdmin() {
  const categories = await listCategories();
  const products = await Product.find().sort({ category: 1, sortOrder: 1, name: 1 });
  const byCategory = new Map(categories.map((c) => [c._id.toString(), []]));
  for (const product of products) {
    const list = byCategory.get(product.category.toString());
    if (list) list.push(serializeProduct(product));
  }
  return categories.map((category) => ({
    category,
    products: byCategory.get(category._id.toString()) ?? [],
  }));
}

async function createProduct(data) {
  const category = await getCategoryBySlug(data.categorySlug);
  const product = await Product.create({ ...data, category: category._id });
  return serializeProduct(product);
}

async function updateProduct(id, data) {
  const update = { ...data };
  if (data.categorySlug) {
    const category = await getCategoryBySlug(data.categorySlug);
    update.category = category._id;
    delete update.categorySlug;
  }

  const product = await Product.findByIdAndUpdate(id, update, { new: true });
  if (!product) throw AppError.notFound('Product not found');
  return serializeProduct(product);
}

async function deleteProduct(id) {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw AppError.notFound('Product not found');
}

async function bulkUpdateProductsInCategory(slug, data) {
  const category = await getCategoryBySlug(slug);
  const result = await Product.updateMany({ category: category._id }, data);
  return { matched: result.matchedCount, modified: result.modifiedCount };
}

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  listProductsByCategory,
  listAllProductsForAdmin,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkUpdateProductsInCategory,
};
