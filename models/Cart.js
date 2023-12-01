const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// TODO: create cart model
class Cart extends Model {}

Cart.init(
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
     },
     {
         sequelize,
         timestamps: false,
         freezeTableName: true,
         underscored: true,
         modelName: 'cart',
     }
 );
