// COMMENT: imports the required modules
const router = require("express").Router();
const { Vendor, User } = require("../../models/index.js");

// COMMENT: Routes for the baseURL/api/vendors endpoint

// TODO: Create a route to get the logged in user's vendor information
// [ ]: Works in Insomnia
router.get("/:id", async (req, res) => {
     // TODO: add withAuth middleware to the route once login homepage is working // FIXME: get rid of the parameter, leave it at '/' and use req.session.vendor_id instead below
     try {
          const vendorData = await Vendor.findOne({
               where: { user_id: req.params.id }, // FIXME: get rid of the parameter and use req.session.vendor_id instead
          });
          if (!vendorData) {
               res.status(404).json({ message: "You are not a vendor." });
               return;
          }
          res.status(200).json(vendorData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// TODO: create a route to make a current user who isn't a vendor a vendor by using the user.toggleVendor() method
// [ ]: Works in Insomnia
router.post("/isVendor/:id", async (req, res) => {
     // TODO: add withAuth middleware to the route once login homepage is working // FIXME: get rid of the parameter, leave it at '/isVendor' and use req.session.user_id in the where clause below
     try {
          const userData = await User.findOne({
               where: { id: req.params.id }, // FIXME: get rid of the parameter and use req.session.user_id instead
          });
          if (!userData) {
               res.status(404).json({ message: "No user found with this id!" });
               return;
          }
          await userData.toggleVendor();
          res.status(200).json(userData);
     } catch (err) {
          res.status(500).json({ errMessage: err.message });
     }
});

// COMMENT: exports the router
module.exports = router;
