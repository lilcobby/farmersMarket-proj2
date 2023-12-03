// COMMENT: lists the variables that are used in the workspace

const tableProperties = {
     user: {
          id: integer,
          username: string,
          password: string,
          email: string,
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
     },
     sale: {
          id: integer,
          user_id: integer,
          product_id: integer,
          vendor_id: integer,
     },
     product: {
          id: integer,
          name: string,
          description: string,
          price: integer,
          stock: integer,
          image_url: string,
          categories: string,
          vendor_id: integer,
     },
};

const sessionVariables = {
     sessionID: req.session.user_id,
     sessionVendorID: req.session.vendor_id,
     sessionLoggedIn: req.session.logged_in,
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
          if (this.is_vendor) {
               this.is_vendor = false;
          } else {
               this.is_vendor = true;
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
          if (this.isActive) {
               this.isActive = false;
          } else {
               this.isActive = true;
          }
          await this.save();
     },
};
