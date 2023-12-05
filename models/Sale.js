// COMMENT: Required Dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Sale extends Model {}

// COMMENT: Sale Model
Sale.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          vendor_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               onDelete: "CASCADE",
               references: {
                    model: "vendor",
                    key: "id",
               },
          },
          user_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               onDelete: "CASCADE",
               references: {
                    model: "user",
                    key: "id",
               },
          },
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "sale",
     }
);

module.exports = Sale;
