// COMMENT: Required Dependencies
const router = require("express").Router();
const { Cart, CartItem, Product } = require("../../models/index.js");
const productData = require("../../seeds/productData.js");

// COMMENT: Routes for the baseURL/api/cart endpoint

// COMMENT: finds all products that are associated with the user's cart
// [x]:  Works in Insomnia
router.get("/:id", async (req, res) => {
     // TODO: add withAuth middleware to the route once login homepage is working // FIXME: get rid of the parameter, leave it at '/' and use req.session.user_id instead below
     try {
          const cartData = await CartItem.findAll({
               where: { cart_id: req.params.id }, // FIXME: get rid of the parameter and use req.session.user_id instead
               include: [
                    {
                         model: Product,
                         attributes: ["name", "price", "image_url", "id"],
                    },
               ],
               attributes: ["quantity", "cart_id"],
          });
          if (cartData.length === 0) {
               res.status(404).json({ message: "Your cart is currently empty." });
               return;
          }
          res.status(200).json(cartData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Adds a product to the user's cart and sets the quantity or updates the quantity of the product in the user's cart if the product already exists in the cart
// [x]:  Works in Insomnia
router.post("/:id", async (req, res) => {
     // TODO: add withAuth middleware to the route once login homepage is working // FIXME: get rid of the parameter, leave it at '/' and use req.session.user_id instead below
     try {
          const existingCartItem = await CartItem.findOne({
               where: {
                    cart_id: req.params.id, // FIXME: get rid of the parameter and use req.session.user_id instead
                    product_id: req.body.product_id,
               },
          });

          if (existingCartItem) {
               const updateCart = await CartItem.update(
                    {
                         quantity: req.body.quantity,
                    },
                    {
                         where: {
                              cart_id: req.params.id, // FIXME: get rid of the parameter and use req.session.user_id instead
                              product_id: req.body.product_id,
                         },
                    }
               );

               const updatedProduct = await CartItem.findOne({
                    where: {
                         cart_id: req.params.id, // FIXME: get rid of the parameter and use req.session.user_id instead
                         product_id: req.body.product_id,
                    },
                    include: [
                         {
                              model: Product,
                              attributes: ["name"],
                         },
                    ],
               });

               res.status(200).json(
                    "The quantity of '" +
                         updatedProduct.dataValues.product.name +
                         "' in your cart is now " +
                         updatedProduct.quantity
               );
               return;
          }

          const createCartItem = await CartItem.create({
               cart_id: req.params.id, // FIXME: get rid of the parameter and use req.session.user_id instead
               product_id: req.body.product_id,
               quantity: req.body.quantity,
          });

          const updatedProduct = await CartItem.findOne({
               where: {
                    cart_id: req.params.id, // FIXME: get rid of the parameter and use req.session.user_id instead
                    product_id: req.body.product_id,
               },
               include: [
                    {
                         model: Product,
                         attributes: ["name"],
                    },
               ],
          });

          res.status(200).json(
               "You now have " +
                    updatedProduct.quantity +
                    " of '" +
                    updatedProduct.dataValues.product.name +
                    "' in your cart"
          );
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Deletes a product from the user's cart
// [x]:  Works in Insomnia
router.delete("/:id", async (req, res) => {
     // TODO: add withAuth middleware to the route once login homepage is working // FIXME: get rid of the parameter, leave it at '/' and use req.session.user_id instead below
     try {
          const existingCartItem = await CartItem.findOne({
               where: {
                    cart_id: req.params.id, // FIXME: get rid of the parameter and use req.session.user_id instead
                    product_id: req.body.product_id,
               },
          });

          if (!existingCartItem) {
               res.status(418).json("Product doesn't exist in your cart");
               return;
          }

          const deleteCartItem = await CartItem.destroy({
               where: {
                    cart_id: req.params.id, // FIXME: get rid of the parameter and use req.session.user_id instead
                    product_id: req.body.product_id,
               },
          });

          res.status(200).json("Product removed from cart");
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Deletes all products from the user's cart
// [x]:  Works in Insomnia
router.delete("/clear/:id", async (req, res) => {
     // TODO: add withAuth middleware to the route once login homepage is working // FIXME: get rid of the parameter, leave it at '/' and use req.session.user_id instead below
     try {
          const deleteCartItems = await CartItem.destroy({
               where: {
                    cart_id: req.params.id, // FIXME: get rid of the parameter and use req.session.user_id instead
               },
          });

          if (!deleteCartItems) {
               res.status(418).json("Cart is already empty");
               return;
          }
          res.status(200).json("Cart cleared");
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

module.exports = router;
