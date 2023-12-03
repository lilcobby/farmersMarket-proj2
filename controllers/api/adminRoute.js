const router = require("express").Router();
const { User, Vendor, Product, Sale, Cart, CartItem, SaleItem } = require("../../models/index.js");
const { isAdmin } = require("../../utils/auth.js");

// COMMENT: api/admin endpoint

// COMMENT: Route to get all users
// [x]: Works in Insomnia
router.get("/allUsers", async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const userData = await User.findAll();
          res.status(200).json(userData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all vendors
// [x]: Works in Insomnia
router.get("/allVendors", async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const vendorData = await Vendor.findAll();
          res.status(200).json(vendorData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all products
// [x]: Works in Insomnia
router.get("/allProducts", async (req, res) => {
     // TODO: add an isAdmin middleware to the route once login homepage is working or get rid of it
     try {
          const productData = await Product.findAll();
          res.status(200).json(productData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all sales by sale items
// [x]: Works in Insomnia
router.get("/allSales", async (req, res) => {
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
          res.status(200).json(saleItemData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get all carts by cart items
// [x]: Works in Insomnia
router.get("/allCarts", async (req, res) => {
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
          res.status(200).json(cartItemData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

module.exports = router;
