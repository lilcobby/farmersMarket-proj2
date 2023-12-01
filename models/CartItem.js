const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class CartItem extends Model {}

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
     }
);

module.exports = CartItem;
