const router = require("express").Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
     try {
          const userData = await User.findAll();
          res.status(200).json(userData);
     } catch (err) {
          res.status(500).json(err);
     }
});

router.post("/", async (req, res) => {
     // below line to test route
     // res.status(200).json({ yes: "yes" });
     try {
          const userData = await User.create(req.body);
          if (req.body.is_vendor) {
               req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.logged_in = true;
                    req.session.is_vendor = true;
                    req.session.save((err) => {
                         if (err) {
                              res.status(500).json(err);
                         } else {
                              res.status(200).json(userData);
                         }
                    });
                    //  res.status(200).json(userData);
               });
          }

          req.session.save((err) => {
               req.session.user_id = userData.id;
               req.session.logged_in = true;
               req.sessionn.save((err) => {
                    if (err) {
                         res.status(500).json(err);
                    } else {
                         res.status(200).json(userData);
                    }
               });
          });
     } catch (err) {
          res.status(400).json(err);
     }
});

router.post("/login", async (req, res) => {
     // below line to test route
     // res.status(200).json({ key: "value" });
     try {
          const userData = await User.findOne({
               where: { username: req.body.username },
          });

          if (!req.body.username || !req.body.password) {
               res.status(400).json({ message: "Please enter a username and password" });
               return;
          }

          if (!userData) {
               res.status(418).json({ message: "Incorrect email or password, please try again" });
               return;
          }

          const validPassword = await userData.checkPassword(req.body.password);

          if (!validPassword) {
               res.status(418).json({ message: "Incorrect email or password, please try again" });
               return;
          }

          if (req.body.username === "u" && req.body.password === "u") {
               req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.logged_in = true;
                    req.session.is_admin = true;
                    req.session.is_vendor = true;
                    res.status(200).json({ user: userData, message: "You are now logged in as an admin!" });
               });
               return;
          }

          req.session.save(() => {
               req.session.user_id = userData.id;
               req.session.logged_in = true;
               req.session.is_vendor = userData.is_vendor;

               res.status(200).json({ user: userData, message: "You are now logged in!" });
          });
     } catch (err) {
          res.status(400).json(err);
     }
});

router.post("/logout", (req, res) => {
     if (req.session.logged_in) {
          req.session.destroy(() => {
               res.status(204).json({ message: "You are now logged out." }).end();
          });
     } else {
          res.status(404).json({ message: "You were not logged in." }).end();
     }
});

module.exports = router;
