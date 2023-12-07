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
     console.log("session:", req.session.is_Vendor)
     if (req.session.is_vendor) {
          next(); // If the user is a vendor, proceed to the next middleware or route handler
     } else {
          res.redirect("/");
     }
}

// COMMENT: export the function
module.exports = { withAuth, isAdmin, isVendor };
