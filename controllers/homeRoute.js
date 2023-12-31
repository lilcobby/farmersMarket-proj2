const router = require("express").Router();
const { User, Vendor, Product, Sale, Cart, CartItem, SaleItem, Category } = require("../models/index.js");
const { withAuth, isVendor, fetchCart } = require("../utils/auth.js");

router.get("/profile", withAuth, isVendor, fetchCart, async (req, res) => {
     try {
          const vendorData = await Vendor.findOne({
               where: { user_id: req.session.user_id },
          });
          if (!vendorData) {
               res.status(404).json({ message: "You are not a vendor." });
               return;
          }
          const productData = await Product.findAll({
               where: { vendor_id: req.session.user_id },
          });
          const newData = productData.map((products) => products.get({ plain: true }));

          const logged_in = req.session.logged_in;
          const is_vendor = req.session.is_vendor;
          const { name, description, image_url, user_id } = vendorData;
          res.render("vendorHome", {
               user_id,
               name,
               description,
               image_url,
               logged_in,
               newData,
               is_vendor,
               cart: req.cart,
          });
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// get request to /

router.get("/", fetchCart, async (req, res) => {
     console.log("req.cart:", req.cart);
     try {
          const vendorDataRd = await Vendor.findAll({
               attributes: ["description", "name", "id", "image_url"],
               // where: { is_active: true },
          });
          const productData = await Product.findAll({
               // where: {
               //      is_active: true,
               // },
               include: [
                    {
                         model: Vendor,
                         attributes: ["name", "id", "image_url"],
                    },
               ],
          });

          const products = productData.map((products) => products.get({ plain: true }));

          // Get a random vendor
          const randomVendor = vendorDataRd[Math.floor(Math.random() * vendorDataRd.length)];
          const user_id = req.session.user_id;
          const is_vendor = req.session.is_vendor;
          const logged_in = req.session.logged_in;
          res.render("consumerHome", {
               // serialize
               randomVendor: randomVendor.get({ plain: true }), // Pass random vendor
               products,
               user_id,
               logged_in,
               is_vendor,
               cart: req.cart, // Pass cart items
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

// all vendors

router.get("/vendors", fetchCart, async (req, res) => {
     try {
          const vendorData = await Vendor.findAll({
               attributes: ["description", "name", "id", "image_URL"],
               // where: { is_active: true },
          });

          const vendors = vendorData.map((vendor) => vendor.get({ plain: true }));

          res.render("vendorList", {
               vendors,
               is_vendor: req.session.is_vendor,
               logged_in: req.session.logged_in,
               cart: req.cart,
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

// login

router.get("/login", fetchCart, async (req, res) => {
     if (req.session.logged_in) {
          res.redirect("/");

          return;
     }

     res.render("login", { logged_in: req.session.logged_in, cart: req.cart });
});

// if we want an all products page

// router.get("/products", async (req, res) => {
//     try {
//       const prodData = await Product.findAll({

//         attributes: ["name", "description", "price", "stock", "vendor_id"],
//       });

//       const products = prodData.map((prod) => prod.get({ plain: true }));
//       console.log(products);
//       res.render("consumerProd", { products });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// reroute to products owned by vendor
// FIXME: change this route to vendor/:vendorName/products or at least vendor/:vendorId/products
router.get("/products/:id", fetchCart, async (req, res) => {
     try {
          const productData = await Product.findAll({
               where: {
                    // is_active: true,
                    vendor_id: req.params.id,
               },
               include: [
                    {
                         model: Vendor,
                         attributes: ["name", "id", "image_url"],
                    },
               ],
          });

          const products = productData.map((products) => products.get({ plain: true }));

          const user_id = req.session.user_id;
          const is_vendor = req.session.is_vendor;
          const logged_in = req.session.logged_in;
          res.render("consumerProd", {
               products,
               user_id,
               logged_in,
               is_vendor,
               cart: req.cart,
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

// cart page? id maybe

router.get("/cart", withAuth, async (req, res) => {
     try {
          const cartData = await CartItem.findAll({
               where: { cart_id: req.session.user_id },
               include: [
                    {
                         model: Product,
                         attributes: ["name", "price", "image_url", "id"],
                    },
               ],
               attributes: ["quantity", "cart_id"],
          });

          const cart = cartData.map((prod) => prod.get({ plain: true }));

          res.render("cart", {
               cart,
               logged_in: req.session.logged_in,
               is_vendor: req.session.is_vendor,
          });
     } catch (err) {
          res.status(500).json(err);
     }
});
router.get("/checkout", withAuth, fetchCart, async (req, res) => {
     res.render("checkout", {
          logged_in: req.session.logged_in,
          cart: req.cart,
     });
});
// last screen
router.get("/final", withAuth, fetchCart, async (req, res) => {
     res.render("final", {
          logged_in: req.session.logged_in,
          cart: req.cart,
     });
});

// TODO: render sales page
router.get("/vendors/sales", withAuth, fetchCart, async (req, res) => {
     try {
          const vendorData = await Vendor.findOne({
               where: { user_id: req.session.user_id },
          });
          if (!vendorData) {
               res.status(404).json({ message: "You are not a vendor." });
               return;
          }
          const saleData = await Sale.findAll({
               where: { vendor_id: vendorData.id },
               include: [
                    {
                         model: SaleItem,
                         include: [
                              {
                                   model: Product,
                                   attributes: ["name", "description", "price", "stock", "image_url"],
                              },
                         ],
                    },
               ],
          });
          if (saleData.length === 0) {
               res.status(404).json({ message: "You have no sales." });
               return;
          }
          const sales = saleData.map((sale) => sale.get({ plain: true }));
          res.render("sales", {
               sales,
               logged_in: req.session.logged_in,
               is_vendor: (req.session.is_vendor = true),
               cart: req.cart,
          });
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

module.exports = router;
