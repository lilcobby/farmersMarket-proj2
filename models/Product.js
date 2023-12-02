// COMMENT: Required Dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {}

// COMMENT: Product Model
Product.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          name: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          description: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          price: {
               type: DataTypes.INTEGER,
               allowNull: false,
          },
          stock: {
               type: DataTypes.INTEGER,
               allowNull: false,
          },
          image_URL: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          categories: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          vendor_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: "vendor",
                    key: "id",
               },
          },
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "product",
     }
);

module.exports = Product;
