const router = require("express").Router();
const { User, Vendor, Product, Sale, Cart, CartItem, SaleItem, Category } = require("../../models/index.js");
const { isAdmin, withAuth } = require("../../utils/auth.js");

// COMMENT: api/admin endpoint

// COMMENT: Route to get all users
// [x]: Works in Insomnia
router.get("/allUsers", isAdmin, async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const userData = await User.findAll();
          if (userData.length === 0) {
               res.status(404).json({ errMessage: "No users found" });
               return;
          }

          res.status(200).json(userData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all vendors
// [x]: Works in Insomnia
router.get("/allVendors", isAdmin, async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const vendorData = await Vendor.findAll();
          if (vendorData.length === 0) {
               res.status(404).json({ errMessage: "No vendors found" });
               return;
          }
          res.status(200).json(vendorData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all active vendors
// [x]: Works in Insomnia
router.get("/allActiveVendors", isAdmin, async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const vendorData = await Vendor.findAll({
               where: {
                    is_active: true,
               },
          });
          if (vendorData.length === 0) {
               res.status(404).json({ errMessage: "No active vendors found" });
               return;
          }
          res.status(200).json(vendorData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all products
// [x]: Works in Insomnia
router.get("/allProducts", isAdmin, async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const productData = await Product.findAll();
          if (productData.length === 0) {
               res.status(404).json({ errMessage: "No products found" });
               return;
          }

          res.status(200).json(productData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all active products
// [x]: Works in Insomnia
router.get("/allActiveProducts", isAdmin, async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const productData = await Product.findAll({
               where: {
                    is_active: true,
               },
          });
          if (productData.length === 0) {
               res.status(404).json({ errMessage: "No active products found" });
               return;
          }
          res.status(200).json(productData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all inactive products
// [x]: Works in Insomnia
router.get("/allInactiveProducts", isAdmin, async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const productData = await Product.findAll({
               where: {
                    is_active: false,
               },
          });
          if (productData.length === 0) {
               res.status(404).json({ errMessage: "No inactive products found" });
               return;
          }

          res.status(200).json(productData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all inactive vendors
// [x]: Works in Insomnia
router.get("/allInactiveVendors", isAdmin, async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const vendorData = await Vendor.findAll({
               where: {
                    is_active: false,
               },
          });
          if (vendorData.length === 0) {
               res.status(404).json({ errMessage: "No inactive vendors found" });
               return;
          }
          res.status(200).json(vendorData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all sales by sale items
// [x]: Works in Insomnia
router.get("/allSales", isAdmin, async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const saleItemData = await SaleItem.findAll({
               include: [
                    {
                         model: Product,
                         attributes: ["name"],
                         include: {
                              model: Vendor,
                              attributes: ["name"],
                         },
                    },
               ],
          });
          if (saleItemData.length === 0) {
               res.status(404).json({ errMessage: "No sales found" });
               return;
          }

          res.status(200).json(saleItemData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all carts by cart items
// [x]: Works in Insomnia
router.get("/allCartItems", isAdmin, async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const cartItemData = await CartItem.findAll({
               include: [
                    {
                         model: Product,
                         attributes: ["name"],
                         include: {
                              model: Vendor,
                              attributes: ["name"],
                         },
                    },
               ],
          });
          if (cartItemData.length === 0) {
               res.status(404).json({ errMessage: "No carts found" });
               return;
          }
          res.status(200).json(cartItemData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENt: Route to get all categories
// [x]: Works in Insomnia
router.get("/allCategories", isAdmin, async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const categoryData = await Category.findAll();
          if (categoryData.length === 0) {
               res.status(404).json({ errMessage: "No categories found" });
               return;
          }

          res.status(200).json(categoryData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// TODO: add a route to get all users and their carts
router.get("/allUsersAndCarts", isAdmin, async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const userData = await User.findAll({
               include: [
                    {
                         model: Cart,
                         include: [
                              {
                                   model: CartItem,
                                   include: [
                                        {
                                             model: Product,
                                             attributes: ["name"],
                                             include: {
                                                  model: Vendor,
                                                  attributes: ["name"],
                                             },
                                        },
                                   ],
                              },
                         ],
                    },
               ],
          });
          if (userData.length === 0) {
               res.status(404).json({ errMessage: "No users found" });
               return;
          }

          res.status(200).json(userData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

module.exports = router;
