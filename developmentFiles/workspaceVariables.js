// COMMENT: lists the variables that are used in the workspace

const tableProperties = {
     user: {
          id: integer,
          username: string,
          password: string,
          email: string,
          is_vendor: boolean,
     },
     cart: {
          id: integer,
          user_id: integer,
     },
     vendor: {
          id: integer,
          name: string,
          description: string,
          image_URL: string,
          user_id: integer,
          is_active: boolean,
     },
     sale: {
          id: integer,
          vendor_id: integer,
     },
     product: {
          id: integer,
          name: string,
          description: string,
          price: integer,
          stock: integer,
          image_url: string,
          category_id: integer,
          vendor_id: integer,
     },
     sale_item: {
          id: integer,
          sale_id: integer,
          product_id: integer,
          quantity: integer,
     },
     cart_item: {
          id: integer,
          cart_id: integer,
          product_id: integer,
          quantity: integer,
     },
     category: {
          id: integer,
          name: string,
          description: string,
     },
};

const sessionVariables = {
     sessionID: req.session.user_id,
     sessionVendorID: req.session.vendor_id,
     sessionLoggedIn: req.session.logged_in,
     sessionIsAdmin: req.session.is_admin,
     sessionIsVendor: req.session.is_vendor,
};

const UserHooks = {
     beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
     },
     beforeUpdate: async (updatedUserData) => {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
     },
     afterCreate: async (newUserData) => {
          await Cart.create({ user_id: newUserData.id });

          if (newUserData.isVendor) {
               await Vendor.create({ user_id: newUserData.id });
          }
     },
};

const UserMethods = {
     checkPassword(loginPw) {
          return bcrypt.compareSync(loginPw, this.password);
     },
     async toggleVendor() {
          this.is_vendor = !this.is_vendor;
          if (this.is_vendor) {
               const vendor = await Vendor.findOne({ where: { user_id: this.id } });
               if (!vendor) {
                    await Vendor.create({ id: this.id, user_id: this.id });
               }
          }
          await this.save();
     },
};

const VendorMethods = {
     async toggleActive() {
          this.is_active = !this.is_active;
          await this.save();

          if (!this.is_active) {
               const products = await Product.findAll({ where: { vendor_id: this.id } });
               for (let product of products) {
                    product.is_active = this.is_active;
                    await product.save();
               }
          }
     },
};

const ProductMethods = {
     async toggleActive() {
          this.is_active = !this.is_active;
          await this.save();
     },
};

// COMMENT: helper functions
const withAuth = (req, res, next) => {
     // If the user is not logged in, redirect the request to the login route
     if (!req.session.logged_in) {
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

