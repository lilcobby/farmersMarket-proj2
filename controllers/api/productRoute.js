const router = require("express").Router();
const { Product } = require("../../models");

router.get("/", async (req, res) => {
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
module.exports = router;

/* COMMENT: 
      made a change to the product table to include a is_active column so that vendors can toggle their products on and off
      
      To grab the products that are active to display on the home page, use the following format:
      
     router.get("/allActiveProducts", async (req, res) => {
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
      
      can see examples of the routes in admin routes and with the insomnia file I put in developmentFiles, copy it then import it to insomnia */
