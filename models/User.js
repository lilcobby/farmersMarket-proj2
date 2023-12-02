// COMMENT: Required Dependencies
const { Model, DataTypes } = require("sequelize");
const Cart = require("./Cart.js");
const sequelize = require("../config/connection.js");
const bcrypt = require("bcrypt");

// COMMENT: Add a `checkPassword()` instance method
class User extends Model {
     checkPassword(loginPw) {
          return bcrypt.compareSync(loginPw, this.password);
     }
}

// COMMENT: User Model
User.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true,
          },
          username: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
          },
          password: {
               type: DataTypes.STRING,
               allowNull: false,
          },
          email: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
               validate: {
                    isEmail: true,
               },
          },
     },
     {
          hooks: {
               beforeCreate: async (newUserData) => {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
               },
               beforeUpdate: async (updatedUserData) => {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                    return updatedUserData;
               },
               afterCreate: async (newUserData) => {
                    await Cart.create({ user_id: newUserData.id });
               },
          },
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: "user",
     }
);

module.exports = User;
