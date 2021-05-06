module.exports = (app) => {
  require("./customer.js")(app);
  require("./reuseCRUD.js")(app);

  /**
   * @swagger
   * /:
   *  get:
   *    description: Use to request all customers
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.get("/", (req, res) => {
    res.send(
      '<a href="/auth/auth/google">Authenticate with Google</a><a href="/auth/auth/github">Authenticate with Github</a>'
    );
  });
};
