const User = require('../auth/user.model');
const Product = require('../product/product.model');
const AppError = require('../../utils/AppError');

const addAlternative = async function(productId, alternativeProductId) {
  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  // Check if the alternative product exists
  const alternativeProduct = await Product.findById(alternativeProductId);
  if (!alternativeProduct) {
    throw new AppError('Alternative product not found', 404);
  }
  // Check if the product is already in the product's alternatives
  const existingAlternative = product.alternatives.find(alternative => alternative.toString() === alternativeProductId.toString());
  if (existingAlternative) {
    throw new AppError('Alternative product already exists', 400);
  }
  // Add the alternative product to the product's alternatives
  product.alternatives.push(alternativeProductId);
  await product.save();
  return product.alternatives;
}

const deleteAlternative = async function(productId, alternativeProductId) {
  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  // Check if the alternative product exists
  const alternativeProduct = await Product.findById(alternativeProductId);
  if (!alternativeProduct) {
    throw new AppError('Alternative product not found', 404);
  }
  // Check if the alternative product is in the product's alternatives
  const existingAlternative = product.alternatives.find(alternative => alternative.toString() === alternativeProductId.toString());
  if (!existingAlternative) {
    throw new AppError('Alternative product not found in product alternatives', 404);
  }
  // Remove the alternative product from the product's alternatives
  product.alternatives = product.alternatives.filter(alternative => alternative.toString() !== alternativeProductId.toString());
  await product.save();
}

module.exports = {
  addAlternative,
  deleteAlternative,
}

