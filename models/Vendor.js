// COMMENT: Required Dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// COMMENT: Vendor model

class Vendor extends Model {
     async toggleActive() {
          if (this.isActive) {
               this.isActive = false;
          } else {
               this.isActive = true;
          }
          await this.save();
     }
}

Vendor.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
          },
          name: {
               type: DataTypes.STRING,
               allowNull: true,
          },
          description: {
               type: DataTypes.STRING,
               allowNull: true,
          },
          image_URL: {
               type: DataTypes.STRING,
               allowNull: true,
          },
          user_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: "user",
                    key: "id",
               },
          },
          is_active: {
               type: DataTypes.BOOLEAN,
               allowNull: false,
               defaultValue: false,
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
