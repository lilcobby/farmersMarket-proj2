const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// COMMENT: Vendor model

class Vendor extends Model {}

Vendor.init(
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
          image_URL: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          user_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
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
          modelName: "vendor",
     }
);

module.exports = Vendor;
