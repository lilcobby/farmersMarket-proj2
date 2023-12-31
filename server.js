const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers/index.js");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

hbs.handlebars.registerHelper("multiply", function (a, b) {
     return a * b;
});

const sess = {
     secret: "Super secret secret",
     cookie: {},
     resave: false,
     saveUninitialized: true,
     store: new SequelizeStore({
          db: sequelize,
     }),
};

app.use(session(sess));

app.engine(
     "handlebars",
     exphbs({
          defaultLayout: "main",
          partialsDir: __dirname + "/views/partials/",
     })
);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => console.log("Now listening"));
});
