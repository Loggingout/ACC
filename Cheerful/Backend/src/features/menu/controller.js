// controller.js — menu HTTP handlers
const service = require('./services');
const { ok, created, noContent } = require('../../utils/response');
const { uploadBufferToCloudinary } = require('../../middleware/upload');

async function getCategories(req, res, next) {
  try {
    ok(res, await service.listCategories());
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    created(res, await service.createCategory(req.body));
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    ok(res, await service.updateCategory(req.params.slug, req.body));
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    await service.deleteCategory(req.params.slug);
    noContent(res);
  } catch (err) {
    next(err);
  }
}

async function getProductsByCategory(req, res, next) {
  try {
    const { category, products } = await service.listProductsByCategory(req.params.slug);
    ok(res, { category, products });
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    ok(res, await service.getProduct(req.params.id));
  } catch (err) {
    next(err);
  }
}

async function getAllProductsForAdmin(req, res, next) {
  try {
    ok(res, await service.listAllProductsForAdmin());
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const image = req.file ? (await uploadBufferToCloudinary(req.file.buffer)).secure_url : req.body.image;
    created(res, await service.createProduct({ ...req.body, image }));
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const image = req.file ? (await uploadBufferToCloudinary(req.file.buffer)).secure_url : undefined;
    ok(res, await service.updateProduct(req.params.id, { ...req.body, ...(image ? { image } : {}) }));
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await service.deleteProduct(req.params.id);
    noContent(res);
  } catch (err) {
    next(err);
  }
}

async function bulkUpdateCategoryProducts(req, res, next) {
  try {
    ok(res, await service.bulkUpdateProductsInCategory(req.params.slug, req.body));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
  getAllProductsForAdmin,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkUpdateCategoryProducts,
};
