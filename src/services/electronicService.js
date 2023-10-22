const Electronic = require("../models/Electronic.js");

exports.create = (electronicData) => {
  return Electronic.create(electronicData);
};

exports.getAll = () => Electronic.find();

exports.getSingle = (productId) => {
  const product = Electronic.findById(productId);
  return product;
};

exports.delete = (productId) => Electronic.findByIdAndDelete(productId);

exports.update = (productId, product) => {
  const updatedProduct = Electronic.findByIdAndUpdate(productId, product, {
    new: true,
    runValidators: true,
  });
  return updatedProduct;
};

exports.buy = async (productId, user) => {
  try {
    const product = await Electronic.findById(productId);
    product.buyingList.push(user);
    return product.save();
  } catch (err) {
    throw new Error(err);
  }
};

exports.search = (name, type) => {
  if (name || type) {
    return Electronic.find({
      name: { $regex: name, $options: "i" },
      type: { $regex: type, $options: "i" },
    }).lean()
  }
};
