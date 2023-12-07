const { CartItem, Product } = require("../models/index.js");

// COMMENT: helper function to check if the user is logged in
const withAuth = (req, res, next) => {
     // If the user is not logged in, redirect the request to the login route
     if (!req.session.logged_in) {
          res.redirect("/login");
     } else {
          next();
     }
};

function isAdmin(req, res, next) {
     if (req.session.is_admin) {
          next(); // If the user is an admin, proceed to the next middleware or route handler
     } else {
          res.status(403).json({ message: "Forbidden: You do not have the necessary permissions" });
     }
}

function isVendor(req, res, next) {
     console.log("isVendor check:", req.session.is_vendor);
     console.log("session:", req.session.is_Vendor);
     if (req.session.is_vendor) {
          next(); // If the user is a vendor, proceed to the next middleware or route handler
     } else {
          res.redirect("/");
     }
}
async function fetchCart(req, res, next) {
     try {
          if (!req.session.user_id) {
               return next();
          }
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
          // Attach the cart data to req.cart
          req.cart = cartData.map((item) => item.get({ plain: true }));

          // Call the next middleware/route handler
          next();
     } catch (err) {
          // Handle the error
          console.error(err);
          res.status(500).json({ error: "Failed to fetch cart data" });
     }
}

// COMMENT: export the function
module.exports = { withAuth, isAdmin, isVendor, fetchCart };
