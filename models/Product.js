// COMMENT: Required Dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {
     async toggleActive() {
          this.is_active = !this.is_active;
          await this.save();
     }
}

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
               type: DataTypes.DECIMAL(10, 2),
               allowNull: false,
          },
          stock: {
               type: DataTypes.INTEGER,
               allowNull: false,
          },
          image_url: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          category_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               defaultValue: 20,
               references: {
                    model: "category",
                    key: "id",
               },
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
          modelName: "product",
     }
);

module.exports = Product;
