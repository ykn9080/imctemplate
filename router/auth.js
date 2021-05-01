const auth = require("../passport/authServer.js");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
module.exports = (app) => {
  app.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = auth.generateAccessToken({ name: user.name });
      res.json({ accessToken: accessToken });
    });
  });

  app.delete("/logout", (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
  });

  app.post("/login", (req, res) => {
    // Authenticate User

    const username = req.body.username;
    const user = { name: username };

    const accessToken = auth.generateAccessToken(user);
    const refreshToken = auth.generateRefreshToken(user); //jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  });
};
