const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sale extends Model {}

Sale.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          user_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: 'user',
                    key: 'id',
               },
          },
          product_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: 'product',
                    key: 'id',
               },
          },
          vendor_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: 'vendor',
                    key: 'id',
               },
          },
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'sale',
     }
);