// COMMENT: Required Dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Product = require("./Product");

class CartItem extends Model {}

// COMMENT: CartItem Model
CartItem.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          cart_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: "cart",
                    key: "id",
               },
          },
          product_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               onDelete: "CASCADE",
               references: {
                    model: "product",
                    key: "id",
               },
          },
          quantity: {
               type: DataTypes.INTEGER,
               allowNull: false,
               defaultValue: 1,
          },
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "cartItem",
          hooks: {
               // TODO: In future, change this to add and subtract from a field in the product table that keeps track of cart items that are in the cart so vendor knows how many items are in carts but still technically in stock
               afterCreate: async (cartItem, options) => {
                    const product = await Product.findByPk(cartItem.product_id);
                    product.stock -= cartItem.quantity;
                    await product.save();
               },
               afterUpdate: async (cartItem, options) => {
                    if (cartItem.quantity !== cartItem._previousDataValues.quantity) {
                         const product = await Product.findByPk(cartItem.product_id);
                         const quantityChange = cartItem._previousDataValues.quantity - cartItem.quantity;
                         product.stock += quantityChange;
                         await product.save();
                    }
               },
          },
     }
);

module.exports = CartItem;
