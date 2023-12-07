const router = require("express").Router();

const { User, Vendor, Product, Sale, Cart, CartItem, SaleItem, Category } = require("../models/index.js");

const { withAuth } = require("../utils/auth.js");

// vendor home page
// what i need: vendor id, name, products, sales,

router.get("/profile", withAuth, async (req, res) => {
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
          res.render("vendorHome", { vendorData, logged_in, newData });
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// get request to /

router.get("/", async (req, res) => {
     try {
          const vendorDataRd = await Vendor.findAll({
               attributes: ["description", "name", "id", "image_url"],
               where: { is_active: true },
          });
          const productData = await Product.findAll({
               where: {
                    is_active: true,
               },
               include: [
                    {
                         model: Vendor,
                         attributes: ["name", "id", "image_url"],
                    },
               ],
          });

          const products = productData.map((products) => products.get({ plain: true }));

          console.log("products", products);
          // Get a random vendor
          const randomVendor = vendorDataRd[Math.floor(Math.random() * vendorDataRd.length)];
          const user_id = req.session.user_id;
          const is_vendor = req.session.is_vendor;
          const logged_in = req.session.logged_in;
          res.render("consumerHome", {
               // serialize
               randomVendor: randomVendor.get({ plain: true }), // Pass random vendor
               user_id,
               logged_in,
               is_vendor,
               products,
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

// all vendors

router.get("/vendors", async (req, res) => {
     try {
          const vendorData = await Vendor.findAll({
               attributes: ["description", "name", "id", "image_URL"],
               where: { is_active: true },
          });


    const vendors = vendorData.map((vendor) => vendor.get({ plain: true }));
    
    console.log("vendor data", vendors);

          const vendors = vendorData.map((vendor) => vendor.get({ plain: true }));

          console.log("vendor data", vendors);


          res.render("vendorList", {
               vendors,

               logged_in: req.session.logged_in,
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

// login

router.get("/login", async (req, res) => {
     if (req.session.logged_in) {
          res.redirect("/");

          return;
     }

     res.render("login");
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
router.get("/products/:id", async (req, res) => {
     try {
          const prodData = await Product.findAll({
               where: { vendor_id: req.params.id },

               attributes: ["name", "description", "price", "stock"],
          });

          const products = prodData.map((prod) => prod.get({ plain: true }));

          console.log(products);

          res.render("consumerProd", { products, logged_in: req.session.logged_in });
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

          res.render("cart", { cart, logged_in: req.session.logged_in });
     } catch (err) {
          res.status(500).json(err);
     }
});
router.get("/checkout", withAuth, async (req, res) => {
     res.render("checkout", { logged_in: req.session.logged_in });
});

module.exports = router;

router.get("/checkout", withAuth, async (req, res) => {
     res.render("checkout", { logged_in: req.session.logged_in });
});
