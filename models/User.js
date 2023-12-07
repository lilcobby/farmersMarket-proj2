// COMMENT: Required Dependencies
const { Model, DataTypes } = require("sequelize");
const Cart = require("./Cart.js");
const Vendor = require("./Vendor.js");
const sequelize = require("../config/connection.js");
const bcrypt = require("bcrypt");

// COMMENT: Add a `checkPassword()` instance method
class User extends Model {
     checkPassword(loginPw) {
          return bcrypt.compareSync(loginPw, this.password);
     }
     async toggleVendor() {
          this.is_vendor = !this.is_vendor;
          if (this.is_vendor) {
               const vendor = await Vendor.findOne({ where: { user_id: this.id } });
               if (!vendor) {
                    await Vendor.create({ id: this.id, user_id: this.id });
               }
          }
          await this.save();
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
          is_vendor: {
               type: DataTypes.BOOLEAN,
               allowNull: false,
               defaultValue: true,
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

                    if (newUserData.is_vendor) {
                         await Vendor.create({ id: newUserData.id, user_id: newUserData.id, is_active: true });
                    }

                    if (!newUserData.is_vendor) {
                         await Vendor.create({ id: newUserData.id, user_id: newUserData.id, is_active: true });
                    }
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
