// COMMENT: imports the required modules
const router = require("express").Router();
const { Vendor, User, Product, Sale, SaleItem } = require("../../models/index.js");
const { withAuth } = require("../../utils/auth.js");

// COMMENT: Routes for the baseURL/api/vendors endpoint

// COMMENT: Route to get vendor information
// [x]: Works in Insomnia
router.get("/profile", withAuth, async (req, res) => {
     try {
          const vendorData = await Vendor.findOne({
               where: { user_id: req.session.user_id },
          });

          if (!vendorData.is_active) {
               res.status(404).json({ message: "You are not an active vendor." });
               return;
          }
          res.status(200).json(vendorData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get vendor's products
// [x]: Works in Insomnia
router.get("/products", withAuth, async (req, res) => {
     try {
          const vendorData = await Vendor.findOne({
               where: { user_id: req.session.user_id },
          });
          if (!vendorData) {
               res.status(404).json({ message: "You are not a vendor." });
               return;
          }
          const productData = await Product.findAll({
               where: { vendor_id: vendorData.id },
          });
          if (productData.length === 0) {
               res.status(404).json({ message: "You have no products." });
               return;
          }
          res.status(200).json(productData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to make a user a vendor or to toggle a vendor's active status
// [x]: Works in Insomnia
router.put("/isVendor", withAuth, async (req, res) => {
     try {
          const userData = await User.findOne({
               where: { id: req.session.user_id },
          });
          if (!userData) {
               res.status(404).json({ message: "No user found with this id!" });
               return;
          }

          const vendorData = await Vendor.findOne({
               where: { user_id: req.session.user_id },
          });

          await vendorData.toggleActive();
          await vendorData.reload();
          if (vendorData.is_active) {
               req.session.is_vendor = true;
               res.status(200).json({ message: "You are now a vendor!" });
          } else {
               req.session.is_vendor = false;
               res.status(200).json({ message: "You are no longer an active vendor!" });
          }
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

/* COMMENT: req.body example for updating a vendor's information
                
reqBody = { 
     name: "Vendor 4", 
     description: "This is vendor 4", 
     image_URL: "http://example.com/vendor4.jpg" };

     In Insomnia, the req.body is:
{ 
	"name": "Vendor 4 name change", 
	"description": "This is vendor 4 description change" 
}; 

*/
// COMMENT: Route to update a vendor's information
// [x]: Works in Insomnia
router.put("/profile", withAuth, async (req, res) => {
     try {
          const vendorData = await Vendor.findOne({
               where: { id: req.session.user_id },
          });
          if (!vendorData) {
               res.status(404).json({ message: "No vendor found with this id!" });
               return;
          }
          if (!req.body.name || !req.body.description) {
               res.status(404).json({ message: "Please enter all required information." });
               return;
          }
          if (!req.body.image_url) {
               req.body.image_url = "https://via.placeholder.com/100";
          }

          await vendorData.update(req.body);
          await vendorData.reload();

          const updatedData = {
               name: req.body.name !== vendorData.name ? req.body.name : "No changes to name",
               description:
                    req.body.description !== vendorData.description
                         ? req.body.description
                         : "No changes to description",
               image_url:
                    req.body.image_url !== vendorData.image_url
                         ? req.body.image_url !== "https://via.placeholder.com/100"
                              ? req.body.image_url
                              : "A placeholder image will be used because no image URL was provided"
                         : "No changes to image_url",
          };
          console.log(vendorData);
          res.status(200).json({
               message: "The following changes have been made:",
               updatedVendor: updatedData,
          });
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to add a product to a vendor's inventory
// [x]: Works in Insomnia
router.post("/addProduct", withAuth, async (req, res) => {
     try {
          const vendorData = await Vendor.findOne({
               where: { id: req.session.user_id },
          });
          if (!vendorData) {
               res.status(404).json({ message: "No vendor found with this id!" });
               return;
          }
          if (!req.body.name || !req.body.description || !req.body.price || !req.body.stock) {
               res.status(404).json({ message: "Please enter all required information." });
               return;
          }

          const existingVendorProduct = await Product.findOne({
               where: { name: req.body.name, vendor_id: req.session.user_id },
          });
          if (existingVendorProduct) {
               res.status(404).json({
                    message: "This product already exists in your inventory. Please use the update product feature.",
               });
               return;
          }

          if (!req.body.image_url) {
               req.body.image_url = "https://via.placeholder.com/100";
          }
          if (!req.body.category_id) {
               req.body.category_id = "20";
          }

          await Product.create({
               name: req.body.name,
               description: req.body.description,
               price: req.body.price,
               stock: req.body.stock,
               image_url: req.body.image_url,
               category_id: req.body.category_id,
               vendor_id: req.session.user_id,
          });

          const newProduct = await Product.findOne({
               where: { name: req.body.name, vendor_id: req.session.user_id },
          });

          res.status(200).json({ message: "Product added successfully!", product: newProduct });
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to update a product in a vendor's inventory
// [x]: Works in Insomnia
router.put("/products/:id", withAuth, async (req, res) => {
     // COMMENT: req.params.id is the product_id
     try {
          if (!req.body.name || !req.body.description || !req.body.price || !req.body.stock) {
               res.status(404).json({ message: "Please enter all required information." });
               return;
          }
          const vendorData = await Vendor.findOne({
               where: { id: req.session.user_id },
          });

          if (!vendorData) {
               res.status(404).json({ message: "No vendor found with this id!" });
               return;
          }

          const existingVendorProduct = await Product.findOne({
               where: { id: req.params.id, vendor_id: req.session.user_id },
          });

          if (!existingVendorProduct) {
               res.status(404).json({ message: "No product found with this id!" });
               return;
          }

          const existingVendorProductByName = await Product.findOne({
               where: { name: req.body.name, vendor_id: req.session.user_id },
          });

          if (existingVendorProductByName && existingVendorProductByName.id !== existingVendorProduct.id) {
               res.status(404).json({
                    message: "This product already exists in your inventory. Please use the update product feature.",
               });
               return;
          }

          if (!req.body.image_url) {
               req.body.image_url = "https://via.placeholder.com/100";
          }
          if (!req.body.category_id) {
               req.body.category_id = 20;
          }

          const oldData = {
               name: existingVendorProduct.name,
               description: existingVendorProduct.description,
               price: existingVendorProduct.price,
               stock: existingVendorProduct.stock,
               image_url: existingVendorProduct.image_url,
               category_id: existingVendorProduct.category_id,
          };

          await existingVendorProduct.update(req.body);
          await existingVendorProduct.reload();

          const updatedData = {
               name: req.body.name !== oldData.name ? req.body.name : "No changes to name",
               description:
                    req.body.description !== oldData.description ? req.body.description : "No changes to description",
               price: req.body.price !== oldData.price ? req.body.price : "No changes to price",
               stock: req.body.stock !== oldData.stock ? req.body.stock : "No changes to stock",
               image_url:
                    req.body.image_url !== oldData.image_url
                         ? req.body.image_url !== "https://via.placeholder.com/100"
                              ? req.body.image_url
                              : "A placeholder image will be used because no image URL was provided"
                         : "No changes to image_url",
               category_id:
                    req.body.category_id !== oldData.category_id
                         ? req.body.category_id !== "Uncategorized"
                              ? req.body.category_id
                              : "Uncategorized"
                         : "No changes to category_id",
          };

          res.status(200).json({
               message: "The following changes have been made:",
               updatedProduct: updatedData,
          });
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to delete a product from a vendor's inventory
// [x]: Works in Insomnia
router.delete("/products/:id", withAuth, async (req, res) => {
     // COMMENT: req.params.id is the product_id
     try {
          const vendorData = await Vendor.findOne({
               where: { id: req.session.user_id },
          });

          if (!vendorData) {
               res.status(404).json({ message: "No vendor found with this id!" });
               return;
          }

          const existingVendorProduct = await Product.findOne({
               where: { id: req.params.id, vendor_id: req.session.user_id },
          });

          if (!existingVendorProduct) {
               res.status(404).json({ message: "No product found with this id!" });
               return;
          }

          await existingVendorProduct.destroy();

          res.status(200).json({ message: "Product deleted successfully!" });
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get a vendor's sales
router.get("/sales", withAuth, async (req, res) => {
     try {
          const vendorData = await Vendor.findOne({
               where: { user_id: req.session.user_id, is_active: true },
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
          res.status(200).json(saleData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: Route to get vendor product by id
// [x]: Works in Insomnia
router.get("/products/:id", withAuth, async (req, res) => {
     try {
          const productData = await Product.findOne({
               where: { id: req.params.id },
          });
          if (!productData) {
               res.status(404).json({ message: "No product found with this id!" });
               return;
          }
          res.status(200).json(productData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: exports the router
module.exports = router;
