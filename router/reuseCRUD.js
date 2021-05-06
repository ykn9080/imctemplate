/*
재사용가능 mongoose CRUD 기능과 model처리
재사용가능한 CRUD는 ./controller/reuseCRUD.js
모든 모델을 한곳에서 처리함 ./model/models.js
*/

// const auth = require("../passport/auth");
const crud = require("../controllers/reuseCRUD");
module.exports = (app, passport) => {
  const user = require("../models/user");
  const model = require("../models/model");
  const aa = ""; //auth().authenticate();

  const uselist = [
    // { path: "/bootform", ctrl: admin.Bootform },
    // { path: "/menu", ctrl: admin.Menu },
    { path: "/user", ctrl: user },
    // { path: "/allpurpose", ctrl: model.Allpurpose },
    // { path: "/dataset", ctrl: project.Dataset },
  ];
  uselist.map((k, i) => {
    if (aa !== "") app.use(k.path, aa, crud(k.ctrl));
    else app.use(k.path, crud(k.ctrl));
  });
  /**
   * @swagger
   * /apppurpose:
   *  get:
   *    description: Use to request all customers
   *    responses:
   *      '200':
   *        description: A successful response
   */
  app.use("/allpurpose", crud(model.Control));
  // //for admin
  // app.use("/control", crud(admin.Control));
  // app.use("/accessgroup", crud(admin.AccessGroup));
  // app.use("/formelement", crud(admin.FormElement));
  // app.use("/help", crud(admin.Help));
  // app.use("/allpurpose", crud(admin.Allpurpose));
  // app.use("/system", crud(admin.System));
  // app.use("/reuse/simple", crud(admin.Simple)); //for testing
};
