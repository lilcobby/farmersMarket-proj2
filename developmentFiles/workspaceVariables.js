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
     sessionLoggedIn: req.session.logged_in
};
