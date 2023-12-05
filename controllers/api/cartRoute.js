// COMMENT: Required Dependencies
const router = require("express").Router();
const { CartItem, Product, Sale, SaleItem, User, Vendor } = require("../../models/index.js");
const { withAuth } = require("../../utils/auth.js");

// COMMENT: Routes for the baseURL/api/cart endpoint

// COMMENT: finds all products that are associated with the user's cart
// [x]:  Works in Insomnia
router.get("/", withAuth, async (req, res) => {
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
router.post("/", withAuth, async (req, res) => {
     try {
          const existingCartItem = await CartItem.findOne({
               where: {
                    cart_id: req.session.user_id,
                    product_id: req.body.product_id,
               },
          });

          const product = await Product.findByPk(req.body.product_id);

          if (existingCartItem) {
               const quantityChange = req.body.quantity - existingCartItem.quantity;
               if (product.stock < quantityChange) {
                    res.status(418).json("Not enough stock to add that many to your cart");
                    return;
               }

               product.stock -= quantityChange;
               await product.save();

               const updateCart = await CartItem.update(
                    {
                         quantity: req.body.quantity,
                    },
                    {
                         where: {
                              cart_id: req.session.user_id,
                              product_id: req.body.product_id,
                         },
                    }
               );

               const updatedProduct = await CartItem.findOne({
                    where: {
                         cart_id: req.session.user_id,
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
          } else {
               if (product.stock < req.body.quantity) {
                    res.status(418).json("Not enough stock to add that many to your cart");
                    return;
               }

               product.stock -= req.body.quantity;
               await product.save();

               const createCartItem = await CartItem.create({
                    cart_id: req.session.user_id,
                    product_id: req.body.product_id,
                    quantity: req.body.quantity,
               });

               const updatedProduct = await CartItem.findOne({
                    where: {
                         cart_id: req.session.user_id,
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
          }
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Deletes a product from the user's cart
// [x]:  Works in Insomnia
router.delete("/", withAuth, async (req, res) => {
     // FIXME: get rid of the parameter, leave it at '/' and use req.session.user_id instead below
     try {
          const existingCartItem = await CartItem.findOne({
               where: {
                    cart_id: req.session.user_id, // FIXME: get rid of the parameter and use req.session.user_id instead
                    product_id: req.body.product_id,
               },
          });

          if (!existingCartItem) {
               res.status(418).json("Product doesn't exist in your cart");
               return;
          }

          const deleteCartItem = await CartItem.destroy({
               where: {
                    cart_id: req.session.user_id, // FIXME: get rid of the parameter and use req.session.user_id instead
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
router.delete("/clear", withAuth, async (req, res) => {
     try {
          const deleteCartItems = await CartItem.destroy({
               where: {
                    cart_id: req.session.user_id,
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

// COMMENT: Checks out the user's cart and creates a new Sale for the vendor and the user to see
router.post("/checkout", withAuth, async (req, res) => {
     try {
          const cartItems = await CartItem.findAll({
               where: { cart_id: req.session.user_id },
               include: [{ model: Product, attributes: ["vendor_id"] }],
          });
          if (cartItems.length === 0) {
               res.status(404).json({ message: "Your cart is currently empty." });
               return;
          }

          // Create a new Sale for each vendor
          const salesByVendor = {};
          for (const item of cartItems) {
               const vendorId = item.product.vendor_id;
               if (!salesByVendor[vendorId]) {
                    const newSale = await Sale.create({ vendor_id: vendorId, user_id: req.session.user_id });
                    salesByVendor[vendorId] = newSale;
               }

               // Create a new SaleItem for the current item
               await SaleItem.create({
                    sale_id: salesByVendor[vendorId].id,
                    product_id: item.product_id,
                    quantity: item.quantity,
               });
          }

          await CartItem.destroy({
               where: { cart_id: req.session.user_id },
          });

          res.status(200).json(Object.values(salesByVendor));
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Finds all purchases associated with the user
router.get("/purchases", withAuth, async (req, res) => {
     try {
          const userData = await User.findOne({
               where: { id: req.session.user_id },
          });
          if (!userData) {
               res.status(404).json({ message: "User not found." });
               return;
          }
          const purchaseData = await Sale.findAll({
               where: { user_id: userData.id },
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
                    {
                         model: Vendor,
                         attributes: ["name"],
                    },
               ],
          });
          if (purchaseData.length === 0) {
               res.status(404).json({ message: "You have no past purchases." });
               return;
          }
          res.status(200).json(purchaseData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

module.exports = router;
