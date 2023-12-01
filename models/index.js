const Cart = require("./Cart.js");
const Product = require("./Product.js");
const Sale = require("./Sale.js");
const User = require("./User.js");
const Vendor = require("./Vendor.js");
const CartItem = require("./CartItem.js");

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

module.exports = { Cart, Product, Sale, User, Vendor, CartItem };
