// COMMENT: Required Dependencies
const Cart = require("./Cart.js");
const Product = require("./Product.js");
const Sale = require("./Sale.js");
const User = require("./User.js");
const Vendor = require("./Vendor.js");
const CartItem = require("./CartItem.js");
const SaleItem = require("./SaleItem.js");
const Category = require("./Category.js");

// COMMENT: Associations
Cart.belongsTo(User, {
     foreignKey: "user_id",
});

User.hasMany(Cart, {
     foreignKey: "user_id",
});

Product.belongsTo(Vendor, {
     foreignKey: "vendor_id",
});

Sale.belongsTo(Vendor, {
     foreignKey: "vendor_id",
});

Sale.belongsTo(User, {
     foreignKey: "user_id",
});

User.hasMany(Sale, {
     foreignKey: "user_id",
});

Vendor.hasMany(Product, {
     foreignKey: "vendor_id",
});

Vendor.hasMany(Sale, {
     foreignKey: "vendor_id",
});

Cart.hasMany(CartItem, {
     foreignKey: "cart_id",
});

CartItem.belongsTo(Cart, {
     foreignKey: "cart_id",
});

Product.hasMany(CartItem, {
     foreignKey: "product_id",
});

CartItem.belongsTo(Product, {
     foreignKey: "product_id",
});

Sale.hasMany(SaleItem, {
     foreignKey: "sale_id",
});

SaleItem.belongsTo(Sale, {
     foreignKey: "sale_id",
});

Product.hasMany(SaleItem, {
     foreignKey: "product_id",
});

SaleItem.belongsTo(Product, {
     foreignKey: "product_id",
});

Product.belongsToMany(Category, {
     through: "product_category",
     foreignKey: "product_id",
});

Category.belongsToMany(Product, {
     through: "product_category",
     foreignKey: "category_id",
});

Vendor.belongsTo(User, {
     foreignKey: "user_id",
});

User.hasOne(Vendor, {
     foreignKey: "user_id",
});

module.exports = { Cart, Product, Sale, User, Vendor, CartItem, SaleItem, Category };
