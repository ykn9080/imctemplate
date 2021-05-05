const passport = require("passport");
module.exports = (app) => {
  require("./customer.js")(app);
  require("./authtest.js")(app);
  require("./auth.js")(app);
  require("./githubLogin.js")(app, passport);
  require("./googleLogin.js")(app, passport);

  app.get("/", (req, res) => {
    res.send(
      '<a href="/auth/auth/google">Authenticate with Google</a><a href="/auth/auth/github">Authenticate with Github</a>'
    );
  });
  app.get("/login", (req, res) => {
    res.render("../views/login.html");
  });

  app.get("/register", (req, res) => {
    res.render("../views/register.html");
  });
};
