const Cart = require('./Cart');
const Product = require('./Product');
const Sale = require('./Sale');
const User = require('./User');
const Vendor = require('./Vendor');


User.hasOne(Cart, {
     foreignKey: 'user_id',
});

Cart.belongsTo(User, {
     foreignKey: 'user_id',
});

Product.belongsTo(Vendor, {
     foreignKey: 'vendor_id',
});

Sale.belongsTo(Vendor, {
     foreignKey: 'vendor_id',
});

Vendor.hasMany(Product, {
     foreignKey: 'vendor_id',
});

Vendor.hasMany(Sale, {
     foreignKey: 'vendor_id',
});

Vendor.belongsTo(User, {
     foreignKey: 'user_id',
});

Cart.hasMany(CartItem, {
     foreignKey: 'cart_id',
 });
 
 CartItem.belongsTo(Cart, {
     foreignKey: 'cart_id',
 });
 
 Product.hasMany(CartItem, {
     foreignKey: 'product_id',
 });
 
 CartItem.belongsTo(Product, {
     foreignKey: 'product_id',
 });


