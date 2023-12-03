// COMMENT: Required Dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SaleItem extends Model {}

// COMMENT: SaleItem Model
SaleItem.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          sale_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: "sale",
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
          modelName: "saleItem",
     }
);

module.exports = SaleItem;
