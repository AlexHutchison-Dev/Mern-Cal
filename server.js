const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const User = require("./models/UserModel");
const path = require("path");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

//Middleware

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Cross Origin Request Handler
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if( req.method === 'OPTIONS'){
    req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Database
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.on("error", console.error.bind(console, `db connection error`));
db.once("open", () => console.log("db connection open"));

//Controlers
const UserControl = require("./controllers/UserController");
const EventControl = require("./controllers/EventController");
const UserEventController = require("./controllers/UserEventController");

app.get("*", (req, res) => {
  console.log(" get req recieved");
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//Routes
app.post("/cal/addevent", UserEventController.addevent);
app.post("/events", EventControl.query);
app.post("/cal", UserEventController.query);
app.post("/user/register", UserControl.create);
app.post("/user/login", UserControl.login);
app.post("/user/logout", UserControl.logout);
app.post("/cal/deleteevent", UserEventController.deleteevent);
app.post("/cal/updateevent",UserEventController.updateevent); 
//Start Server
app.listen(port, () => console.log(`server listening on port ${port}`));
