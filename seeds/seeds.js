const sequelize = require("../config/connection.js");
const { User, Vendor, Product, Cart, Sale, CartItem, SaleItem } = require("../models/index.js");
const userData = require("./userData.js");
const vendorData = require("./vendorData.js");
const productData = require("./productData.js");
const cartData = require("./cartData.js");
const saleData = require("./saleData.js");
const cartItemData = require("./cartItemData.js");
const saleItemData = require("./saleItemData.js");

const seedDatabase = async () => {
     try {
          await sequelize.sync({ force: true });

          for (let i = 0; i < userData.length; i++) {
               const newUser = await User.create(userData[i]);
          }

          for (let i = 0; i < vendorData.length; i++) {
               await Vendor.update(vendorData[i], {
                    where: {
                         id: vendorData[i].id,
                    },
               });
          }

          await Product.bulkCreate(productData, {
               individualHooks: true,
               returning: true,
          });

          await Sale.bulkCreate(saleData, {
               individualHooks: true,
               returning: true,
          });

          await CartItem.bulkCreate(cartItemData, {
               individualHooks: true,
               returning: true,
          });

          await SaleItem.bulkCreate(saleItemData, {
               individualHooks: true,
               returning: true,
          });

          console.log("Database seeded successfully.");

          process.exit(0);
     } catch (err) {
          console.log("❌ ~ file: seed.js ~ seedDatabase ~ err:", err);

          process.exit(0);
     }
};

seedDatabase();
