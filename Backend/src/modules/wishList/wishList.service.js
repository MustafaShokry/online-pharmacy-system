const User = require('../auth/user.model');
const Product = require('../product/product.model');
const AppError = require('../../utils/AppError');

const addToWishList = async function(userId, productId) {

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }
  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  // Check if the product is already in the user's wish addToWishList
  console.log(user.wishlist);
  const existingWishListItem = user.wishlist.find(product => product.toString() === productId.toString());
  if (existingWishListItem) {
    throw new AppError('Product already in wish list', 400);
  }
  // Add the product to the user's wish wishList
  user.wishlist.push(productId);
  await user.save();
  return user.wishlist;
}

const getWishList = async function(userId) {
  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  // Return the user's wish wishList
  return user.wishlist;
}

const removeFromWishList = async function(userId, productId) {

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check if the product is in the user's wish wishList
  const existingWishListItem = user.wishlist.find(product => product.toString() === productId.toString());
  if (!existingWishListItem) {
    throw new AppError('Product not found in wish list', 404);
  }
  // Remove the product from the user's wish wishList
  user.wishlist = user.wishlist.filter(product => product.toString() !== productId.toString());
  await user.save();
  return user.wishlist;
}

const clearWishList = async function(userId) {
  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  // Clear the user's wish wishList
  user.wishlist = [];
  await user.save();
  return user.wishlist;
}

module.exports.addToWishList = addToWishList;
module.exports.getWishList = getWishList;
module.exports.removeFromWishList = removeFromWishList;
module.exports.clearWishList = clearWishList;
