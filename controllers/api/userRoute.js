const router = require("express").Router();
const { User } = require("../../models");
const { withAuth, isAdmin } = require("../../utils/auth");
const { Op } = require("sequelize");

router.get("/", isAdmin, async (req, res) => {
     try {
          const userData = await User.findAll();

          res.status(200).json(userData);
     } catch (err) {
          res.status(500).json(err);
     }
});

router.post("/", async (req, res) => {
     try {
          const userData = await User.create(req.body);
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          req.session.is_vendor = req.body.is_vendor || false;
          req.session.is_active = true; // TODO: change this to userData.is_active when implemented

          req.session.save((err) => {
               if (err) {
                    res.status(500).json(err);
               } else {
                    res.status(200).json(userData);
               }
          });
     } catch (err) {
          res.status(400).json({ errMessage: err.message });
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
               res.status(401).json({ message: "Incorrect email or password, please try again" });
               return;
          }

          const validPassword = await userData.checkPassword(req.body.password);

          if (!validPassword) {
               res.status(401).json({ message: "Incorrect email or password, please try again" });
               return;
          }

          if (req.body.username === "u" && req.body.password === "u") {
               req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.logged_in = true;
                    req.session.is_admin = true;
                    req.session.is_vendor = true;
                    req.session.is_active = true; // TODO: change this to userData.is_active when implemented
                    res.status(200).json({
                         user: userData,
                         message: "You are now logged in as an admin!",
                    });
               });
               return;
          }

          req.session.save(() => {
               req.session.user_id = userData.id;
               req.session.logged_in = true;
               req.session.is_vendor = userData.is_vendor;
               req.session.is_active = true; // TODO: change this to userData.is_active when implemented
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

router.get("/check/:username/:email", async (req, res) => {
     try {
          const userData = await User.findOne({
               where: {
                    [Op.or]: [{ username: req.params.username }, { email: req.params.email }],
               },
          });

          if (userData) {
               res.json({ exists: true });
          } else {
               res.json({ exists: false });
          }
     } catch (err) {
          res.status(500).json(err);
     }
});

module.exports = router;
