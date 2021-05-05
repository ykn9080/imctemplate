const auth = require("../passport/authServer.js");

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

module.exports = (app) => {
  app.get("/posts", auth.authenticateToken, (req, res) => {
    res.json(posts.filter((post) => post.username === req.user.name));
  });
};
