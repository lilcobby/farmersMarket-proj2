// COMMENT: Required Dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Product = require("./Product.js");

// COMMENT: Vendor model

class Vendor extends Model {
     async toggleActive() {
          this.is_active = !this.is_active;
          await this.save();

          if (!this.is_active) {
               const products = await Product.findAll({ where: { vendor_id: this.id } });
               for (let product of products) {
                    product.is_active = this.is_active;
                    await product.save();
               }
          }
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
          image_url: {
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
               defaultValue: true,
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
