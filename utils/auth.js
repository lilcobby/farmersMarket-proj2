// COMMENT: helper function to check if the user is logged in
const withAuth = (req, res, next) => {
     // If the user is not logged in, redirect the request to the login route
     if (!req.session.loggedIn) {
          res.redirect("/login");
     } else {
          next();
     }
};

function isAdmin(req, res, next) {
     if (req.session && req.session.user && req.session.user.isAdmin) {
          next(); // If the user is an admin, proceed to the next middleware or route handler
     } else {
          res.status(403).json({ message: "Forbidden: You do not have the necessary permissions" });
     }
}

// COMMENT: export the function
module.exports = { withAuth, isAdmin };
