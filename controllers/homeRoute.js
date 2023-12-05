const router = require("express").Router();

const {
  User,
  Vendor,
  Product,
  Sale,
  Cart,
  CartItem,
  SaleItem,
  Category,
} = require("../models/index.js");

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
    const newData = productData.map((products) =>
      products.get({ plain: true })
    );
    console.log(newData);
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
      attributes: ["description", "name", "id", "image_URL"],
    });
    // Get a random vendor

    const randomVendor =
      vendorDataRd[Math.floor(Math.random() * vendorDataRd.length)];

    // Pass random vendor
    const user_id = req.session.user_id;
    const is_vendor = req.session.is_vendor;
    const logged_in = req.session.logged_in;
    res.render("consumerHome", {
      // serialize
      randomVendor: randomVendor.get({ plain: true }),
      user_id,
      logged_in,
      is_vendor,
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
    });

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

    res.render("consumerProd", { products });
  } catch (err) {
    res.status(500).json(err);
  }
});

// cart page? id maybe

// router.get("/cart/:id", async (req, res) => {
//   try {
//     const cartRaw = await Cart.findAll({
//       where: { user_id: req.params.id },
//       include: [
//         { model: CartItem, attributes: ["product_id", "cart_id"] },
//         {
//           model: Product,
//           attributes: ["name", "price", "id"],
//         },
//       ],
//     });

//     const cart = cartRaw.map((prod) => prod.get({ plain: true }));

//     res.render("cart", { cart });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
