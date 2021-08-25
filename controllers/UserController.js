const User = require("../models/UserModel");
const UserEventController = require("../controllers/UserEventController");
const passport = require("passport");

module.exports = {
  create: (req, res) => {
    console.log("register request recieved" + req.body.username + req.body.password)
    User.register(
      new User({ username: req.body.username, name: req.body.name }),
      req.body.password,
      (err, user) => {
        if (err) res.json(err.message);
        else {
          passport.authenticate("local")(req, res, () => {
            console.log("registering new user");
            UserEventController.create(user._id);
            res.json({
              success: true,
              id: req.user._id,
              name: req.user.name,
            });
          });
        }
      }
    );
  },

  login: (req, res) => {

    console.log("request for login recieved!");
    console.log(req.body);
    const credentials = new User({
      username: req.body.username,
      password: req.body.password,
    });


    req.login(credentials, (err) => {
      console.log("login");
      if (err) {
        console.log("login failed");
        res.json({ success: false, message: err.message });
        return;
      }
      passport.authenticate("local")(req, res, (err) => {
        console.log("authentification");
        if (err) {
          console.log("auth error");
          res.json({ success: false, message: err.message });
          return;
        }
        console.log("sending id")
        res.json({
          success: true,
          id: req.user._id,
        });
      });
    });
  },

  authenticate: (req, res) => {
    User.authenticate("local")(req, res, (err, user, info) => {
      console.log('authenticated')
      console.log(req.body)
      
      res.redirect(`/events`);
      
    });

    // res.json({success: false, message: 'failed auth'});
    
  },

  logout: (req, res) => {
    req.logout();
    res.json({ logout: "sucessful" });
  },
};
